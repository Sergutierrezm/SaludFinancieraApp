package com.saludfinanciera.app.mapper;

import com.saludfinanciera.app.entity.User;
import com.saludfinanciera.app.dto.UserDTO;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO toDTO(User user) {
        if (user == null) return null;

        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setRole(user.getRole());
        return dto;
    }

    // Por si mañana necesitamos crear un usuario desde el registro de Angular
    public User toEntity(UserDTO dto) {
        if (dto == null) return null;

        User user = new User();
        user.setId(dto.getId());
        user.setUsername(dto.getUsername());
        user.setRole(dto.getRole());
        // La contraseña se setearía aparte tras cifrarla en el Service
        return user;
    }
}