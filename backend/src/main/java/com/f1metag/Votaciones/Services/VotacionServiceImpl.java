package com.f1metag.Votaciones.Services;

import com.f1metag.Common.Requests.VotacionRequest;
import com.f1metag.Common.Requests.VotoRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Piloto.Models.Piloto;
import com.f1metag.Votaciones.Models.Opcion;
import com.f1metag.Votaciones.Models.Votacion;
import com.f1metag.Votaciones.Models.Voto;
import com.f1metag.Votaciones.Repository.OpcionRepository;
import com.f1metag.Votaciones.Repository.VotacionRepository;
import com.f1metag.Votaciones.Repository.VotoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

@Service
public class VotacionServiceImpl implements VotacionService{

    private final VotacionRepository votacionRepository;
    private final VotoRepository votoRepository;
    private final OpcionRepository opcionRepository;

    public VotacionServiceImpl(VotacionRepository votacionRepository, VotoRepository votoRepository, OpcionRepository opcionRepository) {
        super();
        this.votacionRepository = votacionRepository;
        this.votoRepository = votoRepository;
        this.opcionRepository = opcionRepository;
    }

    @Override
    public Page<Votacion> getAllVotaciones(Pageable pageable) {
        return votacionRepository.findAll(pageable);
    }

    @Override
    public Votacion getVotacionById(Long id) {
        return votacionRepository.findById(id).orElse(null);
    }

    @Override
    public ApiResponse votar(VotoRequest votoRequest) {

        Votacion votacion = votacionRepository.findById(votoRequest.getVotacionId()).orElse(null);
        Opcion opcion = votacion.getOpciones().stream().filter(o -> o.getId() == (votoRequest.getOpcionId())).findFirst().orElse(null);

       if (votacion == null) {
            return ApiResponse.errorRequest("Votacion no encontrada").getBody();
        }

        if (opcion == null) {
            return ApiResponse.errorRequest("Opcion no encontrada").getBody();
        }

         if (votoRepository.findByEmailAndVotacionId(votoRequest.getEmail(), votoRequest.getVotacionId()).isPresent()) {
            return ApiResponse.errorRequest("Ya has votado en esta votacion").getBody();
        }

        Voto voto = Voto.builder()
                .votacion(votacion)
                .nombrePublico(votoRequest.getNombre())
                .email(votoRequest.getEmail())
                .opcion(opcion).
                        build();
        votoRepository.save(voto);
        return ApiResponse.successRequest("Voto realizado correctamente", voto).getBody();
    }

    @Override
    public ApiResponse createVotacion(VotacionRequest votacionRequest) {

        if (votacionRequest.getIdPilotos().size() < 2) {
            return ApiResponse.errorRequest("Debes seleccionar al menos 2 pilotos").getBody();
        }

        if (votacionRequest.getTitulo().isEmpty()) {
            return ApiResponse.errorRequest("El titulo no puede estar vacio").getBody();
        }

        if (votacionRequest.getDescripcion().isEmpty()) {
            return ApiResponse.errorRequest("La descripcion no puede estar vacia").getBody();
        }

        if (votacionRequest.getLimite().isEmpty()) {
            return ApiResponse.errorRequest("El limite no puede estar vacio").getBody();
        }

        if (parseDateToInstant(votacionRequest.getLimite()).isBefore(Instant.now())) {
            return ApiResponse.errorRequest("La fecha limite no puede ser anterior a la fecha actual").getBody();
        }

        try {
            Votacion votacion = Votacion.builder()
                    .titulo(votacionRequest.getTitulo())
                    .descripcion(votacionRequest.getDescripcion())
                    .limite(parseDateToInstant(votacionRequest.getLimite()))
                    .build();

            votacionRepository.save(votacion);

            for (Long idPiloto : votacionRequest.getIdPilotos()) {
                Piloto piloto = Piloto.builder().id(idPiloto).build();
                Opcion opcion = Opcion.builder()
                        .votacion(votacion)
                        .piloto(piloto)
                        .build();
                opcionRepository.save(opcion);
            }

            votacionRepository.save(votacion);

            return ApiResponse.successRequest("Votacion creada correctamente", votacion).getBody();

        } catch (Exception e) {
            return ApiResponse.errorRequest(e.getMessage()).getBody();
        }
    }

    @Override
    public ApiResponse updateVotacion(VotacionRequest votacionRequest) {

        if (votacionRequest.getIdPilotos().size() < 2) {
            return ApiResponse.errorRequest("Debes seleccionar al menos 2 pilotos").getBody();
        }

        if (votacionRequest.getTitulo().isEmpty()) {
            return ApiResponse.errorRequest("El titulo no puede estar vacio").getBody();
        }

        if (votacionRequest.getDescripcion().isEmpty()) {
            return ApiResponse.errorRequest("La descripcion no puede estar vacia").getBody();
        }

        if (votacionRequest.getLimite().isEmpty()) {
            return ApiResponse.errorRequest("El limite no puede estar vacio").getBody();
        }

        if (parseDateToInstant(votacionRequest.getLimite()).isBefore(Instant.now())) {
            return ApiResponse.errorRequest("La fecha limite no puede ser anterior a la fecha actual").getBody();
        }

        try {
            Votacion votacion = votacionRepository.findById(votacionRequest.getId()).orElse(null);

            if (votacion == null) {
                return ApiResponse.errorRequest("Votacion no encontrada").getBody();
            }

            votacion.setTitulo(votacionRequest.getTitulo());
            votacion.setDescripcion(votacionRequest.getDescripcion());
            votacion.setLimite(parseDateToInstant(votacionRequest.getLimite()));

            votacionRepository.save(votacion);


            for (Opcion opcion : votacion.getOpciones()) {
                opcionRepository.delete(opcion);
            }

            for (Long idPiloto : votacionRequest.getIdPilotos()) {
                Piloto piloto = Piloto.builder().id(idPiloto).build();
                Opcion opcion = Opcion.builder()
                        .votacion(votacion)
                        .piloto(piloto)
                        .build();
                opcionRepository.save(opcion);
            }

            votacionRepository.save(votacion);

            return ApiResponse.successRequest("Votacion actualizada correctamente", votacion).getBody();

        } catch (Exception e) {
            return ApiResponse.errorRequest(e.getMessage()).getBody();
        }
    }

    private static Instant parseDateToInstant(String dateString) {
        LocalDate date = LocalDate.parse(dateString);

        Instant instant = date.atStartOfDay(ZoneId.of("UTC")).toInstant();

        return instant;
    }





}
