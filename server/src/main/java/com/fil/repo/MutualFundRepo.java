package com.fil.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fil.model.MutualFund;

@Repository
public interface MutualFundRepo extends JpaRepository<MutualFund, Integer> {

	@Query("Select mf from MutualFund mf where mf.name like :name%")
	List<MutualFund> findByNameLike(@Param("name") String name);

}
