package com.saludfinanciera.app.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;

public class IngresoDTO {

    private Long id;
    private String origen;
    private BigDecimal cantidad;
    private LocalDate fechaIngreso;
    private YearMonth mesContabilizacion;
    private String descripcion;

    // getters y setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getOrigen() { return origen; }

    public void setOrigen(String origen) { this.origen = origen; }

    public BigDecimal getCantidad() { return cantidad; }

    public void setCantidad(BigDecimal cantidad) { this.cantidad = cantidad; }

    public LocalDate getFechaIngreso() { return fechaIngreso; }

    public void setFechaIngreso(LocalDate fechaIngreso) { this.fechaIngreso = fechaIngreso; }

    public YearMonth getMesContabilizacion() { return mesContabilizacion; }

    public void setMesContabilizacion(YearMonth mesContabilizacion) { this.mesContabilizacion = mesContabilizacion; }

    public String getDescripcion() { return descripcion; }

    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
}