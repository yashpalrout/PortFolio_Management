package com.fil.controller;

import com.fil.dto.PasswordChangeData;
import com.fil.dto.UserRegistrationData;
import com.fil.dto.UserUpdateData;
import com.fil.exceptions.InvalidFieldException;
import com.fil.exceptions.NotFoundException;
import com.fil.exceptions.PermissionDeniedException;
import com.fil.model.User;
import com.fil.model.Wallet;
import com.fil.model.enums.UserRole;
import com.fil.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private WalletService walletService;

    @Autowired
    private MutualFundService fundService;
    @Autowired
    private FundTransactionService fundTransactionService;

    @Autowired
    private UserValuationService userValuationService;

    @PostMapping("/add-balance")
    public ResponseEntity<?> addBalance(@AuthenticationPrincipal User user, @RequestBody ModelMap modal) {

        double amount;
        try {
            amount = Double.parseDouble(modal.get("amount").toString());
        } catch (Exception e) {
            throw new InvalidFieldException();
        }

        walletService.addBalance(user, amount, "Added to Wallet");

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        return ResponseEntity.status(HttpStatus.OK).body(map);

    }

    @GetMapping("/details")
    public ResponseEntity<?> details(@AuthenticationPrincipal User user) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("user", user);
        return ResponseEntity.status(HttpStatus.OK).body(map);

    }


    @PutMapping("/details")
    public ResponseEntity<?> updateDetails(@AuthenticationPrincipal User user, @Valid @RequestBody UserUpdateData data) throws NotFoundException {
        user.setName(data.getName());
        user.setPhone(data.getPhone());
        user.setDob(data.getDob());

        userService.updateUser(user);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", user);

        return ResponseEntity.ok(response);

    }

    @PatchMapping("/details")
    public ResponseEntity<?> updatePassword(@AuthenticationPrincipal User user, @Valid @RequestBody PasswordChangeData data) throws NotFoundException {
        if (!userService.verifyPassword(user, data.getOld_password())) {
            throw new PermissionDeniedException();
        }

        user.setPassword(data.getNew_password());
        userService.updateUser(user);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", user);

        return ResponseEntity.ok(response);

    }


    @GetMapping("/wallet-balance")
    public ResponseEntity<?> walletBalance(@AuthenticationPrincipal User user) {
        Wallet wallet = walletService.findByUser(user);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("balance", wallet.getBalance());
        return ResponseEntity.status(HttpStatus.OK).body(map);

    }

    @PostMapping("/add-user")
    public ResponseEntity<?> addUser(@Valid @RequestBody UserRegistrationData data, @AuthenticationPrincipal User authUser)
            throws PermissionDeniedException {
        if (authUser.getRole() != UserRole.PORTAL_MANAGER) {
            throw new PermissionDeniedException();
        }

        User user = data.toUser();
        userService.register(user);
        walletService.create(user);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "User saved succesfully");
        response.put("data", user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @GetMapping("/all")
    public ResponseEntity<?> allUsers(@AuthenticationPrincipal User user)
            throws PermissionDeniedException {
        if (user.getRole() == UserRole.INVESTOR) {
            throw new PermissionDeniedException();
        }
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", userService.listAllUsers());
        return ResponseEntity.ok(response);

    }


    @GetMapping("/overview")
    public ResponseEntity<?> overview(@AuthenticationPrincipal User user) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        if (user.getRole() == UserRole.INVESTOR) {
            Map<String, Double> userValuations = new HashMap<>();
            userValuationService.findByUser(user).parallelStream().forEach(val -> userValuations.put(val.getDate().toString(), val.getPrice()));


            response.put("nav", fundService.userNav(user));
            response.put("userValuations", userValuations);
            response.put("top5Funds", fundService.top5Funds(user));
        } else if (user.getRole() == UserRole.FUND_MANAGER) {
            response.put("totalAsset", fundService.calculateTotalAsset(user));
            response.put("totalNav", fundService.calculateTotalNav(user));
            response.put("listed", fundService.totalListed(user));
            response.put("nonListed", fundService.totalNonListed(user));
            response.put("ipo", fundService.totalIPO(user));
            response.put("top5Comparison", fundService.top5Performing(user));
        } else {
            System.out.println("STAGE 1");
            response.put("totalAsset", fundService.calculateTotalAsset(null));
            System.out.println("STAGE 2");
            response.put("totalNav", fundService.calculateTotalNav(null));
            System.out.println("STAGE 3");
            response.put("listed", fundService.totalListed(null));
            System.out.println("STAGE 4");
            response.put("nonListed", fundService.totalNonListed(null));
            System.out.println("STAGE 5");
            response.put("ipo", fundService.totalIPO(null));
            response.put("top5Comparison", fundService.top5Performing(null));
            System.out.println("STAGE 7");
            response.put("users", userService.listAllUsers().size());
            System.out.println("STAGE 8");
            response.put("usersInvested", fundTransactionService.investedUsersCount());
            System.out.println("STAGE 9");


        }


        return ResponseEntity.ok(response);

    }


}