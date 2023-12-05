package com.f1metag.Carrera.Controllers;


import com.f1metag.Carrera.Services.CarreraService;
import com.f1metag.Common.Requests.CarreraRequest;
import com.f1metag.Common.Responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/carreras")
public class CarreraController {
    @Autowired
    CarreraService carreraService;

    @GetMapping
    public ResponseEntity<ApiResponse> getCarreras() {
        try {
            return ResponseEntity.ok(carreraService.getCarreras());
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createCarrera(@RequestBody CarreraRequest carreraRequest) {
        try {
            return ResponseEntity.ok(carreraService.createCarrera(carreraRequest));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @PostMapping("/circuito/bulk/{id}")
    public ResponseEntity<ApiResponse> createCarreras(@PathVariable("id") Long id, @RequestBody List<LocalDate> fechas) {
        try {
            return ResponseEntity.ok(carreraService.createCarreras(fechas, id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }


    @GetMapping("/circuito/{id}")
    public ResponseEntity<ApiResponse> getCarrerasByCircuito(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(carreraService.getCarrerasByCircuito(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCarrera(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(carreraService.deleteCarrera(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }



}
