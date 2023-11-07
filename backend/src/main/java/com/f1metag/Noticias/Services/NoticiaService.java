package com.f1metag.Noticias.Services;


import com.f1metag.Noticias.Models.Noticia;
import com.f1metag.Noticias.Repository.NoticiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class NoticiaService {
    @Autowired
    NoticiaRepository noticiaRepository;

    public ArrayList<Noticia> getAllNoticias() {
        return (ArrayList<Noticia>) noticiaRepository.findAll();
    }
}
