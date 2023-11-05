package com.f1metag.Pais.Controllers;

import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Pais.Models.Pais;
import com.f1metag.Pais.Models.PaisList;
import com.f1metag.Pais.Services.PaisService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/paises")
@RequiredArgsConstructor
public class PaisController {
    @Autowired
    PaisService paisService;

    @GetMapping
   public ApiResponse getPaises(){
        return ApiResponse.successRequest("Paises obtenidos correctamente", paisService.getPaises()).getBody();
    }
}
