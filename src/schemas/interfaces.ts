export interface Giveaways {
    id:            number;
    giveaway_name: string;
    nombre:        string;
    apaterno:      string;
    amaterno:      string;
    celular:       string;
    gy_celular:    string;
    gy_email:      string;
    email:         string;
    calle:         string;
    num_ext:       string;
    colonia:       string;
    colonia_id:    string | null;
    colonia_no_encontrada: string | null;
    comoseentero:  string | null;
    created_at:    Date;
    updated_at:    Date;
}

export enum Comoseentero {
    AmigoAmiga = "amigo_amiga",
    Facebook = "facebook",
    Instagram = "instagram",
    PaginaWeb = "pagina_web",
    Youtube = "youtube",
}


