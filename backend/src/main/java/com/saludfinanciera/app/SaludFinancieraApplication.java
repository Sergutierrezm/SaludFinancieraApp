package com.saludfinanciera.app;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.saludfinanciera.app.entity.User;
import com.saludfinanciera.app.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication
public class SaludFinancieraApplication {

    public static void main(String[] args) {
        SpringApplication.run(SaludFinancieraApplication.class, args);
    }

    /**
     * Definimos el PasswordEncoder aquí para que esté disponible desde el inicio
     * y no cause conflictos de dependencia circular con SecurityConfig.
     */


    /**
     * Inicializa la base de datos con un usuario administrador si no existe ninguno.
     */
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Verificamos si la tabla de usuarios está vacía
            if (userRepository.count() == 0) {
                User admin = new User();
                admin.setUsername("admin");
                // Ciframos la contraseña "1234" usando BCrypt
                admin.setPassword(passwordEncoder.encode("1234"));
                admin.setRole("ADMIN");

                userRepository.save(admin);
                System.out.println("--------------------------------------------------");
                System.out.println("👤 Usuario 'admin' creado con éxito (pass: 1234)");
                System.out.println("--------------------------------------------------");
            } else {
                System.out.println("✅ Base de datos lista: El usuario 'admin' ya existe.");
            }
        };
    }

    /**
     * Configuración de Jackson para manejar correctamente las fechas de Java 8 (LocalDate/LocalDateTime)
     */
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        return mapper;
    }
}