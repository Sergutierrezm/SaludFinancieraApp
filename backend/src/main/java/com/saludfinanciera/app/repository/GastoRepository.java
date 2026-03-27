package com.saludfinanciera.app.repository;
import com.saludfinanciera.app.entity.Gasto;
import com.saludfinanciera.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.YearMonth;
import java.util.List;

@Repository
public interface GastoRepository extends JpaRepository<Gasto, Long> {

    // 1. Listar todos los gastos de un usuario concreto
    List<Gasto> findByUser(User user);

    // 2. Filtrar gastos por mes pero solo del usuario que ha hecho login
    List<Gasto> findByUserAndMesContabilizacion(User user, YearMonth mes);

    // Mantenemos este por si acaso, pero recuerda que no filtra por usuario
    List<Gasto> findByMesContabilizacion(YearMonth mes);
}
