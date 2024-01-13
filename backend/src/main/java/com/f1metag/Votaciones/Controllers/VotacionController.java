package com.f1metag.Votaciones.Controllers;

import com.f1metag.Common.Requests.VotacionRequest;
import com.f1metag.Common.Requests.VotoRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Votaciones.DTOs.VotacionDTO;
import com.f1metag.Votaciones.Models.Votacion;
import com.f1metag.Votaciones.Services.VotacionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;


@CrossOrigin
@RestController
@RequestMapping("/api/v1/votaciones")
public class VotacionController
{
    @Autowired
    private ModelMapper modelMapper;

    private VotacionService votacionService;
    private VotacionDTO convertToDto(Votacion votacion) {
        VotacionDTO votacionDTO = modelMapper.map(votacion, VotacionDTO.class);
        return votacionDTO;
    }
    public VotacionController(VotacionService votacionService) {
        super();
        this.votacionService = votacionService;
    }

    @GetMapping
    public Page<VotacionDTO> getAllVotaciones(@RequestParam Optional<Integer> page,
                                              @RequestParam Optional<String> sortBy) {
        return votacionService.getAllVotaciones(
                PageRequest.of(
                        page.orElse(0),
                        10,
                        Sort.Direction.ASC, sortBy.orElse("id")
                )
        ).map(this::convertToDto);
    }

    @GetMapping("/{id}")
    public VotacionDTO getVotacionById(@PathVariable Long id) {
        return convertToDto(votacionService.getVotacionById(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createVotacion(@RequestBody VotacionRequest votacionRequest) {
        try {
            if (votacionRequest.getId() == 0) {
                return ResponseEntity.ok(votacionService.createVotacion(votacionRequest));
            }
            else {
                return ResponseEntity.ok(votacionService.updateVotacion(votacionRequest));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.errorRequest(e.getMessage()).getBody());
        }
    }

    @PostMapping("/votar")
    public ResponseEntity<ApiResponse> votar(@RequestBody VotoRequest votoRequest) {

       try {
           return ResponseEntity.ok(votacionService.votar(votoRequest));
       } catch (Exception e) {
           return ResponseEntity.badRequest().body(ApiResponse.errorRequest(e.getMessage()).getBody());
       }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> eliminarVotacion(@PathVariable Long id){
        try {
            return ResponseEntity.ok(votacionService.deleteVotacion(id));

        }catch (IllegalArgumentException e){
            return ApiResponse.badRequest();
        }
    }



}
