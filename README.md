# 💰 Salud Financiera - AI Personal Assistant

Salud Financiera es una plataforma Full-Stack de gestión económica personal que utiliza Inteligencia Artificial local para analizar la salud financiera del usuario de forma totalmente privada.

La aplicación permite registrar ingresos y gastos (fijos y variables) y genera informes detallados mediante el modelo Llama 3.2. Al ejecutarse sobre Ollama, todo el procesamiento de datos se realiza en tu propia infraestructura, garantizando que tu información financiera nunca salga de tu red local.

## 🚀 Arquitectura del Proyecto

El sistema está diseñado bajo una arquitectura de microservicios orquestados por Docker:

* Frontend: Angular 17+ (Componentes Standalone).

* Backend: Spring Boot 3.4 + Java 21 + Spring AI.

* Base de Datos: PostgreSQL 15.

* IA Engine: Ollama (Modelo Llama 3.2).

## 🛠️ Despliegue Rápido

Sigue estos tres pasos para tener la aplicación funcionando en cualquier ordenador:

1. Clonar el repositorio

* git clone <URL_TU_REPOSITORIO>
 *cd SaludFinancieraApp


2. Levantar el entorno

Docker se encargará de compilar el Backend y el Frontend automáticamente:
* docker-compose up --build -d
3. Activar la IA
Para que el botón de Análisis IA funcione, debes descargar el modelo dentro del contenedor de Ollama:
* docker exec -it ollama-service ollama pull llama3.2


🧠 Capacidades de la IA Local

### Gracias a la integración con Spring AI y Ollama, el sistema ofrece:

* 📈 Análisis de Tasa de Ahorro: Cálculo preciso de la capacidad de ahorro mensual.

* 🏷️ Categorización Inteligente: Clasificación automática de comercios y tipos de gasto.

* 🎓 Diagnóstico Senior: Recomendaciones personalizadas basadas en el excedente de capital.

* 🛡️ Privacidad Total: Tus datos nunca se envían a APIs externas (como OpenAI).

##  🏗️ Tecnologías y Herramientas

* Componente

* Tecnología

* Lenguaje Backend

* Java 21

* Framework Web

* Spring Boot 3.4

* Seguridad

* Spring Security (JWT/Session)

* Framework Frontend

* Angular 17

* Lenguaje Frontend

* TypeScript

* Contenedores

* Docker & Docker Compose

* LLM

* Llama 3.2 (via Ollama)

## ✍️ Autor

* Sergio Gutiérrez Moreno

* Proyecto: Salud Financiera App

Estado: MVP Finalizado 🚀

