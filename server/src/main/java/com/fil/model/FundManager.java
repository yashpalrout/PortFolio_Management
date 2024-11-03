package com.fil.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.TableGenerator;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Data
@ToString
@Entity
public class FundManager {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "management_id_generator")
	@TableGenerator(name = "management_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
	private int managementId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mutualFund", nullable = false)
	private MutualFund mutualFund;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "manager", nullable = false)
	private User manager;

	public FundManager(MutualFund mutualFund, User manager) {
		super();
		this.mutualFund = mutualFund;
		this.manager = manager;
	}

}
