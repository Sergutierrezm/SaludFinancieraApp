package com.saludfinanciera.app.service;

import com.saludfinanciera.app.dto.BalanceDTO;
import com.saludfinanciera.app.repository.GastoRepository;
import com.saludfinanciera.app.repository.GastoFijoRepository;
import com.saludfinanciera.app.repository.IngresoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.YearMonth;

@Service
public class BalanceService {

    private final IngresoRepository ingresoRepository;
    private final GastoRepository gastoRepository;
    private final GastoFijoRepository gastoFijoRepository;

    public BalanceService(IngresoRepository ingresoRepository,
                          GastoRepository gastoRepository,
                          GastoFijoRepository gastoFijoRepository) {

        this.ingresoRepository = ingresoRepository;
        this.gastoRepository = gastoRepository;
        this.gastoFijoRepository = gastoFijoRepository;
    }

    public BalanceDTO calcularBalance(YearMonth mes) {

        BigDecimal ingresos = ingresoRepository.findByMesContabilizacion(mes)
                .stream()
                .map(i -> i.getCantidad())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal gastos = gastoRepository.findByMesContabilizacion(mes)
                .stream()
                .map(g -> g.getCantidad())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal gastosFijos = gastoFijoRepository.findByMesContabilizacion(mes)
                .stream()
                .map(g -> g.getCantidad())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal balance = ingresos.subtract(gastos).subtract(gastosFijos);

        return new BalanceDTO(ingresos, gastos, gastosFijos, balance);
    }
}