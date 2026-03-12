package com.saludfinanciera.app.controller;

import com.saludfinanciera.app.dto.IngresoDTO;
import com.saludfinanciera.app.service.IngresoService;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/ingresos")
public class IngresoController {

    private final IngresoService service;

    public IngresoController(IngresoService service) {
        this.service = service;
    }

    @GetMapping
    public List<IngresoDTO> obtenerTodos() {
        return service.obtenerTodos();
    }

    @GetMapping("/mes")
    public List<IngresoDTO> obtenerPorMes(@RequestParam int year, @RequestParam int month) {
        YearMonth mes = YearMonth.of(year, month);
        return service.obtenerPorMes(mes);
    }

    @PostMapping
    public IngresoDTO crear(@RequestBody IngresoDTO dto) {
        return service.crear(dto);
    }

    @PutMapping("/{id}")
    public IngresoDTO actualizar(@PathVariable Long id, @RequestBody IngresoDTO dto) {
        return service.actualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void borrar(@PathVariable Long id) {
        service.borrarPorId(id);
    }
}