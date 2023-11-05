package com.f1metag.Pais.Services;

import com.f1metag.Pais.Models.Pais;
import com.f1metag.Pais.Models.PaisList;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaisService {

    public List<PaisList.Country> getPaises() {
        return PaisList.getPaisList();
    }
}
