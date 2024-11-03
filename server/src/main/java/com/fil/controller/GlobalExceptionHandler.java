package com.fil.controller;

import com.fil.exceptions.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {IllegalArgumentException.class, IllegalStateException.class})
    protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {

        ex.printStackTrace();
        String bodyOfResponse = "This should be application specific";
        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler(value = {NotFoundException.class})
    protected ResponseEntity<Object> handleNotFound(RuntimeException ex, WebRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", false);
        map.put("error", "RESOURCE_NOT_FOUND");
        map.put("message", "The requested resource not found.");
        return handleExceptionInternal(ex, map, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(value = {AlreadyExistsException.class})
    protected ResponseEntity<Object> handleAlreadyExists(RuntimeException ex, WebRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", false);
        map.put("error", "RESOURCE_ALREADY_EXISTS");
        map.put("message", "The resource you can to create, already exists.");
        return handleExceptionInternal(ex, map, new HttpHeaders(), HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler(value = {InvalidFieldException.class})
    protected ResponseEntity<Object> handleInvalidField(RuntimeException ex, WebRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", false);
        map.put("error", "BAD_REQUEST");
        map.put("message", "Request doesn't contain proper data to process this request.");
        return handleExceptionInternal(ex, map, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = {InitialisationFailedException.class})
    protected ResponseEntity<Object> handleInitialisationFailed(RuntimeException ex, WebRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", false);
        map.put("error", "INITIALISATION_FAILED");
        map.put("message", "Mutual fund listing failed. Few Stock may not of recent OHLC data.");
        return handleExceptionInternal(ex, map, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = {TransactionNotAllowdedException.class})
    protected ResponseEntity<Object> handleTransactionNotAllowded(RuntimeException ex, WebRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", false);
        map.put("error", "TRANSACTION_NOT_ALLOWED");
        map.put("message", "This transaction is not allowded");
        return handleExceptionInternal(ex, map, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = {PermissionDeniedException.class})
    protected ResponseEntity<Object> handlePermissionDenied(RuntimeException ex, WebRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", false);
        map.put("error", "PERMISSION_DENIED");
        map.put("message", "You don't have sufficient permission.");
        return handleExceptionInternal(ex, map, new HttpHeaders(), HttpStatus.FORBIDDEN, request);
    }

    @ExceptionHandler(value = {InsufficientBalanceException.class})
    protected ResponseEntity<Object> handleInsufficientBalance(RuntimeException ex, WebRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", false);
        map.put("error", "INSUFFICIENT_BALANCE");
        map.put("message", "You don't have sufficient balance.");
        return handleExceptionInternal(ex, map, new HttpHeaders(), HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler(value = {UserUnauthorizedException.class})
    protected ResponseEntity<Object> handleUnauthorized(RuntimeException ex, WebRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", false);
        map.put("error", "UNAUTHORIZED");
        map.put("message", "Authorization failed.");
        return handleExceptionInternal(ex, map, new HttpHeaders(), HttpStatus.UNAUTHORIZED, request);
    }

}