package com.f1metag.Pais.Models;

import java.util.ArrayList;
import java.util.List;

public class PaisList {
    public static class Country {
        private String id;
        private String nombre;

        public Country(String id, String nombre) {
            this.id = id;
            this.nombre = nombre;
        }

        public String getId() {
            return this.id;
        }

        public String getNombre() {
            return this.nombre;
        }
    }

    public static List<Country> getPaisList(){
        List<Country> paises = new ArrayList<>();
        for (Pais pais : Pais.values()) {
            paises.add(new Country(pais.name(), pais.getCode()));
        }
        return paises;
    }
}
