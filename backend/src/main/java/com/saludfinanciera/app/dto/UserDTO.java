package com.saludfinanciera.app.dto;

public class UserDTO {
    private Long id;
    private String username;
    private String role;

    // Constructor vacío
    public UserDTO() {}

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}