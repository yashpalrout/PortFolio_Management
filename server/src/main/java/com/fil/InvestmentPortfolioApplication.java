package com.fil;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.IOException;

@SpringBootApplication
@EnableScheduling
public class InvestmentPortfolioApplication {
//
//    @Autowired
//    private UserService userService;
//    @Autowired
//    private UserValuationService userValuationService;

    public static void main(String[] args) throws IOException {
        SpringApplication.run(InvestmentPortfolioApplication.class, args);
    }
//
//    @EventListener(ApplicationReadyEvent.class)
//    public void doSomethingAfterStartup() {
//        System.out.println("hello world, I have just started up");
//        User user = userService.findUserById(102);
//
//        List<UserValuation> prices = new ArrayList<>();
//        prices.add(new UserValuation(user, 1000000));
//        prices.add(new UserValuation(user, 1200000));
//        prices.add(new UserValuation(user, 1400000));
//        prices.add(new UserValuation(user, 1500000));
//        prices.add(new UserValuation(user, 1600000));
//        prices.add(new UserValuation(user, 1800000));
//        prices.add(new UserValuation(user, 1900000));
//        prices.add(new UserValuation(user, 2000000));
//        prices.add(new UserValuation(user, 1000000));
//
//        userValuationService.saveAll(prices);
//
//    }

}
