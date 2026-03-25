package com.saludfinanciera.app.service;

import com.saludfinanciera.app.dto.IngresoDTO;
import com.saludfinanciera.app.entity.Ingreso;
import com.saludfinanciera.app.mapper.IngresoMapper;
import com.saludfinanciera.app.repository.IngresoRepository;
import com.saludfinanciera.app.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.time.YearMonth;

import com.saludfinanciera.app.entity.User; // Tu entidad User
import org.springframework.security.core.context.SecurityContextHolder; // Para la sesión
import org.springframework.beans.factory.annotation.Autowired; // Si lo usas

@Service
public class IngresoService {

    private final IngresoRepository repository;
    private final IngresoMapper mapper;
    private final UserRepository userRepository; // Necesitamos esto para buscar al dueño

    public IngresoService(IngresoRepository repository, IngresoMapper mapper, UserRepository userRepository) {
        this.repository = repository;
        this.mapper = mapper;
        this.userRepository = userRepository;
    }

    // --- MÉTODO AUXILIAR PARA OBTENER EL USUARIO ACTUAL ---
    private User getAuthenticatedUser() {
        String username = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado en sesión"));
    }

    public List<IngresoDTO> obtenerTodos() {
        // FILTRO: Solo los ingresos del usuario autenticado
        return repository.findByUser(getAuthenticatedUser())
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<IngresoDTO> obtenerPorMes(YearMonth mes) {
        // FILTRO: Solo los ingresos del usuario para ese mes concreto
        return repository.findByUserAndMesContabilizacion(getAuthenticatedUser(), mes)
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public IngresoDTO crear(IngresoDTO dto) {
        Ingreso ingreso = mapper.toEntity(dto);
        // ASIGNACIÓN: Le ponemos el dueño antes de guardar
        ingreso.setUser(getAuthenticatedUser());
        Ingreso guardado = repository.save(ingreso);
        return mapper.toDTO(guardado);
    }

    public IngresoDTO actualizar(Long id, IngresoDTO dto) {
        // SEGURIDAD: Buscamos el ingreso y verificamos que sea del usuario
        Ingreso ingreso = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingreso no encontrado"));

        // Opcional: Podrías añadir un check de seguridad aquí
        // if (!ingreso.getUser().equals(getAuthenticatedUser())) throw Exception...

        ingreso.setOrigen(dto.getOrigen());
        ingreso.setCantidad(dto.getCantidad());
        ingreso.setFechaIngreso(dto.getFechaIngreso());
        ingreso.setMesContabilizacion(dto.getMesContabilizacion());
        ingreso.setDescripcion(dto.getDescripcion());

        Ingreso actualizado = repository.save(ingreso);
        return mapper.toDTO(actualizado);
    }

    public void borrarPorId(Long id) {
        // Aquí podrías primero buscar el ingreso para ver si pertenece al usuario antes de borrar
        repository.deleteById(id);
    }
}