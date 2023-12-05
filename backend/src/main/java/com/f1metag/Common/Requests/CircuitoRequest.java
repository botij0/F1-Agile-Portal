package com.f1metag.Common.Requests;

import com.f1metag.Pais.Models.Pais;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CircuitoRequest {
    String nombre;
    String ciudad;
    Pais pais;
    String trazado;
    Integer numero_vueltas;
    Integer longitud;
    Integer curvasLentas;
    Integer curvasMedias;
    Integer curvasRapidas;
    String granPremio;


}
