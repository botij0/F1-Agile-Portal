package com.f1metag.Votaciones.Services;

import com.f1metag.Noticias.Models.Noticia;
import com.f1metag.Votaciones.Models.Votacion;
import com.f1metag.Votaciones.Repository.VotacionRepository;
import com.f1metag.Votaciones.Repository.VotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VotacionService
{
    @Autowired
    VotacionRepository votacionRepository;

    public Page<Votacion> getVotaciones(Pageable pageable)
    {
        return votacionRepository.findAll(pageable);
    }

}
