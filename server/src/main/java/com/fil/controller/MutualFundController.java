package com.fil.controller;

import com.fil.dto.CreateFundHolding;
import com.fil.dto.CreateMutualFund;
import com.fil.dto.Pagination;
import com.fil.dto.UpdateFundStatus;
import com.fil.exceptions.InitialisationFailedException;
import com.fil.exceptions.NotFoundException;
import com.fil.exceptions.PermissionDeniedException;
import com.fil.interfaces.PaginationParams;
import com.fil.model.*;
import com.fil.model.enums.FundStatus;
import com.fil.model.enums.TransactionType;
import com.fil.model.enums.UserRole;
import com.fil.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/mutual-fund")
public class MutualFundController {

    @Autowired
    private MutualFundService mutualFundService;

    @Autowired
    private FundHoldingService fundHoldingService;

    @Autowired
    private FundManagerService fundManagerService;

    @Autowired
    private FavoriteFundService favoriteFundService;

    @Autowired
    private FundTransactionService fundTransactionService;

    @Autowired
    private FundPriceService fundPriceService;

    @Autowired
    private UserService userService;

    @Autowired
    private TickerService tickerService;

    @PostMapping()
    public ResponseEntity<?> create(@AuthenticationPrincipal User user, @Valid @RequestBody CreateMutualFund data) {

        MutualFund result = mutualFundService.save(data.toMutualFund());
        fundManagerService.save(user, result);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", result);
        return ResponseEntity.status(HttpStatus.CREATED).body(map);
    }

    @PostMapping("/{fundId}/add-fund-holding")
    public ResponseEntity<?> createFundHolding(@PathVariable int fundId, @Valid @RequestBody CreateFundHolding data) {
        MutualFund result = mutualFundService.findById(fundId);

        List<FundHolding> list = data.getHoldings().stream().map(h -> {
            Ticker ticker = tickerService.findById(h.getTickerId());
            return new FundHolding(result, ticker, h.getRatio());
        }).toList();

        fundHoldingService.saveAll(list);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        return ResponseEntity.status(HttpStatus.CREATED).body(map);
    }

    @PostMapping("/{fundId}/status")
    public ResponseEntity<?> updateFundStatus(@PathVariable int fundId, @Valid @RequestBody UpdateFundStatus data) {
        try {
            MutualFund fund = mutualFundService.findById(fundId);

            if (data.getStatus() == FundStatus.LISTED) {
                if (fund.getAssetSize() < fund.getInitialTarget()) {
                    throw new InitialisationFailedException();
                }
            } else if (data.getStatus() == FundStatus.IPO) {
                Optional<Double> optRatio = fundHoldingService.findByMutualFund(fund).stream().map(FundHolding::getRatio)
                        .reduce(Double::sum);
                if (optRatio.isEmpty() || optRatio.get() <= 0) {
                    throw new InitialisationFailedException();
                }
            } else {
                throw new InitialisationFailedException();
            }

            fund.setStatus(data.getStatus());


            if (data.getStatus() == FundStatus.LISTED) {
                mutualFundService.initiateFund(fund);
            }

            mutualFundService.save(fund);

            Map<String, Object> map = new HashMap<String, Object>();
            map.put("success", true);
            map.put("data", fund);

            return ResponseEntity.status(HttpStatus.CREATED).body(map);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/managed-by/{userId}")
    public ResponseEntity<?> managedBy(@AuthenticationPrincipal User reqUser, @PathVariable int userId) {

        User user = userService.findUserById(userId);
        List<MutualFund> result = mutualFundService.findByManager(user);

        if (reqUser.getRole() == UserRole.INVESTOR) {
            result = result.stream().filter(mf -> mf.getStatus() == FundStatus.LISTED).toList();
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", result);
        return ResponseEntity.status(HttpStatus.OK).body(map);

    }

    @PostMapping("/{fundId}/add-manager/{userId}")
    public ResponseEntity<?> managedBy(@AuthenticationPrincipal User reqUser, @PathVariable int userId, @PathVariable int fundId) {
        MutualFund fund = mutualFundService.findById(fundId);
        User newManager = userService.findUserById(userId);

        List<FundManager> fundManagers = fundManagerService.listFundManagers(fund);

        boolean anyMatch = fundManagers.stream().anyMatch(fm -> fm.getManager().getUserId() == reqUser.getUserId());

        if (!anyMatch) {
            throw new PermissionDeniedException();
        }
        boolean alreadyMatch = fundManagers.stream().anyMatch(fm -> fm.getManager().getUserId() == newManager.getUserId());

        if (!alreadyMatch) {
            fundManagerService.save(newManager, fund);
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        return ResponseEntity.status(HttpStatus.OK).body(map);

    }

    @GetMapping("/managed-by/me")
    public ResponseEntity<?> managedByMe(@AuthenticationPrincipal User user, @PaginationParams Pagination pagination) {
        List<MutualFund> result = mutualFundService.findByManager(user);
        int totalRecords = result.size();
        result = result.stream().skip(pagination.getSkip()).limit(pagination.getSize()).toList();


        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", result);
        map.put("pagination", Pagination.paginationMap(pagination, totalRecords));

        return ResponseEntity.status(HttpStatus.OK).body(map);

    }

    @GetMapping()
    public ResponseEntity<?> listFunds(@AuthenticationPrincipal User user, @PaginationParams Pagination pagination, @RequestParam(name = "name", required = false) Optional<String> name) {
        List<MutualFund> result;
        if (name.isEmpty() || name.get().isEmpty()) {
            result = mutualFundService.findAll();
        } else {
            result = mutualFundService.search(name.get());
        }

        if (user.getRole() == UserRole.INVESTOR) {
            result = result.stream().filter(mf -> mf.getStatus() == FundStatus.LISTED).toList();
        }

        int totalRecords = result.size();
        result = result.stream().skip(pagination.getSkip()).limit(pagination.getSize()).toList();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", result);
        map.put("pagination", Pagination.paginationMap(pagination, totalRecords));

        return ResponseEntity.status(HttpStatus.OK).body(map);

    }

    @GetMapping("/list-invested")
    public ResponseEntity<?> listInvested(@AuthenticationPrincipal User user, @PaginationParams Pagination pagination, @RequestParam(name = "name", required = false) Optional<String> name) {
        List<MutualFund> result = fundTransactionService.transactionHistory(user).stream().map(FundTransaction::getFund).toList();

        result = result.stream().distinct().toList();

        int totalRecords = result.size();
        result = result.stream().skip(pagination.getSkip()).limit(pagination.getSize()).toList();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", result);
        map.put("pagination", Pagination.paginationMap(pagination, totalRecords));

        return ResponseEntity.status(HttpStatus.OK).body(map);

    }

    @GetMapping("/favorite")
    public ResponseEntity<?> listFavourite(@AuthenticationPrincipal User user, @PaginationParams Pagination pagination, @RequestParam(name = "name", required = false) Optional<String> name) {
        List<MutualFund> result = favoriteFundService.findByUser(user).stream().map(FavoriteFund::getMutualFund).toList();

        int totalRecords = result.size();
        result = result.stream().skip(pagination.getSkip()).limit(pagination.getSize()).toList();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", result);
        map.put("pagination", Pagination.paginationMap(pagination, totalRecords));

        return ResponseEntity.status(HttpStatus.OK).body(map);

    }

    @GetMapping("/ipo")
    public ResponseEntity<?> listIPOs(@AuthenticationPrincipal User user, @PaginationParams Pagination pagination, @RequestParam(name = "name", required = false) Optional<String> name) {

        List<MutualFund> result;
        if (name.isEmpty() || name.get().isEmpty()) {
            result = mutualFundService.findAll();
        } else {
            result = mutualFundService.search(name.get());
        }

        int totalRecords = result.size();
        result = result.stream().filter(mf -> mf.getStatus() == FundStatus.IPO).skip(pagination.getSkip()).limit(pagination.getSize()).toList();


        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", result);
        map.put("pagination", Pagination.paginationMap(pagination, totalRecords));

        return ResponseEntity.ok(map);

    }

    @GetMapping("/{fundId}")
    public ResponseEntity<?> findById(@PathVariable int fundId) {
        MutualFund fund = mutualFundService.findById(fundId);

        List<FundHolding> holdings = fundHoldingService.findByMutualFund(fund);


        Map<String, Double> fundValuations = new HashMap<>();
        fundPriceService.findByFund(fund).parallelStream().forEach(val -> fundValuations.put(val.getDate().toString(), val.getPrice()));


        Map<String, Object> data = new HashMap<String, Object>();
        data.put("fund", fund);
        data.put("holdings", holdings);
        data.put("fundValuations", fundValuations);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", data);
        return ResponseEntity.status(HttpStatus.OK).body(map);

    }

    @GetMapping("/{fundId}/managers")
    public ResponseEntity<?> findByManager(@PathVariable int fundId, @AuthenticationPrincipal User user) {
        MutualFund fund = mutualFundService.findById(fundId);
        List<User> managers = fundManagerService.listFundManagers(fund).stream().map(FundManager::getManager).toList();
        List<User> list = new ArrayList<>(managers);


        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", list);
        return ResponseEntity.ok(map);

    }

    @PostMapping("/{fundId}/add-to-favorite")
    public ResponseEntity<?> addToFavorite(@PathVariable int fundId, @AuthenticationPrincipal User user) {
        MutualFund fund = mutualFundService.findById(fundId);
        FavoriteFund favoriteFund = new FavoriteFund(fund, user);

        favoriteFundService.save(favoriteFund);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        return ResponseEntity.ok(map);

    }

    @PostMapping("/{fundId}/remove-from-favorite")
    public ResponseEntity<?> removeToFavorite(@PathVariable int fundId, @AuthenticationPrincipal User user) {
        MutualFund fund = mutualFundService.findById(fundId);
        FavoriteFund favoriteFund = favoriteFundService.findByUserAndMutualFund(user, fund);

        favoriteFundService.remove(favoriteFund);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        return ResponseEntity.ok(map);

    }

    @GetMapping("/{fundId}/is-favorite")
    public ResponseEntity<?> isFavorite(@PathVariable int fundId, @AuthenticationPrincipal User user) {
        MutualFund fund = mutualFundService.findById(fundId);
        boolean isFavorite = false;
        try {
            favoriteFundService.findByUserAndMutualFund(user, fund);
            isFavorite = true;
        } catch (NotFoundException ignored) {
        }


        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("isFavorite", isFavorite);
        return ResponseEntity.ok(map);

    }

    @GetMapping("/favorites")
    public ResponseEntity<?> favorites(@AuthenticationPrincipal User user) {

        List<FavoriteFund> favoriteFunds = favoriteFundService.findByUser(user);
        List<MutualFund> mutualFunds = favoriteFunds.stream().map(FavoriteFund::getMutualFund).toList();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", mutualFunds);
        return ResponseEntity.ok(map);
    }

    @GetMapping("/transaction-history")
    public ResponseEntity<?> transactionHistory(@AuthenticationPrincipal User user) {
        List<FundTransaction> transactionHistory = fundTransactionService.transactionHistory(user);

        Map<MutualFund, Integer> mfMap = new HashMap<MutualFund, Integer>();

        transactionHistory.parallelStream().forEach(tH -> {
            int qty = tH.getType() == TransactionType.BUY ? tH.getQuantity() : (-1 * tH.getQuantity());
            mfMap.put(tH.getFund(), mfMap.getOrDefault(tH.getFund(), 0) + qty);
        });

        double total = 0;

        for (MutualFund fund : mfMap.keySet()) {
            int qty = mfMap.get(fund);
            total += qty * fund.getTokenPrice();
        }

        Map<String, Object> map = new HashMap<>();
        map.put("success", true);
        map.put("outstanding", total);
        map.put("data", transactionHistory);
        return ResponseEntity.ok(map);

    }

}