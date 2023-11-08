package com.f1metag.Noticias.Controllers;


import com.f1metag.Noticias.Models.Noticia;
import com.f1metag.Noticias.Services.NoticiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@CrossOrigin(value = "http://localhost:3000/Noticias/Gestion")
@RestController
@RequestMapping("/api/v1/noticias")
public class NoticiaController {
    @Autowired
    NoticiaService noticiaService;

    @GetMapping
    public ArrayList<Noticia> getNoticias(){
        return noticiaService.getAllNoticias();
    }

    @GetMapping("/ultimas")
    public ArrayList<Noticia> getUltimasNoticias(){
        return noticiaService.getUltimasNoticias();
    }
}
