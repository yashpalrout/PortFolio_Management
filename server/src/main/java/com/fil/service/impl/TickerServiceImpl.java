package com.fil.service.impl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fil.exceptions.AlreadyExistsException;
import com.fil.exceptions.NotFoundException;
import com.fil.model.Ticker;
import com.fil.repo.TickerRepo;
import com.fil.service.TickerService;

@Service
@Transactional
public class TickerServiceImpl implements TickerService {
	@Autowired
	TickerRepo tickerRepo;

	@Override
	public Ticker addTicker(Ticker ticker) throws AlreadyExistsException {

		Optional<Ticker> optTicker = tickerRepo.findBySymbol(ticker.getSymbol());

		if (optTicker.isPresent()) {
			throw new AlreadyExistsException();
		}

		tickerRepo.save(ticker);
		return ticker;
	}

	@Override
	public Ticker findById(int tickerId) throws NotFoundException {
		Optional<Ticker> optTicker = tickerRepo.findById(tickerId);

		if (optTicker.isEmpty()) {
			throw new NotFoundException();
		}

		return optTicker.get();
	}

	@Override
	public Ticker findBySymbol(String symbol) throws NotFoundException {
		Optional<Ticker> optTicker = tickerRepo.findBySymbol(symbol);

		if (optTicker.isEmpty()) {
			throw new NotFoundException();
		}

		return optTicker.get();
	}

	@Override
	public List<Ticker> findByNameLike(String name) {
		return tickerRepo.findByNameLike(name);
	}

}
