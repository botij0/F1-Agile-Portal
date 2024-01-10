package com.f1metag.Piloto.Controllers;


import com.f1metag.Common.Requests.PilotoRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Piloto.DTOs.PilotoDTO;
import com.f1metag.Piloto.Models.Piloto;
import com.f1metag.Piloto.Services.PilotoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/pilotos")
public class PilotoController {


    @Autowired
    private ModelMapper modelMapper;

    private PilotoService pilotoService;

    private PilotoDTO convertToDto(Piloto piloto) {
        PilotoDTO pilotoDTO = modelMapper.map(piloto, PilotoDTO.class);
        return pilotoDTO;
    }
    public PilotoController(PilotoService pilotoService) {
        super();
        this.pilotoService = pilotoService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getPilotos() {
        try {
            return ResponseEntity.ok(pilotoService.getPilotos());
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }
    @GetMapping("/data")
    public List<PilotoDTO> getPilotosData() {
        try {
          return pilotoService.getPilotosWithoutEquipo().stream().map(this::convertToDto).toList();
        } catch (IllegalArgumentException e) {
            return null;
        }
    }


    @PostMapping
    public ResponseEntity<ApiResponse> guardarPiloto(@RequestBody PilotoRequest pilotoRequest) {
         try {
             if(pilotoRequest.getId() == 0)
                    return ResponseEntity.ok(pilotoService.createPiloto(pilotoRequest));
             else
                    return ResponseEntity.ok(pilotoService.updatePiloto(pilotoRequest));
         } catch (IllegalArgumentException e) {
             return ApiResponse.badRequest();
         }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getPiloto(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(pilotoService.getPiloto(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deletePiloto(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(pilotoService.deletePiloto(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updatePiloto(@RequestBody PilotoRequest pilotoRequest,
                                                    @PathVariable("id") Long id)
    {
        try{
            return ResponseEntity.ok(pilotoService.updatePiloto(pilotoRequest,id));
        }catch (IllegalArgumentException e){
            return ApiResponse.badRequest();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deletePiloto(@PathVariable("id") Long id){
        try {
            return ResponseEntity.ok(pilotoService.deletePiloto(id));

        }catch (IllegalArgumentException e){
            return ApiResponse.badRequest();
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getPilotoById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(pilotoService.getPilotoById(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.badRequest();
        }
    }
}
