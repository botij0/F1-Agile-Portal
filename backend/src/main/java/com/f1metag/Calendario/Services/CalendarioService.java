package com.f1metag.Calendario.Services;

import com.f1metag.Carrera.Models.Carrera;
import com.f1metag.Carrera.Repositories.CarreraRepository;
import com.f1metag.Circuitos.Models.Circuito;
import com.f1metag.Circuitos.Repositories.CircuitoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CalendarioService
{
    @Autowired
    CarreraRepository carreraRepository;
    @Autowired
    CircuitoRepository circuitoRepository;

    public ArrayList<Carrera> getCarreras()
    {
        return carreraRepository.getCarrerasOrdenadas();
    }

    public Optional<Circuito> getCircuito(Long idCircuito)
    {
        return circuitoRepository.findById(idCircuito);
    }
}
