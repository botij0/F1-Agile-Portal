package com.f1metag.Common.Requests;

import com.f1metag.Equipo.Models.Equipo;
import com.f1metag.Pais.Models.Pais;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CocheRequest {
    String nombre;
    Integer codigo;
    Float ers_curva_lenta;
    Float ers_curva_media;
    Float ers_curva_rapida;
    Integer consumo;
    Long equipo_id;
}
