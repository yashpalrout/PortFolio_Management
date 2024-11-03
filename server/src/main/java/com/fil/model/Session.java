package com.fil.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.CreationTimestamp;

import com.fil.util.JwtUtil;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Data
@ToString
@Entity
public class Session {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "sessions_generator")
	@TableGenerator(name = "sessions_generator", table = "id_gen", pkColumnName = "gen_name", valueColumnName = "id_val", initialValue = 101, allocationSize = 0)
	private int sessionId;

	@ManyToOne()
	@JoinColumn(name = "user", nullable = false)
	private User user;

	@CreationTimestamp
	private LocalDateTime loginAt;

	private LocalDateTime expiresAt;

	@Column(nullable = true, unique = true)
	private String refreshToken;

	private String ipAddress, userAgent;

	public Session(User user) {
		super();
		this.user = user;
		this.expiresAt = LocalDateTime.now().plusDays(10);
		this.refreshToken = JwtUtil.encode(String.valueOf(this.sessionId));
	}

	public Session(User user, String ipAddress, String userAgent) {
		super();
		this.user = user;
		this.expiresAt = LocalDateTime.now().plusDays(10);
		this.refreshToken = JwtUtil.encode(String.valueOf(this.sessionId) + this.user.getUserId());
		this.ipAddress = ipAddress;
		this.userAgent = userAgent;
	}

	public String getAccessToken() {
		String encode = JwtUtil.encode(String.valueOf(sessionId));
		return encode;
	}

}
