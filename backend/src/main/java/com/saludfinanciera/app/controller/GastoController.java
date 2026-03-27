package com.saludfinanciera.app.controller;

import com.saludfinanciera.app.dto.GastoDTO;
import com.saludfinanciera.app.service.GastoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/gastos")
public class GastoController {

    private final GastoService gastoService;

    public GastoController(GastoService gastoService) {
        this.gastoService = gastoService;
    }

    @GetMapping
    public List<GastoDTO> obtenerTodos() {
        return gastoService.obtenerTodos();
    }

    @GetMapping("/mes")
    public List<GastoDTO> obtenerPorMes(@RequestParam int year, @RequestParam int month) {
        YearMonth mes = YearMonth.of(year, month);
        return gastoService.obtenerPorMes(mes);
    }

    @PostMapping
    public GastoDTO crear(@RequestBody GastoDTO dto) {
        return gastoService.crear(dto);
    }

    @PutMapping("/{id}")
    public GastoDTO actualizar(@PathVariable Long id, @RequestBody GastoDTO dto) {
        return gastoService.actualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void borrar(@PathVariable Long id) {
        gastoService.borrarPorId(id);
    }
}