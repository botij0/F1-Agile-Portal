package com.f1metag.Circuitos.Controllers;


import com.f1metag.Circuitos.Services.CircuitoService;
import com.f1metag.Common.Requests.CircuitoRequest;
import com.f1metag.Common.Responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCircuito(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(circuitoService.getCircuito(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateCircuito(@PathVariable("id") Long id, @RequestBody CircuitoRequest circuitoRequest) {
        try {
            return ResponseEntity.ok(circuitoService.updateCircuito(id, circuitoRequest));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCircuito(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(circuitoService.deleteCircuito(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

}
