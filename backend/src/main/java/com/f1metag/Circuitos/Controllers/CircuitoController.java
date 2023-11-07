package com.f1metag.Circuitos.Controllers;


import com.f1metag.Circuitos.Services.CircuitoService;
import com.f1metag.Common.Requests.CircuitoRequest;
import com.f1metag.Common.Responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin
@RestController
@RequestMapping("/api/v1/circuitos")
public class CircuitoController {
    @Autowired
    CircuitoService circuitoService;

    @GetMapping
    public ResponseEntity<ApiResponse> getCircuitos() {
        try {
            return ResponseEntity.ok(circuitoService.getCircuitos());
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createCircuito(@RequestBody CircuitoRequest circuitoRequest) {
        try {
            return ResponseEntity.ok(circuitoService.createCircuito(circuitoRequest));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @PutMapping("/agregarEquipo/{id}")
    public ResponseEntity<ApiResponse> addEquipo(@PathVariable Long id, @RequestBody Map<String, Long> request) {
        try {
            return ResponseEntity.ok(circuitoService.addEquipo(id, request.get("equipo")));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

}
