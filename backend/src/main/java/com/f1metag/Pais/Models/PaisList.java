package com.f1metag.Pais.Models;

import java.util.ArrayList;
import java.util.List;

public class PaisList {
    public static class Country {
        private String code;
        private String name;

        public Country(String code, String name) {
            this.code = code;
            this.name = name;
        }

        public String getCode() {
            return this.code;
        }

        public String getName() {
            return this.name;
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
