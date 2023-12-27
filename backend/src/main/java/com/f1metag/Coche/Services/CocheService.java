package com.f1metag.Coche.Services;

import com.f1metag.Coche.Models.Coche;
import com.f1metag.Coche.Repositories.CocheRepository;
import com.f1metag.Common.Requests.CocheRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Equipo.Models.Equipo;
import com.f1metag.Equipo.Repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CocheService {
    @Autowired
    CocheRepository cocheRepository;
    @Autowired
    EquipoRepository equipoRepository;

    public ApiResponse getAllCoches(){
        return ApiResponse.successRequest("Coches obtenidos correctamente", cocheRepository.findAll()).getBody();
    }

    public ApiResponse getCochesEquipo(Long id){
        if (!equipoRepository.existsById(id)) {
            return ApiResponse.errorRequest("Equipo no encontrado").getBody();
        }else{
            Equipo equipo = equipoRepository.findById(id).orElseThrow();
            return ApiResponse.successRequest("Equipo obtenido correctamente", cocheRepository.findCochesByEquipo(equipo)).getBody();
        }
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

    public ApiResponse updateCoche(Long id, CocheRequest cocheRequest) {

        Optional<Coche> cocheOp = cocheRepository.findById(id);
        if(cocheOp.isEmpty())
        {
            return ApiResponse.errorRequest("Coche no encontrado").getBody();
        }
        Coche coche = cocheOp.get();
        coche.setNombre(cocheRequest.getNombre());
        coche.setCodigo(cocheRequest.getCodigo());
        coche.setConsumo(cocheRequest.getConsumo());
        coche.setImagen(cocheRequest.getImagen());
        coche.setERSCurvaLenta(cocheRequest.getErs_curva_lenta());
        coche.setERSCurvaMedia(cocheRequest.getErs_curva_media());
        coche.setERSCurvaRapida(cocheRequest.getErs_curva_rapida());
        coche.setEquipo(equipoRepository.findById(cocheRequest.getEquipo_id()).get());

        cocheRepository.save(coche);

        return ApiResponse.successRequest("Coche actualizado correctamente", coche).getBody();
    }



    public ApiResponse getCoche(Long id) {
        if(cocheRepository.findById(id).isEmpty()) {
            return ApiResponse.errorRequest("El coche no existe.").getBody();
        }
        return ApiResponse.successRequest("Coche obtenido correctamente", cocheRepository.findById(id).get()).getBody();
    }

    public ApiResponse deleteCoche(Long id) {
        Optional<Coche> cocheOptional = cocheRepository.findById(id);
        if (cocheOptional.isEmpty()) {
            return ApiResponse.errorRequest("Coche no encontrado").getBody();
        }
        cocheRepository.delete(cocheOptional.get());
        return ApiResponse.successRequest("Coche eliminado correctamente", null).getBody();
    }
}
