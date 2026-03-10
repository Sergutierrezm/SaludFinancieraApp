package com.saludfinanciera.app.service;

import com.saludfinanciera.app.dto.GastoDTO;
import com.saludfinanciera.app.entity.Gasto;
import com.saludfinanciera.app.mapper.GastoMapper;
import com.saludfinanciera.app.repository.GastoRepository;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GastoService {

    private final GastoRepository gastoRepository;
    private final GastoMapper gastoMapper;

    public GastoService(GastoRepository gastoRepository, GastoMapper gastoMapper) {
        this.gastoRepository = gastoRepository;
        this.gastoMapper = gastoMapper;
    }

    public List<GastoDTO> obtenerTodos() {
        return gastoRepository.findAll()
                .stream()
                .map(gastoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<GastoDTO> obtenerPorMes(YearMonth mes) {
        return gastoRepository.findByMesContabilizacion(mes)
                .stream()
                .map(gastoMapper::toDTO)
                .collect(Collectors.toList());
    }

    public GastoDTO crear(GastoDTO dto) {
        if (dto.getFechaRegistro() == null) {
            dto.setFechaRegistro(java.time.LocalDate.now());
        }
        Gasto gasto = gastoMapper.toEntity(dto);
        Gasto guardado = gastoRepository.save(gasto);
        return gastoMapper.toDTO(guardado);
    }

    public void borrarPorId(Long id) {
        gastoRepository.deleteById(id);
    }

    public GastoDTO actualizar(Long id, GastoDTO dto) {
        Gasto gastoExistente = gastoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gasto no encontrado"));

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