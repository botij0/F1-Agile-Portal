import { z } from "zod";

const circuitoSchema = z.object({
    nombre: z.string().min(3).max(50),
    pais: z.string().min(1).max(50),
    paisNombre: z.string().min(1).max(50).optional(),
    ciudad: z.string().min(3).max(50),
    numeroVueltas: z.string().min(1).max(50),
    longitud: z.string().min(1).max(50),
    curvasLentas: z.string().min(1).max(50),
    curvasMedias: z.string().min(1).max(50),
    curvasRapidas: z.string().min(1).max(50),
    granPremio: z.string().min(3).max(50),
    trazado: z.any().optional(),
    temporadas: z.any().optional(),
    carreras: z.any().optional(),
    temporadasInterv: z.any().optional(),
});

export default circuitoSchema;
