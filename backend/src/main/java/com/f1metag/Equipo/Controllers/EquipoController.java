package com.f1metag.Equipo.Controllers;

import com.f1metag.Common.Requests.EquipoRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Equipo.Services.EquipoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/equipos")
public class EquipoController {
    @Autowired
    EquipoService equipoService;

    @GetMapping
    public ResponseEntity<ApiResponse> getEquipos() {
       try {
           return ResponseEntity.ok(equipoService.getEquipos());
       } catch (IllegalArgumentException e) {
           return ApiResponse.badRequest();
       }
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createEquipo(@RequestBody EquipoRequest equipoRequest) {
        try {
            return ResponseEntity.ok(equipoService.createEquipo(equipoRequest));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getEquipo(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(equipoService.getEquipo(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

}