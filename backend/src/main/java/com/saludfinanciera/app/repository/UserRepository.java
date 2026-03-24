package com.saludfinanciera.app.repository;

import com.saludfinanciera.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Este método es vital para el login: busca al usuario por su nombre
    Optional<User> findByUsername(String username);

    // Opcional: Para comprobar si un nombre de usuario ya existe al registrarse
    boolean existsByUsername(String username);
}