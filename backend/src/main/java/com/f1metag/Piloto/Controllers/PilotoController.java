package com.f1metag.Piloto.Controllers;


import com.f1metag.Common.Requests.PilotoRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Piloto.Models.Piloto;
import com.f1metag.Piloto.Services.PilotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/pilotos")
public class PilotoController {
    @Autowired
    PilotoService pilotoService;

    @GetMapping
    public ResponseEntity<ApiResponse> getPilotos() {
        try {
            return ResponseEntity.ok(pilotoService.getPilotos());
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createPiloto(@RequestBody PilotoRequest pilotoRequest) {
        try {
            return ResponseEntity.ok(pilotoService.createPiloto(pilotoRequest));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

}
