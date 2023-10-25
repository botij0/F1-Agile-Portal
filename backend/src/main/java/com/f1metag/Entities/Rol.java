package com.f1metag.Entities;


import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "roles")
public class Rol {
    @Id
    private int id;
    @Column(name = "nombre")
    private String nombre;

    @OneToMany(mappedBy = "rol")
    private Set<Usuario> usuarios;


    public Rol() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return "Rol{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                '}';
    }
}
