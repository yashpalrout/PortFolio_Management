package com.fil.model;

import com.fil.model.enums.FundStatus;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@ToString
@Entity
public class MutualFund {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "fund_id_generator")
    @TableGenerator(name = "fund_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
    private int fundId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private double initialTarget;

    @Column(nullable = false)
    private double assetSize;

    @Column(nullable = false)
    private double assetNav;

    @Column(nullable = false)
    private int tokenCount;

    @Column(nullable = false)
    @ColumnDefault(value = "0.0")
    private double tokenPrice;

    @ColumnDefault(value = "0.0")
    private double expenseRatio;

    @ColumnDefault(value = "0.0")
    private double exitLoad;

    @ColumnDefault(value = "0")
    private int exitLoadLimit;

    @ColumnDefault(value = "0.0")
    private double inHand;

    private FundStatus status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public MutualFund(String name, double initialTarget, int tokenCount) {
        super();
        this.name = name;
        this.initialTarget = initialTarget;
        this.assetSize = 0;
        this.assetNav = 0;
        this.tokenCount = tokenCount;
        this.tokenPrice = initialTarget / tokenCount;
        this.expenseRatio = 0.0;
        this.exitLoad = 0.0;
        this.exitLoadLimit = 0;
        this.inHand = initialTarget;
        this.status = FundStatus.NOT_LISTED;
    }

}
