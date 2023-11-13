package com.f1metag.Noticias.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.f1metag.Noticias.Models.Noticia;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoticiaRepository extends JpaRepository<Noticia, Long> {
    Noticia findByTituloContainingIgnoreCase(String titulo);
    Noticia findNoticiaById(Integer id);
}
