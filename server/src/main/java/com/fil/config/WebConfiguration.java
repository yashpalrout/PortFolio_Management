package com.fil.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fil.interceptor.UserAuthInterceptor;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

	@Autowired
	private UserAuthInterceptor userAuthInterceptor;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(userAuthInterceptor).addPathPatterns("/api/**").excludePathPatterns("/api/auth/**");
	}
}