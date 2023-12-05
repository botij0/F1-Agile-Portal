package com.f1metag.Circuitos.Services;

import com.f1metag.Circuitos.Models.Circuito;
import com.f1metag.Circuitos.Repositories.CircuitoRepository;
import com.f1metag.Common.Requests.CircuitoRequest;
import com.f1metag.Common.Responses.ApiResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
public class CircuitoService {
    @Autowired
    CircuitoRepository circuitoRepository;



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
                .granPremio(circuitoRequest.getGranPremio())
                .build();

        circuitoRepository.save(circuito);

        return ApiResponse.successRequest("Circuito creado correctamente", circuitoRepository.save(circuito)).getBody();
    }

    public ApiResponse getCircuito(Long id) {
        Optional<Circuito> circuito = circuitoRepository.findById(id);
        if (circuito.isEmpty()) {
            return ApiResponse.errorRequest("Circuito no encontrado").getBody();
        }
        return ApiResponse.successRequest("Circuito obtenido correctamente", circuitoRepository.findById(id)).getBody();
    }

    public ApiResponse updateCircuito(Long id, CircuitoRequest circuitoRequest) {
        Optional<Circuito> circuito = circuitoRepository.findById(id);
        if (circuito.isEmpty()) {
            return ApiResponse.errorRequest("Circuito no encontrado").getBody();
        }
        circuito.get().setNombre(circuitoRequest.getNombre());
        circuito.get().setCiudad(circuitoRequest.getCiudad());
        circuito.get().setPais(circuitoRequest.getPais());
        circuito.get().setTrazado(circuitoRequest.getTrazado());
        circuito.get().setNumeroVueltas(circuitoRequest.getNumero_vueltas());
        circuito.get().setLongitud(circuitoRequest.getLongitud());
        circuito.get().setCurvasLentas(circuitoRequest.getCurvasLentas());
        circuito.get().setCurvasMedias(circuitoRequest.getCurvasMedias());
        circuito.get().setCurvasRapidas(circuitoRequest.getCurvasRapidas());
        circuito.get().setGranPremio(circuitoRequest.getGranPremio());

        circuitoRepository.save(circuito.get());

        return ApiResponse.successRequest("Circuito actualizado correctamente", circuitoRepository.save(circuito.get())).getBody();
    }

    public ApiResponse deleteCircuito(Long id) {
        Optional<Circuito> circuito = circuitoRepository.findById(id);
        if (circuito.isEmpty()) {
            return ApiResponse.errorRequest("Circuito no encontrado").getBody();
        }
//        Check if circuito has any carreras associated
        if (circuito.get().getCarreras().size() > 0) {
            return ApiResponse.errorRequest("Circuito no puede ser eliminado porque tiene carreras asociadas").getBody();
        }
        circuitoRepository.delete(circuito.get());
        return ApiResponse.successRequest("Circuito eliminado correctamente", null).getBody();
    }
}
