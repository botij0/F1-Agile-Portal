package com.f1metag.Votaciones.DTOs;

import com.f1metag.Votaciones.Models.Opcion;
import lombok.Data;

import java.util.List;

@Data
public class VotacionDTO {
    private long id;
    private String titulo;
    private String descripcion;
    private String limite;
    private List<OpcionDTO> opciones;
    private long totalVotos;
}
