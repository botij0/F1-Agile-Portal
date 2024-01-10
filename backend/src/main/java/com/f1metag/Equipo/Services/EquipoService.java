package com.f1metag.Equipo.Services;

import com.f1metag.Coche.Repositories.CocheRepository;
import com.f1metag.Common.Requests.EquipoRequest;
import com.f1metag.Common.Requests.NoticiaRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Equipo.Models.Equipo;
import com.f1metag.Equipo.Repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipoService {
    @Autowired
    EquipoRepository equipoRepository;
    @Autowired
    private CocheRepository cocheRepository;


    public ApiResponse createEquipo(EquipoRequest equipoRequest) {
        Equipo equipo = Equipo.builder()
                .nombre(equipoRequest.getNombre())
                .logo(equipoRequest.getLogo())
                .twitter(equipoRequest.getTwitter())
                .build();

        equipoRepository.save(equipo);
        return ApiResponse.successRequest("Equipo creado correctamente", equipo).getBody();
    }

    public ApiResponse getEquipos() {
        return ApiResponse.successRequest("Equipos obtenidos correctamente", equipoRepository.findAll()).getBody();
    }

    public ApiResponse getEquipo(Long id) {
        if (!equipoRepository.existsById(id)) {
            return ApiResponse.errorRequest("Equipo no encontrado").getBody();
        }
        return ApiResponse.successRequest("Equipo obtenido correctamente", equipoRepository.findById(id)).getBody();
    }

    public ApiResponse updateEquipo(EquipoRequest equipoRequest){
        Equipo oldEquipo = equipoRepository.findById(equipoRequest.getId()).orElseThrow();
        oldEquipo.setNombre(equipoRequest.getNombre());
        oldEquipo.setTwitter(equipoRequest.getTwitter());
        oldEquipo.setLogo(equipoRequest.getLogo());
        equipoRepository.save(oldEquipo);

        return ApiResponse.successRequest("Equipo actualizado correctamente", oldEquipo).getBody();
    }

    public boolean deleteEquipo(Long id){
        equipoRepository.deleteById(id);
        return true;
    }
}
