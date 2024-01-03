package com.f1metag.Piloto.Services;

import com.f1metag.Common.Requests.PilotoRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Equipo.Repository.EquipoRepository;
import com.f1metag.Piloto.Models.Piloto;
import com.f1metag.Piloto.Repositories.PilotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PilotoServiceImpl implements PilotoService {

    private final PilotoRepository pilotoRepository;
    private final EquipoRepository equipoRepository;

    @Autowired
    public PilotoServiceImpl(PilotoRepository pilotoRepository, EquipoRepository equipoRepository) {
        this.pilotoRepository = pilotoRepository;
        this.equipoRepository = equipoRepository;
    }

    @Override
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

    @Override
    public ApiResponse getPilotos() {
        return ApiResponse.successRequest("Pilotos obtenidos correctamente", pilotoRepository.findAll()).getBody();
    }

    @Override
    public ApiResponse getPiloto(Long id) {
        if(pilotoRepository.findById(id).isEmpty()) {
            return ApiResponse.errorRequest("El piloto no existe.").getBody();
        }
        return ApiResponse.successRequest("Piloto obtenido correctamente", pilotoRepository.findById(id).get()).getBody();
    }

    @Override
    public ApiResponse updatePiloto(PilotoRequest pilotoRequest) {
        if(pilotoRepository.findById(pilotoRequest.getId()).isEmpty()) {
            return ApiResponse.errorRequest("El piloto no existe.").getBody();
        }

        if(equipoRepository.findById(pilotoRequest.getEquipo_id()).isEmpty()) {
            return ApiResponse.errorRequest("El equipo no existe.").getBody();
        }

        Piloto piloto = Piloto.builder()
                .id(pilotoRequest.getId())
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

        return ApiResponse.successRequest("Piloto actualizado correctamente", piloto).getBody();
    }

    @Override
    public ApiResponse deletePiloto(Long id) {
        if(pilotoRepository.findById(id).isEmpty()) {
            return ApiResponse.errorRequest("El piloto no existe.").getBody();
        }

        pilotoRepository.deleteById(id);

        return ApiResponse.successRequest("Piloto eliminado correctamente", null).getBody();
    }

    @Override
    public List<Piloto> getPilotosWithoutEquipo() {
        return pilotoRepository.findAll();
    }

}
