package com.f1metag.Calendario.Controllers;

import com.f1metag.Calendario.Model.ElementoCalendario;
import com.f1metag.Calendario.Services.CalendarioService;
import com.f1metag.Carrera.Models.Carrera;
import com.f1metag.Circuitos.Models.Circuito;
import com.f1metag.Circuitos.Repositories.CircuitoRepository;
import com.f1metag.Noticias.Services.NoticiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/calendario")
public class CalendarioController
{
    @Autowired
    CalendarioService calendarioService;

    @GetMapping()
    public ArrayList<ElementoCalendario> getCalendario()
    {
        ArrayList<Carrera> carreras=calendarioService.getCarreras();
        ArrayList<ElementoCalendario>calendario = new ArrayList<>();

        DateTimeFormatter diaFormatter = DateTimeFormatter.ofPattern("dd");
//        SimpleDateFormat sdfMes = new SimpleDateFormat("MMMM", new Locale("es", "ES"));
        DateTimeFormatter mesFormatter = DateTimeFormatter.ofPattern("MMMM");

        for (int i=0; i<carreras.size(); i=i+3)
        {

            if (carreras.get(i).getFecha().getMonth() == carreras.get(i+2).getFecha().getMonth())
            {
                String mes = carreras.get(i).getFecha().format(mesFormatter).toUpperCase();
                String fechaFormateada =carreras.get(i).getFecha().format(diaFormatter)+"-"+carreras.get(i+2).getFecha().format(diaFormatter)+" "+mes;
                Optional<Circuito> circuito = calendarioService.getCircuito(carreras.get(i).getCircuito().getId());
                calendario.add(new ElementoCalendario(fechaFormateada,circuito.get().getPaisNombre(), circuito.get().getCiudad()));
            }
            else
            {
                String mes1 = carreras.get(i).getFecha().format(mesFormatter).toUpperCase();
                String mes2 = carreras.get(i+2).getFecha().format(mesFormatter).toUpperCase();
                String fechaFormateada =carreras.get(i).getFecha().format(diaFormatter)+" "+mes1+" - "+carreras.get(i+2).getFecha().format(diaFormatter)+" "+mes2;
                Optional<Circuito> circuito = calendarioService.getCircuito(carreras.get(i).getCircuito().getId());
                calendario.add(new ElementoCalendario(fechaFormateada,circuito.get().getPaisNombre(), circuito.get().getCiudad()));
            }
        }

        return calendario;
    }

}
