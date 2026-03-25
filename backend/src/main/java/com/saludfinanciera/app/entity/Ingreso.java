package com.saludfinanciera.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.saludfinanciera.app.converter.YearMonthAttributeConverter;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;

@Entity
public class Ingreso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String origen; // Ej: Nómina, Freelance, Venta

    private BigDecimal cantidad;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaIngreso;

    @Convert(converter = YearMonthAttributeConverter.class)
    private YearMonth mesContabilizacion;

    private String descripcion;

    //codigo para tener multiUsuarios asociados a cada ingreso
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore // Evita que el usuario se serialice en el JSON de salida
    private User user;

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

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }
}