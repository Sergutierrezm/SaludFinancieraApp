package com.saludfinanciera.app.service;

import com.saludfinanciera.app.dto.GastoDTO;
import com.saludfinanciera.app.entity.Gasto;
import com.saludfinanciera.app.entity.GastoFijo;
import com.saludfinanciera.app.entity.Ingreso;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AIService {

    private final OllamaChatModel chatModel;

    public AIService(OllamaChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String obtenerConsejoFinanciero(List<GastoDTO> gastos) {
        String username = obtenerUsuarioLogueado();
        String resumen = gastos.stream()
                .map(g -> "- " + g.getComercio() + ": " + g.getCantidad() + "€")
                .collect(Collectors.joining("\n"));

        String prompt = String.format("Asesor financiero para %s. Analiza estos gastos y da un consejo corto: %s", username, resumen);
        return chatModel.call(prompt);
    }

    public String generarAnalisisMensualCompleto(String mes, List<Gasto> gastos, List<Ingreso> ingresos, List<GastoFijo> fijos) {
        String username = obtenerUsuarioLogueado();

        // Cálculo seguro con BigDecimal para evitar errores de compilación
        BigDecimal totalIn = ingresos.stream().map(Ingreso::getCantidad).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalVar = gastos.stream().map(Gasto::getCantidad).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalFi = fijos.stream().map(GastoFijo::getCantidad).reduce(BigDecimal.ZERO, BigDecimal::add);

        double totalIngresos = totalIn.doubleValue();
        double totalVariables = totalVar.doubleValue();
        double totalFijos = totalFi.doubleValue();
        double balance = totalIngresos - (totalVariables + totalFijos);
        double ahorroPct = totalIngresos > 0 ? (balance / totalIngresos) * 100 : 0;

        String detalleVariables = gastos.stream()
                .map(g -> "- " + g.getComercio() + ": " + g.getCantidad() + "€")
                .collect(Collectors.joining("\n"));

        String prompt = String.format("""
    Eres un Consultor Financiero Senior. Analiza las cuentas de %s para el mes %s.
    
    DATOS REALES (No inventes otros):
    - Ingresos: %.2f€
    - Gastos Fijos: %.2f€
    - Gastos Variables (Ocio/Compras): %.2f€
    - DINERO RESTANTE (Balance): %.2f€
    - TASA DE AHORRO REAL: %.1f%%
    
    DETALLE DE TUS COMPRAS DE ESTE MES:
    %s
    
    INSTRUCCIONES CRÍTICAS:
    1. Si la Tasa de Ahorro es mayor al 50%%, ¡Felicítalo! No digas que gaste menos, dile que puede INVERTIR.
    2. REVISA EL DETALLE: Si ves "Mercadona", identifica que es alimentación.
    3. MATEMÁTICAS: No inventes porcentajes. Si gasta 50€ de 3000€, es un 1.6%%, no un 17%%. Sé preciso.
    4. Formato: Usa negritas, listas y emojis. 
    
    Responde directamente al análisis en español.
    """, username, mes, totalIngresos, totalFijos, totalVariables, balance, ahorroPct, detalleVariables);
        return chatModel.call(prompt);
    }

    private String obtenerUsuarioLogueado() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) return ((UserDetails) principal).getUsername();
        return principal.toString();
    }
}