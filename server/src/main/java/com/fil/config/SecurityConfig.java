package com.fil.config;

import com.fil.security.AccessTokenGeneratorFilter;
import com.fil.security.AuthCookieAuthenticationFilter;
import com.fil.security.UserAuthenticationEntryPoint;
import com.fil.security.UsernamePasswordAuthFilter;
import com.fil.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import static com.fil.util.Const.AUTH_COOKIE;
import static com.fil.util.Const.REFRESH_COOKIE;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserAuthenticationEntryPoint userAuthenticationEntryPoint;

    @Autowired
    private SessionService sessionService;


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .exceptionHandling()
                .authenticationEntryPoint(userAuthenticationEntryPoint)
                .and()

                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .logout()
                .deleteCookies(AUTH_COOKIE, REFRESH_COOKIE)
                .and()

                .addFilterBefore(new UsernamePasswordAuthFilter(), BasicAuthenticationFilter.class)
                .addFilterBefore(new AuthCookieAuthenticationFilter(), UsernamePasswordAuthFilter.class)
                .addFilterAfter(new AccessTokenGeneratorFilter(sessionService), AuthCookieAuthenticationFilter.class)

                .cors().and().csrf().disable()

                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/auth/login", "/api/auth/register").permitAll()

                .anyRequest().authenticated();


    }

}