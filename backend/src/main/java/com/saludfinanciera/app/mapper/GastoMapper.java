package com.saludfinanciera.app.mapper;


import org.springframework.stereotype.Component;
import com.saludfinanciera.app.entity.Gasto;
import com.saludfinanciera.app.dto.GastoDTO;

@Component
public class GastoMapper {

    public GastoDTO toDTO(Gasto gasto) {
        GastoDTO dto = new GastoDTO();
        dto.setId(gasto.getId());
        dto.setFechaGasto(gasto.getFechaGasto());
        dto.setMesContabilizacion(gasto.getMesContabilizacion());
        dto.setFechaRegistro(gasto.getFechaRegistro());
        dto.setComercio(gasto.getComercio());
        dto.setCantidad(gasto.getCantidad());
        dto.setDescripcion(gasto.getDescripcion());
        return dto;
    }


    public Gasto toEntity(GastoDTO dto) {
        Gasto gasto = new Gasto();
        gasto.setId(dto.getId());
        gasto.setFechaGasto(dto.getFechaGasto());
        gasto.setMesContabilizacion(dto.getMesContabilizacion());
        gasto.setFechaRegistro(dto.getFechaRegistro());
        gasto.setComercio(dto.getComercio());
        gasto.setCantidad(dto.getCantidad());
        gasto.setDescripcion(dto.getDescripcion());
        return gasto;
    }

}
