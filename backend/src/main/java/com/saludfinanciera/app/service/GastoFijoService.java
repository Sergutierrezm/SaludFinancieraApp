package com.saludfinanciera.app.service;

import com.saludfinanciera.app.dto.GastoFijoDTO;
import com.saludfinanciera.app.entity.GastoFijo;
import com.saludfinanciera.app.entity.User;
import com.saludfinanciera.app.mapper.GastoFijoMapper;
import com.saludfinanciera.app.repository.GastoFijoRepository;
import com.saludfinanciera.app.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GastoFijoService {

    private final GastoFijoRepository repository;
    private final GastoFijoMapper mapper;
    private final UserRepository userRepository; // Inyectado para seguridad

    public GastoFijoService(GastoFijoRepository repository, GastoFijoMapper mapper, UserRepository userRepository) {
        this.repository = repository;
        this.mapper = mapper;
        this.userRepository = userRepository;
    }

    // --- MÉTODO AUXILIAR PARA LA SESIÓN ---
    private User getAuthenticatedUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado en sesión"));
    }

    public List<GastoFijoDTO> obtenerTodos() {
        // FILTRO: Solo gastos fijos del usuario actual
        return repository.findByUser(getAuthenticatedUser())
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<GastoFijoDTO> obtenerPorMes(YearMonth mes) {
        // FILTRO: Solo por usuario y mes
        return repository.findByUserAndMesContabilizacion(getAuthenticatedUser(), mes)
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public GastoFijoDTO crear(GastoFijoDTO dto) {
        if (dto.getFechaInicio() == null) {
            dto.setFechaInicio(LocalDate.now());
        }
        GastoFijo entity = mapper.toEntity(dto);

        // ASIGNACIÓN: El servidor decide quién es el dueño
        entity.setUser(getAuthenticatedUser());

        GastoFijo guardado = repository.save(entity);
        return mapper.toDTO(guardado);
    }

    public GastoFijoDTO actualizar(Long id, GastoFijoDTO dto) {
        GastoFijo entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("GastoFijo no encontrado"));

        // SEGURIDAD: Comprobamos que el gasto fijo pertenezca al usuario
        if (!entity.getUser().getId().equals(getAuthenticatedUser().getId())) {
            throw new RuntimeException("No tienes permiso para modificar este gasto fijo");
        }

        entity.setNombre(dto.getNombre());
        entity.setCantidad(dto.getCantidad());
        entity.setFechaInicio(dto.getFechaInicio());
        entity.setFechaFin(dto.getFechaFin());
        entity.setMesContabilizacion(dto.getMesContabilizacion());
        entity.setDescripcion(dto.getDescripcion());

        GastoFijo actualizado = repository.save(entity);
        return mapper.toDTO(actualizado);
    }

    public void borrarPorId(Long id) {
        GastoFijo entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("GastoFijo no encontrado"));

        // SEGURIDAD: Comprobamos propiedad antes de borrar
        if (entity.getUser().getId().equals(getAuthenticatedUser().getId())) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("No puedes borrar gastos fijos de otros usuarios");
        }
    }
}