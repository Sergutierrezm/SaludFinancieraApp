package com.saludfinanciera.app.repository;

import com.saludfinanciera.app.entity.GastoFijo;
import com.saludfinanciera.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.YearMonth;
import java.util.List;

@Repository
public interface GastoFijoRepository extends JpaRepository<GastoFijo, Long> {

    // 1. Buscar todos los gastos fijos de un usuario concreto
    List<GastoFijo> findByUser(User user);

    // 2. Buscar por mes pero asegurando que pertenezcan al usuario
    List<GastoFijo> findByUserAndMesContabilizacion(User user, YearMonth mes);

    // Mantenemos este por compatibilidad, pero recuerda que NO filtra por usuario
    List<GastoFijo> findByMesContabilizacion(YearMonth mes);
}