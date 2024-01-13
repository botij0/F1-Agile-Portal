package com.f1metag.Votaciones.Services;

import com.f1metag.Common.Requests.VotacionRequest;
import com.f1metag.Common.Requests.VotoRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Noticias.Models.Noticia;
import com.f1metag.Votaciones.Models.Opcion;
import com.f1metag.Votaciones.Models.Votacion;
import com.f1metag.Votaciones.Models.Voto;
import com.f1metag.Votaciones.Repository.VotacionRepository;
import com.f1metag.Votaciones.Repository.VotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VotacionService
{
    Page<Votacion> getAllVotaciones(Pageable pageable);

    Votacion getVotacionById(Long id);

    ApiResponse getUltimasVotaciones();

    ApiResponse votar(VotoRequest votoRequest);

    ApiResponse createVotacion(VotacionRequest votacionRequest);

    ApiResponse updateVotacion(VotacionRequest votacionRequest);

    ApiResponse deleteVotacion(Long id);
}
