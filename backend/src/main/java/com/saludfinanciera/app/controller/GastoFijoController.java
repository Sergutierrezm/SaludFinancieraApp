package com.saludfinanciera.app.controller;

import com.saludfinanciera.app.dto.GastoFijoDTO;
import com.saludfinanciera.app.service.GastoFijoService;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/gastosfijos")
public class GastoFijoController {

    private final GastoFijoService service;

    public GastoFijoController(GastoFijoService service) {
        this.service = service;
    }

    @GetMapping
    public List<GastoFijoDTO> obtenerTodos() {
        return service.obtenerTodos();
    }

    @GetMapping("/mes")
    public List<GastoFijoDTO> obtenerPorMes(@RequestParam int year, @RequestParam int month) {
        YearMonth mes = YearMonth.of(year, month);
        return service.obtenerPorMes(mes);
    }

    @PostMapping
    public GastoFijoDTO crear(@RequestBody GastoFijoDTO dto) {
        return service.crear(dto);
    }

    @PutMapping("/{id}")
    public GastoFijoDTO actualizar(@PathVariable Long id, @RequestBody GastoFijoDTO dto) {
        return service.actualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void borrar(@PathVariable Long id) {
        service.borrarPorId(id);
    }
}