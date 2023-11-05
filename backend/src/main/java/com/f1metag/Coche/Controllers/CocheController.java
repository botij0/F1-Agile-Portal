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

@RestController
@RequestMapping("/api/v1/coches")
@RequiredArgsConstructor

public class CocheController {
    @Autowired
    CocheService cocheService;

    @GetMapping
    public ArrayList<Coche> getCoches() {
        return cocheService.getAllCoches();
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createCoche(@RequestBody CocheRequest cocheRequest) {

        try {
            return ResponseEntity.ok(cocheService.createCoche(cocheRequest));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCoche(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(cocheService.getCoche(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }
}
