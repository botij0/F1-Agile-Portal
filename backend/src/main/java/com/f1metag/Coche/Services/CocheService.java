package com.f1metag.Coche.Services;

import com.f1metag.Coche.Models.Coche;
import com.f1metag.Coche.Repositories.CocheRepository;
import com.f1metag.Common.Requests.CocheRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Equipo.Repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CocheService {
    @Autowired
    CocheRepository cocheRepository;
    @Autowired
    EquipoRepository equipoRepository;

    public ApiResponse getAllCoches(){
        return ApiResponse.successRequest("Coches obtenidos correctamente", cocheRepository.findAll()).getBody();
    }

    public ApiResponse createCoche(CocheRequest cocheRequest) {

        // Validate if the coche already exists
        if(cocheRepository.findByNombre(cocheRequest.getNombre()).isPresent()) {
            return ApiResponse.errorRequest("Ya existe un coche con ese nombre.").getBody();
        }

        // Validate if the equipo exists
        if(equipoRepository.findById(cocheRequest.getEquipo_id()).isEmpty()) {
            return ApiResponse.errorRequest("El equipo no existe.").getBody();
        }

           Coche coche = Coche.builder()
                   .nombre(cocheRequest.getNombre())
                   .codigo(cocheRequest.getCodigo())
                   .imagen(cocheRequest.getImagen())
                   .ERSCurvaLenta(cocheRequest.getErs_curva_lenta())
                   .ERSCurvaMedia(cocheRequest.getErs_curva_media())
                   .ERSCurvaRapida(cocheRequest.getErs_curva_rapida())
                   .Consumo(cocheRequest.getConsumo())
                   .equipo(equipoRepository.findById(cocheRequest.getEquipo_id()).get())
                   .build();
            cocheRepository.save(coche);
            return ApiResponse.successRequest("Coche creado correctamente", coche).getBody();
    }

    public ApiResponse getCoche(Long id) {
        if(cocheRepository.findById(id).isEmpty()) {
            return ApiResponse.errorRequest("El coche no existe.").getBody();
        }
        return ApiResponse.successRequest("Coche obtenido correctamente", cocheRepository.findById(id).get()).getBody();
    }
}
