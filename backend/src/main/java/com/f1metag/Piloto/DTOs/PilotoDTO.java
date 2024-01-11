package com.f1metag.Piloto.DTOs;

import com.f1metag.Equipo.DTOs.EquipoDTO;
import lombok.Data;

@Data
public class PilotoDTO {
    private long id;
    private String nombre;
    private String apellidos;
    private String siglas;
    private Integer dorsal;
    private String foto;
    private String twitter;
    private String pais;
    private Boolean activo;
    private EquipoDTO equipo;
}
