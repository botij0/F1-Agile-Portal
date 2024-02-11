package com.f1metag.Calendario.Model;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ElementoCalendario
{
    String fechas;
    String pais;
    String ciudad;
    Long idCircuito;

    public String getFechas() {
        return fechas;
    }

    public void setFechas(String fechas) {
        this.fechas = fechas;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public Long getIdCircuito()
    {
        return idCircuito;
    }

    public void setIdCircuito(Long idCircuito)
    {
        this.idCircuito = idCircuito;
    }
}
