import { v4 as uuid } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://pxfvrkflonlookyusxtb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZnZya2Zsb25sb29reXVzeHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwODYyNTUsImV4cCI6MjAxMzY2MjI1NX0.I3v1fYevo3rzWOT8KvkIVDrZ0LbyvABN6YaynXIYE4I"
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