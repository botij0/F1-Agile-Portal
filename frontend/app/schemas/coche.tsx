import { z } from "zod";

const cocheSchema = z.object({
    nombre: z.string().min(3).max(50),
    codigo: z.string().min(1).max(50),
    imagen: z.any().optional(),
    erscurvaLenta: z.string().min(1).max(50),
    erscurvaMedia: z.string().min(1).max(50),
    erscurvaRapida: z.string().min(1).max(50),
    consumo: z.string().min(1).max(50),
    equipo: z.string(),
});

export default cocheSchema;
