package com.f1metag.Noticias.Controllers;


import com.f1metag.Common.Requests.CocheRequest;
import com.f1metag.Common.Requests.NoticiaRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Noticias.Models.Noticia;
import com.f1metag.Noticias.Services.NoticiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin
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
    public Noticia getNoticia(@PathVariable("id") Long id){
        return noticiaService.getNoticia(id);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> guardarNoticia(@RequestBody NoticiaRequest noticiaRequest) {

        try {
            if(noticiaRequest.getId() == 0)
                return ResponseEntity.ok(noticiaService.createNoticia(noticiaRequest));
            else
                return ResponseEntity.ok(noticiaService.updateNoticia(noticiaRequest));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }
}
