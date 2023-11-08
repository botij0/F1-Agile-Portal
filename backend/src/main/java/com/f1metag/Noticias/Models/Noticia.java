package com.f1metag.Noticias.Models;


import jakarta.persistence.Entity;
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
@Table(name="noticias")
public class Noticia {
    @Id
    @GeneratedValue
    long id;
    @Column(nullable = false)
    String permalink;
    @Column(nullable = false)
    String titulo;
    @Column(nullable = false)
    String texto;
    @Column(nullable = false)
    String imagen;
}
