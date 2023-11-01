package com.f1metag.Piloto.Services;

import com.f1metag.Common.Requests.PilotoRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Equipo.Repository.EquipoRepository;
import com.f1metag.Piloto.Models.Piloto;
import com.f1metag.Piloto.Repositories.PilotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PilotoService {
    @Autowired
    PilotoRepository pilotoRepository;

    @Autowired
    EquipoRepository equipoRepository;

    public ApiResponse createPiloto(PilotoRequest pilotoRequest) {

        if(equipoRepository.findById(pilotoRequest.getEquipo_id()).isEmpty()) {
            return ApiResponse.errorRequest("El equipo no existe.").getBody();
        }

        Piloto piloto = Piloto.builder()
                .nombre(pilotoRequest.getNombre())
                .apellidos(pilotoRequest.getApellidos())
                .siglas(pilotoRequest.getSiglas())
                .dorsal(pilotoRequest.getDorsal())
                .foto(pilotoRequest.getFoto())
                .twitter(pilotoRequest.getTwitter())
                .pais(pilotoRequest.getPais())
                .equipo(equipoRepository.findById(pilotoRequest.getEquipo_id()).get())
                .activo(true)
                .build();

        pilotoRepository.save(piloto);

        return ApiResponse.successRequest("Piloto creado correctamente", piloto).getBody();
    }

    public ApiResponse getPilotos() {
            return ApiResponse.successRequest("Pilotos obtenidos correctamente", pilotoRepository.findAll()).getBody();
    }
}
