package com.fil.controller;

import com.fil.dto.AddToInventory;
import com.fil.exceptions.InvalidFieldException;
import com.fil.market.StockMarket;
import com.fil.model.OHLC;
import com.fil.model.Ticker;
import com.fil.service.TickerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    @Autowired
    private StockMarket marketAPI;

    @Autowired
    private TickerService tickerService;

    @GetMapping()
    public ResponseEntity<?> search(@RequestParam(name = "search", required = true) String search) {
        if (search.isEmpty()) {
            throw new InvalidFieldException();
        }
        List<Ticker> result = marketAPI.search(search);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", result);
        return ResponseEntity.status(HttpStatus.OK).body(map);

    }

    @PostMapping("/add-to-inventory")
    public ResponseEntity<?> addToInventory(@Valid @RequestBody AddToInventory data) {
        Ticker ticker = tickerService.addTicker(data.toTicker());
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", ticker);
        return ResponseEntity.status(HttpStatus.CREATED).body(map);

    }

    @GetMapping("/tickers")
    public ResponseEntity<?> addToInventory() {
        List<Ticker> tickers = tickerService.findAll();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", tickers);
        return ResponseEntity.ok(map);

    }

    @GetMapping("/tickers/{tickerId}/ohlc")
    public ResponseEntity<?> getOhlc(@PathVariable int tickerId) {
        Ticker ticker = tickerService.findById(tickerId);

        Map<String, OHLC> dailyOHLC = marketAPI.getDailyOHLC(ticker.getSymbol());


        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", true);
        map.put("data", dailyOHLC.values());
        return ResponseEntity.ok(map);

    }

}