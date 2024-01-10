package com.f1metag.Votaciones.DTOs;

import com.f1metag.Piloto.DTOs.PilotoDTO;
import lombok.Data;

@Data
public class OpcionDTO {
    private long id;
    private long totalVotos;
    private PilotoDTO piloto;

}
