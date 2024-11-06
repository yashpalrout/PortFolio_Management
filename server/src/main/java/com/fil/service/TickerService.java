package com.fil.service;

import com.fil.exceptions.AlreadyExistsException;
import com.fil.exceptions.NotFoundException;
import com.fil.model.Ticker;

import java.util.List;

public interface TickerService {

    Ticker addTicker(Ticker ticker) throws AlreadyExistsException;

    Ticker findById(int tickerId) throws NotFoundException;

    Ticker findBySymbol(String symbol) throws NotFoundException;

    List<Ticker> findByNameLike(String name);

    List<Ticker> findAll();


}