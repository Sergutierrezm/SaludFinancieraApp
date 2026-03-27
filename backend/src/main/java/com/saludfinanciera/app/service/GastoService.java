package com.saludfinanciera.app.service;

import com.saludfinanciera.app.dto.GastoDTO;
import com.saludfinanciera.app.entity.Gasto;
import com.saludfinanciera.app.entity.User;
import com.saludfinanciera.app.mapper.GastoMapper;
import com.saludfinanciera.app.repository.GastoRepository;
import com.saludfinanciera.app.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GastoService {

    private final GastoRepository gastoRepository;
    private final GastoMapper gastoMapper;
    private final UserRepository userRepository; // Inyectamos el repositorio de usuarios

    public GastoService(GastoRepository gastoRepository, GastoMapper gastoMapper, UserRepository userRepository) {
        this.gastoRepository = gastoRepository;
        this.gastoMapper = gastoMapper;
        this.userRepository = userRepository;
    }

    // --- MÉTODO AUXILIAR PARA LA SESIÓN ---
    private User getAuthenticatedUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado en sesión"));
    }

    public List<GastoDTO> obtenerTodos() {
        // FILTRO: Solo gastos del usuario actual
        return gastoRepository.findByUser(getAuthenticatedUser())
                .stream()
                .map(gastoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<GastoDTO> obtenerPorMes(YearMonth mes) {
        // FILTRO: Solo gastos del usuario para este mes
        return gastoRepository.findByUserAndMesContabilizacion(getAuthenticatedUser(), mes)
                .stream()
                .map(gastoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public GastoDTO crear(GastoDTO dto) {
        if (dto.getFechaRegistro() == null) {
            dto.setFechaRegistro(java.time.LocalDate.now());
        }
        Gasto gasto = gastoMapper.toEntity(dto);

        // ASIGNACIÓN: Vinculamos el dueño
        gasto.setUser(getAuthenticatedUser());

        Gasto guardado = gastoRepository.save(gasto);
        return gastoMapper.toDTO(guardado);
    }

    public void borrarPorId(Long id) {
        // SEGURIDAD: Antes de borrar, verificamos que el gasto sea del usuario
        Gasto gasto = gastoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gasto no encontrado"));

        if (!gasto.getUser().getId().equals(getAuthenticatedUser().getId())) {
            throw new RuntimeException("No tienes permiso para borrar este gasto");
        }

        gastoRepository.deleteById(id);
    }

    public GastoDTO actualizar(Long id, GastoDTO dto) {
        Gasto gastoExistente = gastoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gasto no encontrado"));

        // SEGURIDAD: Verificamos propiedad antes de actualizar
        if (!gastoExistente.getUser().getId().equals(getAuthenticatedUser().getId())) {
            throw new RuntimeException("No tienes permiso para editar este gasto");
        }

        // Actualizar campos
        gastoExistente.setCantidad(dto.getCantidad());
        gastoExistente.setComercio(dto.getComercio());
        gastoExistente.setDescripcion(dto.getDescripcion());
        gastoExistente.setFechaGasto(dto.getFechaGasto());
        gastoExistente.setMesContabilizacion(dto.getMesContabilizacion());
        gastoExistente.setFechaRegistro(dto.getFechaRegistro());

        Gasto actualizado = gastoRepository.save(gastoExistente);
        return gastoMapper.toDTO(actualizado);
    }
}