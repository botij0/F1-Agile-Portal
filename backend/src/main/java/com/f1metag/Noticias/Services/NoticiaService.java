package com.f1metag.Noticias.Services;


import com.f1metag.Common.Requests.NoticiaRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Noticias.Models.Noticia;
import com.f1metag.Noticias.Repository.NoticiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class NoticiaService {
    @Autowired
    NoticiaRepository noticiaRepository;

    public ArrayList<Noticia> getAllNoticias() {
        return (ArrayList<Noticia>) noticiaRepository.findAll();
    }

    public ApiResponse createNoticia(NoticiaRequest noticiaRequest) {

        Noticia noticia = Noticia.builder()
                .titulo(noticiaRequest.getTitulo())
                .texto(noticiaRequest.getTexto())
                .imagen(noticiaRequest.getImagen())
                .permalink("")
                .build();
        noticiaRepository.save(noticia);
        noticiaRepository.flush();
        noticia.setPermalink("http://localhost:3000/Noticias/Noticia/" + noticia.getId());
        noticiaRepository.save(noticia);
        return ApiResponse.successRequest("Noticia creada correctamente", noticia).getBody();
    }
}
