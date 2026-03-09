package com.saludfinanciera.app.repository;
import com.saludfinanciera.app.entity.Gasto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.YearMonth;
import java.util.List;

@Repository
public interface GastoRepository extends JpaRepository<Gasto, Long > {
    List<Gasto> findByMesContabilizacion(YearMonth mes);
}
