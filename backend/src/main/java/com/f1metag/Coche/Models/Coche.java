package com.f1metag.Coche.Models;

import com.f1metag.Equipo.Models.Equipo;
import com.f1metag.Piloto.Models.Piloto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
     @Column( name = "ers_curva_lenta")
     Float ERSCurvaLenta;
     @Column( name = "ers_curva_media")
     Float ERSCurvaMedia;
        @Column( name = "ers_curva_rapida")
     Float ERSCurvaRapida;
     Integer Consumo;
     @Enumerated(EnumType.STRING)

        @ManyToOne
        @JoinColumn(name = "equipo_id")
             @JsonBackReference
        Equipo equipo;

     @OneToOne(mappedBy = "coche")
     Piloto piloto;

}
