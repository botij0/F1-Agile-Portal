package com.f1metag.Coche.Controllers;

import com.f1metag.Coche.Models.Coche;
import com.f1metag.Coche.Services.CocheService;
import com.f1metag.Common.Requests.CocheRequest;
import com.f1metag.Common.Responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/coches")
@RequiredArgsConstructor

public class CocheController {
    @Autowired
    CocheService cocheService;

    @GetMapping
    public ResponseEntity<ApiResponse> getCoches() {
        try {
            return ResponseEntity.ok(cocheService.getAllCoches());
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }
    @GetMapping("/equipo/{id}")
    public ResponseEntity<ApiResponse> getCochesEquipo(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(cocheService.getCochesEquipo(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createCoche(@RequestBody CocheRequest cocheRequest) {

        try {
            return ResponseEntity.ok(cocheService.createCoche(cocheRequest));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateCoche(@PathVariable("id") Long id, @RequestBody CocheRequest cocheRequest){
        try {
            return ResponseEntity.ok(cocheService.updateCoche(id,cocheRequest));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCoche(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(cocheService.getCoche(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCoche(@PathVariable("id") Long id){
        try {
            return ResponseEntity.ok(cocheService.deleteCoche(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }
}
