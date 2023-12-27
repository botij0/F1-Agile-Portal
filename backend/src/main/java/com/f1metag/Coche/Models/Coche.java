package com.f1metag.Coche.Models;

import com.f1metag.Equipo.Models.Equipo;
import com.f1metag.Piloto.Models.Piloto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "coches")
public class Coche {

    @Id
    @GeneratedValue
     Long id;
     @Column(nullable = false)
     String nombre;
     @Column(nullable = false)
     Integer codigo;
     String imagen;
     @Column( name = "ers_curva_lenta")
     Float ERSCurvaLenta;
     @Column( name = "ers_curva_media")
     Float ERSCurvaMedia;
        @Column( name = "ers_curva_rapida")
     Float ERSCurvaRapida;
     Integer Consumo;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "equipo_id", nullable = false)
    @JsonIgnoreProperties({"coches", "pilotos"})
    @OnDelete(action = OnDeleteAction.CASCADE)
    Equipo equipo;

}
