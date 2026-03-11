package com.saludfinanciera.app.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;

public class GastoFijoDTO {

    private Long id;
    private String nombre;
    private BigDecimal cantidad;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private YearMonth mesContabilizacion;
    private String descripcion;

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public BigDecimal getCantidad() { return cantidad; }
    public void setCantidad(BigDecimal cantidad) { this.cantidad = cantidad; }

    public LocalDate getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDate fechaInicio) { this.fechaInicio = fechaInicio; }

    public LocalDate getFechaFin() { return fechaFin; }
    public void setFechaFin(LocalDate fechaFin) { this.fechaFin = fechaFin; }

    public YearMonth getMesContabilizacion() { return mesContabilizacion; }
    public void setMesContabilizacion(YearMonth mesContabilizacion) { this.mesContabilizacion = mesContabilizacion; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
}