package com.f1metag.Carrera.Services;

import com.f1metag.Carrera.Models.Carrera;
import com.f1metag.Carrera.Repositories.CarreraRepository;
import com.f1metag.Circuitos.Models.Circuito;
import com.f1metag.Circuitos.Repositories.CircuitoRepository;
import com.f1metag.Common.Requests.CarreraRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Equipo.Repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Service
public class CarreraService {
    @Autowired
    CarreraRepository carreraRepository;

    @Autowired
    CircuitoRepository circuitoRepository;


    public ApiResponse getCarreras() {
        return ApiResponse.successRequest("Carreras obtenidos correctamente", carreraRepository.findAll()).getBody();
    }

    public ApiResponse createCarrera(CarreraRequest carreraRequest) {
        Carrera carrera = Carrera.builder()
                .fecha(carreraRequest.getFecha())
                .circuito(carreraRequest.getCircuito())
                .build();

        carreraRepository.save(carrera);

        return ApiResponse.successRequest("Carrera creado correctamente", carreraRepository.save(carrera)).getBody();
    }


    public ApiResponse getCarrerasByCircuito(Long id) {
        Optional<Circuito> circuito = circuitoRepository.findById(id);
        if (circuito.isEmpty()) {
            return ApiResponse.errorRequest("Circuito no encontrado").getBody();
        }
        return ApiResponse.successRequest("Carreras obtenidas correctamente", carreraRepository.findByCircuito(circuito.get())).getBody();
    }

    public ApiResponse deleteCarrera(Long id) {
        Optional<Carrera> carrera = carreraRepository.findById(id);
        if (carrera.isEmpty()) {
            return ApiResponse.errorRequest("Carrera no encontrada").getBody();
        }
        carreraRepository.delete(carrera.get());
        return ApiResponse.successRequest("Carrera eliminada correctamente", carreraRepository.findAll()).getBody();
    }

    public ApiResponse createCarreras(List<LocalDate> fechas, Long id) {
        Optional<Circuito> circuito = circuitoRepository.findById(id);
        if (circuito.isEmpty()) {
            return ApiResponse.errorRequest("Circuito no encontrado").getBody();
        }
        for (LocalDate fecha : fechas) {
            Carrera carrera = Carrera.builder()
                    .fecha(fecha)
                    .circuito(circuito.get())
                    .build();
            carreraRepository.save(carrera);
        }

        return ApiResponse.successRequest("Carreras creadas correctamente", carreraRepository.findAll()).getBody();
    }
}
