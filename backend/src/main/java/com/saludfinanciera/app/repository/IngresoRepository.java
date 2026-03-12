package com.saludfinanciera.app.repository;

import com.saludfinanciera.app.entity.Ingreso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.YearMonth;
import java.util.List;

@Repository
public interface IngresoRepository extends JpaRepository<Ingreso, Long> {

    List<Ingreso> findByMesContabilizacion(YearMonth mes);

}