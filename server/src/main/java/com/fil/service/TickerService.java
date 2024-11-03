package com.fil.service;

import java.util.List;

import com.fil.exceptions.AlreadyExistsException;
import com.fil.exceptions.NotFoundException;
import com.fil.model.Ticker;

public interface TickerService {

	Ticker addTicker(Ticker ticker) throws AlreadyExistsException;

	Ticker findById(int tickerId) throws NotFoundException;

	Ticker findBySymbol(String symbol) throws NotFoundException;

	List<Ticker> findByNameLike(String name);

}