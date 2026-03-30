# ETAPA 1: LA COCINA (Compilación)
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
# Copiamos el código fuente al contenedor
COPY . .
# Cocinamos el archivo .jar (esto instala las dependencias dentro del contenedor)
RUN mvn clean package -DskipTests

# ETAPA 2: EL PLATO SERVIDO (Ejecución)
FROM eclipse-temurin:21-jre
WORKDIR /app
# Solo nos traemos el resultado final de la etapa anterior
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]