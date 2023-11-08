package com.f1metag.Circuitos.Services;

import com.f1metag.Circuitos.Models.Circuito;
import com.f1metag.Circuitos.Repositories.CircuitoRepository;
import com.f1metag.Common.Requests.CircuitoRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Equipo.Models.Equipo;
import com.f1metag.Equipo.Repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class CircuitoService {
    @Autowired
    CircuitoRepository circuitoRepository;

    @Autowired
    EquipoRepository equipoRepository;

    public ApiResponse getCircuitos() {
        return ApiResponse.successRequest("Circuitos obtenidos correctamente", circuitoRepository.findAll()).getBody();
    }

    public ApiResponse createCircuito(CircuitoRequest circuitoRequest) {
        Circuito circuito = Circuito.builder()
                .nombre(circuitoRequest.getNombre())
                .ciudad(circuitoRequest.getCiudad())
                .pais(circuitoRequest.getPais())
                .trazado(circuitoRequest.getTrazado())
                .numeroVueltas(circuitoRequest.getNumero_vueltas())
                .longitud(circuitoRequest.getLongitud())
                .curvasLentas(circuitoRequest.getCurvasLentas())
                .curvasMedias(circuitoRequest.getCurvasMedias())
                .curvasRapidas(circuitoRequest.getCurvasRapidas())
                .equipos(null)
                .fecha(circuitoRequest.getFecha())
                .build();

        circuitoRepository.save(circuito);

        return ApiResponse.successRequest("Circuito creado correctamente", circuitoRepository.save(circuito)).getBody();
    }

    @Transactional
    public ApiResponse addEquipo(Long id, Long equipoId) {
        Circuito circuito = circuitoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Circuito no encontrado"));

        Equipo equipo = equipoRepository.findById(equipoId).orElseThrow(() -> new IllegalArgumentException("Equipo no encontrado"));

        circuito.addNewEquipo(equipo);
        circuitoRepository.save(circuito);

        return ApiResponse.successRequest("Equipo añadido correctamente", circuitoRepository.save(circuito)).getBody();

    }

}
