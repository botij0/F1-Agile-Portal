package com.f1metag.Common.Config;

import com.f1metag.Common.Config.Jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter JwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {
        return http
                .cors(Customizer.withDefaults())
                .csrf(
                        csrf -> csrf.disable()
                )
                .authorizeHttpRequests(authRequest ->
                        authRequest
                                .requestMatchers(HttpMethod.DELETE, "/api/v1/noticias/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/v1/noticias/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/v1/noticias/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/v1/votaciones/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/v1/votaciones").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/v1/usuarios/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/v1/usuarios/solicitudes/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/v1/circuitos/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/api/v1/circuitos/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/v1/circuitos/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE).authenticated()
                                .requestMatchers("/auth/**").permitAll()
                                .requestMatchers("/api/v1/votaciones/**").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/v1/noticias/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/v1/circuitos/**").permitAll()
                                .requestMatchers("/api/v1/equipos").permitAll()
                                .requestMatchers("/api/v1/equipos/{id}").permitAll()
                                .requestMatchers("/api/v1/calendario").permitAll()
                                .requestMatchers("/api/v1/pilotos/{id}").permitAll()
                                .anyRequest().authenticated()
                )
                .sessionManagement(sessionManagement ->
                        sessionManagement
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authProvider)
                .addFilterBefore(JwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "multipart/form-data"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }



}
