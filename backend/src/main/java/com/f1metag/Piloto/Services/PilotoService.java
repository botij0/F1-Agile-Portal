package com.f1metag.Piloto.Services;

import com.f1metag.Common.Requests.PilotoRequest;
import com.f1metag.Common.Responses.ApiResponse;
import com.f1metag.Piloto.Models.Piloto;

import java.util.List;

public interface PilotoService {
    ApiResponse createPiloto(PilotoRequest pilotoRequest);
    ApiResponse getPilotos();
    ApiResponse getPiloto(Long id);
    ApiResponse updatePiloto(PilotoRequest pilotoRequest);
    ApiResponse deletePiloto(Long id);

    List<Piloto> getPilotosWithoutEquipo();
}
