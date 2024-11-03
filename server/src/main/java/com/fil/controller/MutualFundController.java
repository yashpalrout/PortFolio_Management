package com.fil.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fil.dto.CreateFundHolding;
import com.fil.dto.CreateMutualFund;
import com.fil.dto.UpdateFundStatus;
import com.fil.exceptions.InitialisationFailedException;
import com.fil.model.FundHolding;
import com.fil.model.FundTransaction;
import com.fil.model.MutualFund;
import com.fil.model.Ticker;
import com.fil.model.User;
import com.fil.model.enums.FundStatus;
import com.fil.model.enums.TransactionType;
import com.fil.model.enums.UserRole;
import com.fil.service.FundHoldingService;
import com.fil.service.FundManagerService;
import com.fil.service.FundTransactionService;
import com.fil.service.MutualFundService;
import com.fil.service.TickerService;
import com.fil.service.UserService;

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
	private FundTransactionService fundTrasactionService;

	@Autowired
	private UserService userService;

	@Autowired
	private TickerService tickerService;

	@PostMapping()
	public ResponseEntity<?> create(@Valid @RequestBody CreateMutualFund data, HttpServletRequest req) {

		MutualFund result = mutualFundService.save(data.toMutualFund());
		fundManagerService.save((User) req.getAttribute("user"), result);

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
		MutualFund fund = mutualFundService.findById(fundId);

		if (data.getStatus() == FundStatus.LISTED && fund.getAssetSize() < fund.getInitialTarget()) {
			throw new InitialisationFailedException();
		} else if (data.getStatus() == FundStatus.IPO) {
			Optional<Double> optRatio = fundHoldingService.findByMutualFund(fund).stream().map(fh -> fh.getRatio())
					.reduce((a, b) -> a + b);
			if (optRatio.isEmpty() || optRatio.get() <= 0) {
				throw new InitialisationFailedException();
			}
		} else {
			throw new InitialisationFailedException();
		}

		fund.setStatus(data.getStatus());

		mutualFundService.save(fund);

		if (data.getStatus() == FundStatus.LISTED) {
			mutualFundService.initiateFund(fund);
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("success", true);
		map.put("data", fund);

		return ResponseEntity.status(HttpStatus.CREATED).body(map);
	}

	@GetMapping("/managed-by/{userId}")
	public ResponseEntity<?> managedBy(@PathVariable int userId) {

		User user = userService.findUserById(userId);

		List<MutualFund> result = mutualFundService.findByManager(user);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("success", true);
		map.put("data", result);
		return ResponseEntity.status(HttpStatus.OK).body(map);

	}

	@GetMapping()
	public ResponseEntity<?> listFunds(@RequestParam(name = "name", required = false) Optional<String> name,
			HttpServletRequest req) {
		List<MutualFund> result;
		if (name.isEmpty() || name.get().length() == 0) {
			result = mutualFundService.findAll();
		} else {
			result = mutualFundService.search(name.get());
		}

		if (((User) req.getAttribute("user")).getRole() == UserRole.INVESTOR) {
			result = result.stream().filter(mf -> mf.getStatus() != FundStatus.NOT_LISTED).toList();
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("success", true);
		map.put("data", result);

		return ResponseEntity.status(HttpStatus.OK).body(map);

	}

	@GetMapping("/{fundId}")
	public ResponseEntity<?> findById(@PathVariable int fundId) {
		MutualFund fund = mutualFundService.findById(fundId);

		List<FundHolding> holdings = fundHoldingService.findByMutualFund(fund);
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("fund", fund);
		data.put("holdings", holdings);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("success", true);
		map.put("data", data);
		return ResponseEntity.status(HttpStatus.OK).body(map);

	}

	@GetMapping("/transaction-history")
	public ResponseEntity<?> transactionHistory(HttpServletRequest req) {
		User user = (User) req.getAttribute("user");

		List<FundTransaction> transactionHistory = fundTrasactionService.transactionHistory(user);

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
		return ResponseEntity.status(HttpStatus.OK).body(map);

	}

}