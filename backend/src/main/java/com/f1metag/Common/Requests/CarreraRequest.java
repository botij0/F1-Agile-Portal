package com.f1metag.Common.Requests;

import com.f1metag.Circuitos.Models.Circuito;
import com.f1metag.Pais.Models.Pais;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CarreraRequest {
    LocalDate fecha;
    Long circuitoId;

    public Circuito getCircuito() {
        Optional<Circuito> circuito = Optional.ofNullable(Circuito.builder()
                .id(circuitoId)
                .build());

        return circuito.orElse(null);
    }
}
