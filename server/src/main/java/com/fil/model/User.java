package com.fil.model;

import java.sql.Date;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.TableGenerator;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fil.model.enums.UserRole;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Data
@ToString
@Entity
public class User {

	@Id
	@TableGenerator(name = "user_id_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "user_id_generator")
	private int userId;

	@NotBlank
	private String name;

	@NotBlank
	@Email
	private String email;

	@NotBlank
	private String phone;

	@JsonIgnore
	@NotBlank
	private String password;

	@NotNull
	private Date dob;

	@NotNull
	private UserRole role;

	@CreationTimestamp
	private LocalDateTime createdAt;

	public User(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}

	public User(String email, String password, UserRole role) {
		super();
		this.email = email;
		this.password = password;
		this.role = role;
	}

}
