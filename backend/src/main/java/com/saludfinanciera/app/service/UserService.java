package com.saludfinanciera.app.service;

import com.saludfinanciera.app.dto.UserDTO;
import com.saludfinanciera.app.entity.User;
import com.saludfinanciera.app.mapper.UserMapper;
import com.saludfinanciera.app.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    // Inyección por constructor (la mejor práctica)
    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    // Método para registrar un nuevo usuario (Cifrando la contraseña)
    public UserDTO createUser(User user) {
        // 1. Ciframos la contraseña antes de guardar
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 2. Guardamos en la DB
        User savedUser = userRepository.save(user);

        // 3. Devolvemos el DTO (limpio, sin password)
        return userMapper.toDTO(savedUser);
    }

    // Listar todos los usuarios para tu panel de administración
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(userMapper::toDTO)
                .orElse(null);
    }
}
