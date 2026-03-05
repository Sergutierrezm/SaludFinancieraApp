package com.saludfinanciera.app.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;

public class GastoDTO {

    private Long id;
    private LocalDate fechaGasto;
    private YearMonth mesContabilizacion;
    private LocalDate fechaRegistro;
    private String comercio;
    private BigDecimal cantidad;
    private String descripcion;

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getFechaGasto() { return fechaGasto; }
    public void setFechaGasto(LocalDate fechaGasto) { this.fechaGasto = fechaGasto; }

    public YearMonth getMesContabilizacion() { return mesContabilizacion; }
    public void setMesContabilizacion(YearMonth mesContabilizacion) { this.mesContabilizacion = mesContabilizacion; }

    public LocalDate getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDate fechaRegistro) { this.fechaRegistro = fechaRegistro; }

    public String getComercio() { return comercio; }
    public void setComercio(String comercio) { this.comercio = comercio; }

    public BigDecimal getCantidad() { return cantidad; }
    public void setCantidad(BigDecimal cantidad) { this.cantidad = cantidad; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }


}
