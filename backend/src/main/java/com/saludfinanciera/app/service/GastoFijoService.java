package com.saludfinanciera.app.service;

import com.saludfinanciera.app.dto.GastoFijoDTO;
import com.saludfinanciera.app.entity.GastoFijo;
import com.saludfinanciera.app.mapper.GastoFijoMapper;
import com.saludfinanciera.app.repository.GastoFijoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GastoFijoService {

    private final GastoFijoRepository repository;
    private final GastoFijoMapper mapper;

    public GastoFijoService(GastoFijoRepository repository, GastoFijoMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<GastoFijoDTO> obtenerTodos() {
        return repository.findAll().stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<GastoFijoDTO> obtenerPorMes(YearMonth mes) {
        return repository.findByMesContabilizacion(mes).stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public GastoFijoDTO crear(GastoFijoDTO dto) {
        if (dto.getFechaInicio() == null) {
            dto.setFechaInicio(LocalDate.now());
        }
        GastoFijo guardado = repository.save(mapper.toEntity(dto));
        return mapper.toDTO(guardado);
    }

    public GastoFijoDTO actualizar(Long id, GastoFijoDTO dto) {
        GastoFijo entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("GastoFijo no encontrado"));
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
        repository.deleteById(id);
    }
}