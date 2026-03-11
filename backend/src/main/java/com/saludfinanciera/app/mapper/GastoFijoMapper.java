package com.saludfinanciera.app.mapper;

import com.saludfinanciera.app.dto.GastoFijoDTO;
import com.saludfinanciera.app.entity.GastoFijo;
import org.springframework.stereotype.Component;

@Component
public class GastoFijoMapper {

    public GastoFijoDTO toDTO(GastoFijo entity) {
        GastoFijoDTO dto = new GastoFijoDTO();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setCantidad(entity.getCantidad());
        dto.setFechaInicio(entity.getFechaInicio());
        dto.setFechaFin(entity.getFechaFin());
        dto.setMesContabilizacion(entity.getMesContabilizacion());
        dto.setDescripcion(entity.getDescripcion());
        return dto;
    }

    public GastoFijo toEntity(GastoFijoDTO dto) {
        GastoFijo entity = new GastoFijo();
        entity.setId(dto.getId());
        entity.setNombre(dto.getNombre());
        entity.setCantidad(dto.getCantidad());
        entity.setFechaInicio(dto.getFechaInicio());
        entity.setFechaFin(dto.getFechaFin());
        entity.setMesContabilizacion(dto.getMesContabilizacion());
        entity.setDescripcion(dto.getDescripcion());
        return entity;
    }
}