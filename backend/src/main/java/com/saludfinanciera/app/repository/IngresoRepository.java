package com.saludfinanciera.app.repository;

import com.saludfinanciera.app.entity.Ingreso;
import com.saludfinanciera.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.YearMonth;
import java.util.List;

@Repository
public interface IngresoRepository extends JpaRepository<Ingreso, Long> {

    // 1. Para listar TODO lo de un usuario
    List<Ingreso> findByUser(User user);

    // 2. Para filtrar por MES pero solo de un usuario concreto
    List<Ingreso> findByUserAndMesContabilizacion(User user, YearMonth mes);

    // Tu método antiguo (podemos mantenerlo, pero ya no lo usaremos para el frontend privado)
    List<Ingreso> findByMesContabilizacion(YearMonth mes);

}