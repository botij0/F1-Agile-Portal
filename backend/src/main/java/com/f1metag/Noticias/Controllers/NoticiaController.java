package com.f1metag.Noticias.Controllers;


import com.f1metag.Noticias.Models.Noticia;
import com.f1metag.Noticias.Services.NoticiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(value = "http://localhost:3000/Noticias/Noticia")
@RestController
@RequestMapping("/api/v1/noticias")
public class NoticiaController {
    @Autowired
    NoticiaService noticiaService;

    @GetMapping
    public ArrayList<Noticia> getNoticias(){
        return noticiaService.getAllNoticias();
    }

    @GetMapping("/{id}")
    public Noticia getNoticiaById(@PathVariable("id") Long id){
        return noticiaService.getNoticiaById(id);
    }

}
