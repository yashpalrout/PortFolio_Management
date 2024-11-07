package com.fil.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fil.model.enums.TransactionType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@ToString
@Entity
public class FundTransaction {

    @Id
    @TableGenerator(name = "fund_transaction_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "fund_transaction_id_generator")
    private int fundTransactionId;

    @ManyToOne()
    @JoinColumn(name = "fund", nullable = false)
    private MutualFund fund;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user", nullable = false)
    @JsonIgnore
    private User user;

    private int quantity;
    private double amount;
    private double price;
    private TransactionType type;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public FundTransaction(MutualFund fund, User user, int quantity, TransactionType type) {
        super();
        this.fund = fund;
        this.user = user;
        this.quantity = quantity;
        this.price = fund.getTokenPrice();
        this.amount = quantity * this.price;
        this.type = type;
    }

}
