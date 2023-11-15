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
public class NoticiaRequest {
    String titulo;
    String texto;
    String imagen;
}
