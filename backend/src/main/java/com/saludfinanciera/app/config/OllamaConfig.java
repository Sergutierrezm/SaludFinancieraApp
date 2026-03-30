package com.saludfinanciera.app.config;

import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaApi;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OllamaConfig {

    @Bean
    public OllamaChatModel ollamaChatModel() {
        // Conectamos con tu Ollama local en el puerto 11434
        OllamaApi ollamaApi = new OllamaApi("http://localhost:11434");

        // Configuramos las opciones apuntando exactamente a tu modelo 'llama3.2:3b'
        return new OllamaChatModel(ollamaApi, OllamaOptions.create()
                .withModel("llama3.2:3b")
                .withTemperature(0.7f));
    }
}