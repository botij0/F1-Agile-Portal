package com.f1metag.Noticias.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.f1metag.Noticias.Models.Noticia;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface NoticiaRepository extends JpaRepository<Noticia, Long>
{
    @Query(value = "SELECT * FROM noticias LIMIT 3", nativeQuery = true)
    ArrayList<Noticia> getUltimasNoticias();
    Noticia findByTituloContainingIgnoreCase(String titulo);

}
