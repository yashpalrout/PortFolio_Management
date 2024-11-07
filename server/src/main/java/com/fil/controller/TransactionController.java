package com.fil.controller;

import com.fil.dto.Pagination;
import com.fil.exceptions.PermissionDeniedException;
import com.fil.interfaces.PaginationParams;
import com.fil.model.FundTransaction;
import com.fil.model.User;
import com.fil.model.WalletTransaction;
import com.fil.model.enums.UserRole;
import com.fil.service.FundTransactionService;
import com.fil.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private FundTransactionService fundTransactionService;

    @GetMapping("/funds")
    public ResponseEntity<?> fundTransactions(@AuthenticationPrincipal User user, @PaginationParams Pagination pagination) {
        List<FundTransaction> result;
        if (user.getRole() == UserRole.FUND_MANAGER) {
            throw new PermissionDeniedException();
        } else if (user.getRole() == UserRole.PORTAL_MANAGER) {
            result = fundTransactionService.transactionHistory();
        } else {
            result = fundTransactionService.transactionHistory(user);
        }

        int totalRecords = result.size();
        result = result.stream().skip(pagination.getSkip()).limit(pagination.getSize()).toList();


        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", result);
        map.put("pagination", Pagination.paginationMap(pagination, totalRecords));
        return ResponseEntity.status(HttpStatus.CREATED).body(map);
    }

    @GetMapping("/wallet")
    public ResponseEntity<?> walletTransactions(@AuthenticationPrincipal User user, @PaginationParams Pagination pagination) {
        List<WalletTransaction> result;
        if (user.getRole() == UserRole.PORTAL_MANAGER) {
            result = walletService.transactionHistory();
        } else {
            result = walletService.transactionHistory(user);
        }

        int totalRecords = result.size();
        result = result.stream().skip(pagination.getSkip()).limit(pagination.getSize()).toList();


        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", result);
        map.put("pagination", Pagination.paginationMap(pagination, totalRecords));
        return ResponseEntity.status(HttpStatus.CREATED).body(map);
    }


}