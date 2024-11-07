package com.fil.controller;

import com.fil.exceptions.InvalidFieldException;
import com.fil.exceptions.TransactionNotAllowdedException;
import com.fil.model.FundTransaction;
import com.fil.model.MutualFund;
import com.fil.model.User;
import com.fil.model.enums.FundStatus;
import com.fil.service.FundTransactionService;
import com.fil.service.MutualFundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/mutual-fund/{fundId}/transaction")
public class FundTransactionController {

    @Autowired
    private MutualFundService mutualFundService;

    @Autowired
    private FundTransactionService fundTransactionService;

    @PostMapping("/purchase")
    public ResponseEntity<?> purchaseFund(@AuthenticationPrincipal User user, @PathVariable int fundId, @RequestBody ModelMap modal,
                                          HttpServletRequest req) {

        int qty = 0;
        try {
            qty = Integer.parseInt(modal.get("qty").toString());
        } catch (Exception ignored) {
        }

        if (qty <= 0) {
            throw new InvalidFieldException();
        }

        MutualFund fund = mutualFundService.findById(fundId);

        if (fund.getStatus() == FundStatus.NOT_LISTED) {
            throw new TransactionNotAllowdedException();
        }

        FundTransaction transaction = fundTransactionService.purchase(fund, user, qty);
        fund.addAssetSize(transaction.getAmount());
        if (fund.getStatus() == FundStatus.LISTED) {
            fund.addAssetSize(transaction.getAmount());
            fund.addAssetNav(transaction.getAmount());
        }
        mutualFundService.save(fund);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", transaction);
        return ResponseEntity.status(HttpStatus.CREATED).body(map);
    }

    @PostMapping("/sell")
    public ResponseEntity<?> sellFund(@AuthenticationPrincipal User user, @PathVariable int fundId, @RequestBody ModelMap modal, HttpServletRequest req) {

        int qty = 0;
        try {
            qty = Integer.parseInt(modal.get("qty").toString());
        } catch (Exception ignored) {
        }

        if (qty <= 0) {
            throw new InvalidFieldException();
        }

        MutualFund fund = mutualFundService.findById(fundId);

        if (fund.getStatus() != FundStatus.LISTED) {
            throw new TransactionNotAllowdedException();
        }

        FundTransaction transaction = fundTransactionService.sell(fund, user, qty);
        fund.reduceAssetSize(transaction.getAmount());
        fund.reduceAssetNav(transaction.getAmount());

        mutualFundService.save(fund);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", transaction);
        return ResponseEntity.status(HttpStatus.CREATED).body(map);
    }

}