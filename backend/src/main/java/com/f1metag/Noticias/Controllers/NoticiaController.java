package com.f1metag.Noticias.Controllers;


import com.f1metag.Common.Requests.CocheRequest;
import com.f1metag.Common.Requests.NoticiaRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Noticias.Models.Noticia;
import com.f1metag.Noticias.Services.NoticiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.Optional;

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

    @GetMapping("/ultimas")
    public ArrayList<Noticia> getUltimasNoticias()
    {
        return noticiaService.getUltimasNoticias();
    }

    /*@GetMapping("/principales")
    public ArrayList<Noticia> getNoticiasPrincipales()
    {
        return noticiaService.getNoticiasPrincipales();
    }*/

    @DeleteMapping("/{id}")
    public boolean deleteNoticia(@PathVariable("id") Long id){
        return noticiaService.deleteNoticia(id);
    }

    @GetMapping("portal")
    public Page<Noticia> getNoticias(@RequestParam Optional<String> sortBy, @RequestParam Optional<Integer> page)
    {
        return noticiaService.getNoticias(PageRequest.of(page.orElse(0),10,Sort.Direction.DESC, sortBy.orElse("id")));

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
    @GetMapping("/{id}")
    public Noticia getNoticiaById(@PathVariable("id") Long id){
        return noticiaService.getNoticiaById(id);
    }

}
