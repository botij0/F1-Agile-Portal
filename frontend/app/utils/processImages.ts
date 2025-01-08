import { v4 as uuid } from "uuid";
import { createClient } from "@supabase/supabase-js";
import Constantes from "../(utils)/constantes";

const supabase = createClient(
    Constantes.SUPABASE_URL_BASE,
    Constantes.SUPABASE_TOKEN
);

export async function uploadImage(img: any, imgPiloto: string) {
    let file = img;

    if (file == undefined) {
        return { path: imgPiloto };
    } else {
        const { data, error } = await supabase.storage
            .from("Images")
            .upload("" + uuid(), file);

        if (data) {
            return data;
        } else {
            return -1;
        }
    }
}
