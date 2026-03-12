package com.saludfinanciera.app.dto;

import java.math.BigDecimal;

public class BalanceDTO {

    private BigDecimal ingresos;
    private BigDecimal gastos;
    private BigDecimal gastosFijos;
    private BigDecimal balance;

    public BalanceDTO(BigDecimal ingresos, BigDecimal gastos, BigDecimal gastosFijos, BigDecimal balance) {
        this.ingresos = ingresos;
        this.gastos = gastos;
        this.gastosFijos = gastosFijos;
        this.balance = balance;
    }

    public BigDecimal getIngresos() { return ingresos; }
    public BigDecimal getGastos() { return gastos; }
    public BigDecimal getGastosFijos() { return gastosFijos; }
    public BigDecimal getBalance() { return balance; }
}