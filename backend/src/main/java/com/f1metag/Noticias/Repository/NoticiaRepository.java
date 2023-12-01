package com.f1metag.Noticias.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.f1metag.Noticias.Models.Noticia;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.Optional;

import java.util.Optional;

@Repository
public interface NoticiaRepository extends JpaRepository<Noticia, Long>
{
    @Query(value = "SELECT * FROM noticias order by id desc LIMIT 3", nativeQuery = true)
    ArrayList<Noticia> getUltimasNoticias();

    Page<Noticia> findAll(Pageable pageable);

    /*@Query(value = "SELECT * FROM noticias order by id desc LIMIT 9", nativeQuery = true)
    ArrayList<Noticia> getNoticiasPrincipales();*/

    Noticia findByTituloContainingIgnoreCase(String titulo);
    Noticia findNoticiaById(Integer id);
}
