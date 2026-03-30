:

💰 Salud Financiera - AI Personal Assistant
Salud Financiera es una plataforma Full-Stack de gestión económica personal que utiliza Inteligencia Artificial local para analizar la salud financiera del usuario.

La aplicación permite registrar ingresos y gastos, diferenciando entre fijos y variables, y genera informes detallados mediante el modelo Llama 3.2. Todo el procesamiento de datos se realiza de forma privada y segura en tu propia infraestructura.

🚀 Arquitectura del Proyecto
El sistema está diseñado bajo una arquitectura de microservicios orquestados por Docker:

Frontend: Angular 17+ (Componentes Standalone).

Backend: Spring Boot 3.4 + Java 21 + Spring AI.

Base de Datos: PostgreSQL 15.

IA Engine: Ollama (Modelo Llama 3.2).

🚀 Despliegue

1. Clonar y Entrar
2. git clone <URL_TU_REPOSITORIO>
cd SaludFinancieraApp

3. Levantar el Entorno
Docker se encargará de compilar el Backend (Spring Boot) y el Frontend (Angular) automáticamente:
docker-compose up --build -d
4. Activar la IA
Para que el botón de Análisis IA funcione, descarga el modelo dentro del contenedor:
docker exec -it ollama-service ollama pull llama3.2


🧠 Capacidades de la IA Local
Gracias a la integración con Spring AI y Ollama, el sistema ofrece:

Análisis de Tasa de Ahorro: Cálculo preciso de la capacidad de ahorro mensual.

Categorización Inteligente: Clasificación automática de comercios y tipos de gasto.

Diagnóstico Senior: Recomendaciones personalizadas basadas en el excedente de capital.

Privacidad Total: Tus datos financieros nunca salen de tu red local ni se envían a APIs externas.


🛠️ Tecnologías y HerramientasComponenteTecnologíaLenguaje BackendJava 21Framework WebSpring Boot 3.4SeguridadSpring Security (JWT/Session)Framework FrontendAngular 17Lenguaje FrontendTypeScriptContenedoresDocker & Docker ComposeLLMLlama 3.2 (via Ollama)📁 Estructura del RepositorioPlaintext.
├── backend/             # Código fuente de la API REST y lógica de IA
├── frontend/            # Aplicación Angular y estilos CSS
├── docker-compose.yml   # Orquestación de servicios
├── .gitignore           # Archivos excluidos de Git
└── README.md            # Documentación del proyecto


✍️ Autor
Sergio Gutiérrez Moreno
Proyecto: Salud Financiera App

