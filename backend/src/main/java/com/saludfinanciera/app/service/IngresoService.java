package com.saludfinanciera.app.service;

import com.saludfinanciera.app.dto.IngresoDTO;
import com.saludfinanciera.app.entity.Ingreso;
import com.saludfinanciera.app.mapper.IngresoMapper;
import com.saludfinanciera.app.repository.IngresoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.time.YearMonth;

@Service
public class IngresoService {

    private final IngresoRepository repository;
    private final IngresoMapper mapper;

    public IngresoService(IngresoRepository repository, IngresoMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<IngresoDTO> obtenerTodos() {
        return repository.findAll()
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<IngresoDTO> obtenerPorMes(YearMonth mes) {
        return repository.findByMesContabilizacion(mes)
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public IngresoDTO crear(IngresoDTO dto) {
        Ingreso ingreso = mapper.toEntity(dto);
        Ingreso guardado = repository.save(ingreso);
        return mapper.toDTO(guardado);
    }

    public IngresoDTO actualizar(Long id, IngresoDTO dto) {

        Ingreso ingreso = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingreso no encontrado"));

        ingreso.setOrigen(dto.getOrigen());
        ingreso.setCantidad(dto.getCantidad());
        ingreso.setFechaIngreso(dto.getFechaIngreso());
        ingreso.setMesContabilizacion(dto.getMesContabilizacion());
        ingreso.setDescripcion(dto.getDescripcion());

        Ingreso actualizado = repository.save(ingreso);

        return mapper.toDTO(actualizado);
    }

    public void borrarPorId(Long id) {
        repository.deleteById(id);
    }
}