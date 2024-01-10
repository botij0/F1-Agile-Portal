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

    @ManyToOne
    @JoinColumn(name = "opcion_id")
    @JsonBackReference
    private Opcion opcion;

    @ManyToOne
    @JoinColumn(name = "votacion_id")
    @JsonBackReference
    private Votacion votacion;



}
