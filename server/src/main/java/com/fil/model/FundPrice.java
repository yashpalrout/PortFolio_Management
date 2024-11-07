package com.fil.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@Data
@ToString
@Entity
public class FundPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "fund_price_id_generator")
    @TableGenerator(name = "fund_price_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
    private int priceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mutualFund", nullable = false)
    @JsonIgnore
    private MutualFund mutualFund;

    private double price;

    @CreationTimestamp
    private LocalDate date;

    public FundPrice(MutualFund mutualFund, double price) {
        super();
        this.mutualFund = mutualFund;
        this.price = price;
    }

}
