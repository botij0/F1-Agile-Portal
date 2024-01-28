package com.f1metag.Equipo.Controllers;

import com.f1metag.Common.Requests.EquipoRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Equipo.Services.EquipoService;
import org.apache.coyote.Response;
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
    public ResponseEntity<ApiResponse> guardarEquipo(@RequestBody EquipoRequest equipoRequest) {
        try {
            if (equipoRequest.getId() == 0)
                return ResponseEntity.ok(equipoService.createEquipo(equipoRequest));
            else
                return ResponseEntity.ok(equipoService.updateEquipo(equipoRequest));
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

    @GetMapping("/me")
    public ResponseEntity<ApiResponse> getMiEquipo(){
        try{
            return ResponseEntity.ok(equipoService.getMiEquipo());
        }catch (IllegalArgumentException e){
            return ApiResponse.badRequest();
        }
    }

    @GetMapping("/miembros")
    public ResponseEntity<ApiResponse> getMiembrosEquipo(){
        try{
            return ResponseEntity.ok(equipoService.getMiembrosEquipo());
        }catch (IllegalArgumentException e){
            return ApiResponse.badRequest();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteEquipo(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(equipoService.deleteEquipo(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }
}
