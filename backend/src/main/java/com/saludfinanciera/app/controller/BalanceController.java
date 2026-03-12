package com.saludfinanciera.app.controller;

import com.saludfinanciera.app.dto.BalanceDTO;
import com.saludfinanciera.app.service.BalanceService;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;

@RestController
@RequestMapping("/balance")
public class BalanceController {

    private final BalanceService balanceService;

    public BalanceController(BalanceService balanceService) {
        this.balanceService = balanceService;
    }

    @GetMapping
    public BalanceDTO obtenerBalance(@RequestParam int year, @RequestParam int month) {

        YearMonth mes = YearMonth.of(year, month);

        return balanceService.calcularBalance(mes);
    }
}