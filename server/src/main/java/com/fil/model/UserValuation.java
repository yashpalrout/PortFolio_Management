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
public class UserValuation {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "user_valuation_id_generator")
    @TableGenerator(name = "user_valuation_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
    private int priceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user", nullable = false)
    @JsonIgnore
    private User user;

    private double price;

    @CreationTimestamp
    private LocalDate date;

    public UserValuation(User user, double price) {
        super();
        this.user = user;
        this.price = price;
    }

}
