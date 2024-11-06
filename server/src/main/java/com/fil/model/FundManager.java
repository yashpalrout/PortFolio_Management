package com.fil.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NoArgsConstructor
@Data
@ToString
@Entity
public class FundManager {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "management_id_generator")
    @TableGenerator(name = "management_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
    private int managementId;

    @ManyToOne()
    @JoinColumn(name = "mutualFund", nullable = false)
    private MutualFund mutualFund;

    @ManyToOne()
    @JoinColumn(name = "manager", nullable = false)
    private User manager;

    public FundManager(MutualFund mutualFund, User manager) {
        super();
        this.mutualFund = mutualFund;
        this.manager = manager;
    }

}
