package com.f1metag.Common.Requests;

import com.f1metag.Piloto.Models.Piloto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VotacionRequest {
    Long id;
    List<Long> idPilotos;
    String titulo;
    String descripcion;
    String limite;
}
