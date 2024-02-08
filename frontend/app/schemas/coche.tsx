import { z } from "zod";

const cocheSchema = z.object({
    nombre: z.string().min(3).max(50),
    codigo: z.string().min(1).max(50),
    erscurvaLenta: z.preprocess(
        (a) => parseFloat(z.string().parse(a)),
        z.number().min(0).max(0.06)
    ),
    erscurvaMedia: z.preprocess(
        (a) => parseFloat(z.string().parse(a)),
        z.number().min(0).max(0.06)
    ),
    erscurvaRapida: z.preprocess(
        (a) => parseFloat(z.string().parse(a)),
        z.number().min(0).max(0.06)
    ),
    consumo: z.preprocess(
        (a) => parseInt(z.string().parse(a)),
        z.number().min(1).max(100)
    ),
    equipo: z.string().min(1).max(50),
    imagen: z.any().optional(),
});

export default cocheSchema;
