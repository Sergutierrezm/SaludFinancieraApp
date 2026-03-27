package com.saludfinanciera.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.saludfinanciera.app.converter.YearMonthAttributeConverter;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;

@Entity
public class Gasto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaGasto; // Fecha real de la compra

    @Convert(converter = YearMonthAttributeConverter.class)
    private YearMonth mesContabilizacion; // Mes al que se asigna el gasto

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaRegistro; // Fecha en que se añade a la app

    private String comercio;

    private BigDecimal cantidad;

    private String descripcion; //


    //codigo para tener multiUsuarios asociados a cada gasto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private User user;


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

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }









}
