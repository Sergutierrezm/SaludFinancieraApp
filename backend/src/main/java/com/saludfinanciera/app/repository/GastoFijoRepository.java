package com.saludfinanciera.app.repository;

import com.saludfinanciera.app.entity.GastoFijo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.YearMonth;
import java.util.List;

@Repository
public interface GastoFijoRepository extends JpaRepository<GastoFijo, Long> {
    List<GastoFijo> findByMesContabilizacion(YearMonth mes);
}