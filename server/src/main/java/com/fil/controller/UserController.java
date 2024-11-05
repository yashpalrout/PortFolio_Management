package com.fil.controller;

import com.fil.dto.PasswordChangeData;
import com.fil.dto.UserRegistrationData;
import com.fil.dto.UserUpdateData;
import com.fil.exceptions.AlreadyExistsException;
import com.fil.exceptions.InvalidFieldException;
import com.fil.exceptions.NotFoundException;
import com.fil.exceptions.PermissionDeniedException;
import com.fil.model.User;
import com.fil.model.Wallet;
import com.fil.model.enums.UserRole;
import com.fil.service.UserService;
import com.fil.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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

    @PostMapping("/add-balance")
    public ResponseEntity<?> addBalance(@RequestBody ModelMap modal, HttpServletRequest req) {
        Object amtObj = modal.get("amount");
        if (!(amtObj instanceof Double)) {
            throw new InvalidFieldException();
        }
        User user = (User) req.getAttribute("user");

        double amount = (double) amtObj;

        walletService.addBalance(user, amount);

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
    public ResponseEntity<?> addUser(@Valid @RequestBody UserRegistrationData data, HttpServletRequest req)
            throws AlreadyExistsException, PermissionDeniedException {
        User reqUser = (User) req.getAttribute("user");
        if (reqUser.getRole() != UserRole.PORTAL_MANAGER) {
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


}