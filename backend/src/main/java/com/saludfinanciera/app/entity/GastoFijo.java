package com.saludfinanciera.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.saludfinanciera.app.converter.YearMonthAttributeConverter;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;

@Entity
public class GastoFijo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre; // Nombre del gasto fijo (ej. "Alquiler", "Netflix")

    private BigDecimal cantidad; // Cuánto se paga

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaInicio; // Fecha de inicio del gasto fijo

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaFin; // Fecha de finalización (puede ser null si es indefinido)

    @Convert(converter = YearMonthAttributeConverter.class)
    private YearMonth mesContabilizacion; // Mes al que se asigna cada pago

    private String descripcion; // Detalles opcionales

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




