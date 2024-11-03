package com.fil.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fil.exceptions.InvalidFieldException;
import com.fil.exceptions.TransactionNotAllowdedException;
import com.fil.model.FundTransaction;
import com.fil.model.MutualFund;
import com.fil.model.User;
import com.fil.model.enums.FundStatus;
import com.fil.service.FundTransactionService;
import com.fil.service.MutualFundService;

@RestController
@RequestMapping("/api/mutual-fund/{fundId}/transaction")
public class FundTranasctionController {

	@Autowired
	private MutualFundService mutualFundService;

	@Autowired
	private FundTransactionService fundTransactionService;

	@PostMapping("/purchase")
	public ResponseEntity<?> purchaseFund(@PathVariable int fundId, @RequestBody ModelMap modal,
			HttpServletRequest req) {

		Object qtyObj = modal.get("qty");
		System.out.println(qtyObj);
		if (!(qtyObj instanceof Integer)) {
			throw new InvalidFieldException();
		}
		User user = (User) req.getAttribute("user");

		int qty = (int) qtyObj;

		MutualFund fund = mutualFundService.findById(fundId);

		if (fund.getStatus() == FundStatus.NOT_LISTED) {
			throw new TransactionNotAllowdedException();
		}

		FundTransaction transaction = fundTransactionService.purchase(fund, user, qty);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("success", true);
		map.put("data", transaction);
		return ResponseEntity.status(HttpStatus.CREATED).body(map);
	}

	@PostMapping("/sell")
	public ResponseEntity<?> sellFund(@PathVariable int fundId, @RequestBody ModelMap modal, HttpServletRequest req) {

		Object qtyObj = modal.get("qty");
		if (qtyObj == null || !(qtyObj instanceof Integer)) {
			throw new InvalidFieldException();
		}
		User user = (User) req.getAttribute("user");

		int qty = (int) qtyObj;

		MutualFund fund = mutualFundService.findById(fundId);

		if (fund.getStatus() != FundStatus.LISTED) {
			throw new TransactionNotAllowdedException();
		}

		FundTransaction transaction = fundTransactionService.sell(fund, user, qty);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("success", true);
		map.put("data", transaction);
		return ResponseEntity.status(HttpStatus.CREATED).body(map);
	}

}