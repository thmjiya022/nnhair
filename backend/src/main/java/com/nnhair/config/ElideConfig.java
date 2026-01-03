package com.nnhair.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class ElideConfig {

    // Optional: Customize the generated OpenAPI (Swagger) documentation
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("NNHair E‑commerce API")
                        .version("1.0")
                        .description("JSON:API using Elide 7 + Spring Boot"));
    }
}
