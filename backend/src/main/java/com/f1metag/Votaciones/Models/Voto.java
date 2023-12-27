package com.f1metag.Votaciones.Models;


import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name="votos")
public class Voto
{
    @Id
    @GeneratedValue
    long id;

    @Column(name = "nombre_publico", nullable = false)
    private String nombrePublico;

    @Column(name = "email", nullable = false)
    private String email;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "votacion_id", nullable = false)
    @JsonBackReference
    private Votacion votacion;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "opcion_id", nullable = false)
    @JsonBackReference
    private Opcion opcion;

}
