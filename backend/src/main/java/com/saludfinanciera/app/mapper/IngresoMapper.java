package com.saludfinanciera.app.mapper;

import com.saludfinanciera.app.dto.IngresoDTO;
import com.saludfinanciera.app.entity.Ingreso;
import org.springframework.stereotype.Component;

@Component
public class IngresoMapper {

    public IngresoDTO toDTO(Ingreso entity) {
        IngresoDTO dto = new IngresoDTO();
        dto.setId(entity.getId());
        dto.setOrigen(entity.getOrigen());
        dto.setCantidad(entity.getCantidad());
        dto.setFechaIngreso(entity.getFechaIngreso());
        dto.setMesContabilizacion(entity.getMesContabilizacion());
        dto.setDescripcion(entity.getDescripcion());
        return dto;
    }

    public Ingreso toEntity(IngresoDTO dto) {
        Ingreso entity = new Ingreso();
        entity.setId(dto.getId());
        entity.setOrigen(dto.getOrigen());
        entity.setCantidad(dto.getCantidad());
        entity.setFechaIngreso(dto.getFechaIngreso());
        entity.setMesContabilizacion(dto.getMesContabilizacion());
        entity.setDescripcion(dto.getDescripcion());
        return entity;
    }
}