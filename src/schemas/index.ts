import { nullToEmptyString } from "@/helpers";
import { z } from "astro:content";


export const GiveawaysSchema = z.object({
  id: z.number(),
  giveaway_name: z.string(),
  nombre: z.string(),
  apaterno: z.string(),
  amaterno: z.string(),
  celular: z.string(),
  gy_celular: z.string(),
  gy_email: z.string(),
  email: z.string(),
  calle: z.string(),
  num_ext: z.string(),
  colonia: z.string(),
  poblacion: z.string().nullable(),
  comoseentero: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const CreateGiveawaySchema = z.object({
  giveaway_name: z.string(),
  nombre: z.preprocess(    
        nullToEmptyString, 
        z.string().min(1, {message: 'El Nombre no puede ir vacio'})
    ),
  apaterno: z.preprocess(    
        nullToEmptyString, 
        z.string().min(1, {message: 'El Apellido Paterno no puede ir vacio'})
    ),
  amaterno: z.preprocess(    
        nullToEmptyString, 
        z.string().min(1, {message: 'El Apellido Materno no puede ir vacio'})
    ),
  celular: z.preprocess(    
        nullToEmptyString, 
        z.string().min(10, {message: 'El Celular no puede ir vacio, no use simbolos o espacios'})
        .max(10, {message: 'El Celular no tener más de 10 numeros, no use simbolos o espacios'})
    ),
  email: z.preprocess(    
        nullToEmptyString, 
        z.string()
        .email({message: ' Formato de este campo debe ser de un Email'})
        .min(1, {message: 'El email no puede ir vacio'})
    ),
  calle: z.preprocess(    
        nullToEmptyString, 
        z.string().min(1, {message: 'El Campo Calle no puede ir vacio'})
    ),
  num_ext: z.preprocess(    
        nullToEmptyString, 
        z.string().min(1, {message: 'El Campo numero exterior no puede ir vacio'})
    ),
  colonia: z.preprocess(    
        nullToEmptyString, 
        z.string().min(1, {message: 'El Campo colonia no puede ir vacio'})
    ),
  poblacion: z.preprocess(    
        nullToEmptyString, 
        z.string().min(1, {message: 'El Campo Localidad no puede ir vacio'})
    ),
  comoseentero: z.preprocess(    
        nullToEmptyString, 
        z.string().min(1, {message: 'El Campo Como Se Enteró NO puede ir vacio'})
    ),
});

// Si quieres también el tipo inferido desde Zod:
export type TGiveaways = z.infer<typeof GiveawaysSchema>;
export type TCreateGiveaway = z.infer<typeof CreateGiveawaySchema>;