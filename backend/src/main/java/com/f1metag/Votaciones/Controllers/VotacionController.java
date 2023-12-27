package com.f1metag.Votaciones.Controllers;

import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Votaciones.Models.Votacion;
import com.f1metag.Votaciones.Services.VotacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/votaciones")
public class VotacionController
{
    @Autowired
    VotacionService votacionService;
    /*@GetMapping()
    public List<Votacion> getVotaciones() {
        return votacionService.getVotaciones();
    }*/
    @GetMapping()
    public Page<Votacion> getVotaciones(@RequestParam Optional<String> sortBy, @RequestParam Optional<Integer> page)
    {
        return votacionService.getVotaciones(PageRequest.of(page.orElse(0),10, Sort.Direction.DESC, sortBy.orElse("id")));

    }
}
