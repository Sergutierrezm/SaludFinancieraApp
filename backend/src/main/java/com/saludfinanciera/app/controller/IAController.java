package com.saludfinanciera.app.controller;

import com.saludfinanciera.app.dto.GastoDTO;
import com.saludfinanciera.app.entity.Gasto;
import com.saludfinanciera.app.entity.GastoFijo;
import com.saludfinanciera.app.entity.Ingreso;
import com.saludfinanciera.app.entity.User;
import com.saludfinanciera.app.repository.*; // Importamos todos los repositorios
import com.saludfinanciera.app.service.AIService;
import com.saludfinanciera.app.service.GastoService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/ia")
@CrossOrigin(origins = "http://localhost:4200")
public class IAController {

    private final AIService aiService;
    private final GastoService gastoService;
    private final GastoRepository gastoRepository;
    private final IngresoRepository ingresoRepository;
    private final GastoFijoRepository gastoFijoRepository;
    private final UserRepository userRepository; // 1. Añadimos el repositorio de usuarios

    public IAController(AIService aiService, GastoService gastoService,
                        GastoRepository gastoRepository, IngresoRepository ingresoRepository,
                        GastoFijoRepository gastoFijoRepository,
                        UserRepository userRepository) { // 2. Lo inyectamos en el constructor
        this.aiService = aiService;
        this.gastoService = gastoService;
        this.gastoRepository = gastoRepository;
        this.ingresoRepository = ingresoRepository;
        this.gastoFijoRepository = gastoFijoRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/consejo-mensual")
    public String obtenerConsejoDelMes() {
        YearMonth mesActual = YearMonth.now();
        List<GastoDTO> gastos = gastoService.obtenerPorMes(mesActual);

        if (gastos.isEmpty()) {
            return "No hay gastos registrados este mes. ¡Buen trabajo manteniendo el control!";
        }
        return aiService.obtenerConsejoFinanciero(gastos);
    }

    @GetMapping("/analisis-completo/{mesStr}")
    public String obtenerAnalisisDetallado(@PathVariable String mesStr, Authentication auth) {
        // 3. CAMBIO CLAVE: Obtenemos el nombre y buscamos en nuestra DB
        String username = auth.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado en la base de datos"));

        YearMonth mes = YearMonth.parse(mesStr);

        // 4. Ahora 'user' es de tipo com.saludfinanciera.app.entity.User, así que esto funcionará:
        List<Gasto> gastos = gastoRepository.findByUserAndMesContabilizacion(user, mes);
        List<Ingreso> ingresos = ingresoRepository.findByUserAndMesContabilizacion(user, mes);
        List<GastoFijo> fijos = gastoFijoRepository.findByUser(user);

        if (ingresos.isEmpty() && gastos.isEmpty()) {
            return "No hemos encontrado ingresos ni gastos para " + mesStr + ". ¡Introduce algunos datos para empezar!";
        }

        return aiService.generarAnalisisMensualCompleto(mesStr, gastos, ingresos, fijos);
    }
}