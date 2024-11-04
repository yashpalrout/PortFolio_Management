package com.fil.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NoArgsConstructor
@Data
@ToString
@Entity
public class FavoriteFund {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "favorite_id_generator")
    @TableGenerator(name = "favorite_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
    private int favoriteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mutualFund", nullable = false)
    @JsonIgnore
    private MutualFund mutualFund;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user", nullable = false)
    @JsonIgnore
    private User user;


    public FavoriteFund(MutualFund mutualFund, User user) {
        super();
        this.mutualFund = mutualFund;
        this.user = user;
    }

}
