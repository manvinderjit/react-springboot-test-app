package com.testapp.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
// import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import com.testapp.backend.model.Movie;
import com.testapp.backend.repository.MovieRepository;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	// @Value("${cors.allowed-origins:*}")
	// private String[] allowedOrigins;

    @Bean
	public WebMvcConfigurer corsConfigurer() {
	    return new WebMvcConfigurer() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/**")
	                    .allowedOrigins("http://three-tier-infra-app-ws-alb-75506392.us-east-2.elb.amazonaws.com")
	                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	                    .allowedHeaders("*")
	                    .allowCredentials(false);
	        }
	    };
	}

	@Bean
    CommandLineRunner initDatabase(MovieRepository repository) {
        return args -> {
            repository.save(new Movie("The Shawshank Redemption", "Frank Darabont", 1994));
            repository.save(new Movie("The Godfather", "Francis Ford Coppola", 1972));
            repository.save(new Movie("The Dark Knight", "Christopher Nolan", 2008));
            repository.save(new Movie("Pulp Fiction", "Quentin Tarantino", 1994));
            repository.save(new Movie("Forrest Gump", "Robert Zemeckis", 1994));
        };
    }

}
