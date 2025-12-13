import { CreateGiveawaySchema } from "@/schemas";
import { defineAction } from "astro:actions";


export const toBackend = {
    createRegistro: defineAction({
        accept:'json',
        input:CreateGiveawaySchema,
        handler: async (input)=>{
            const url = `${import.meta.env.API_URL}/giveaway`;
            const formData = new FormData();
            formData.append('giveaway_name', input.giveaway_name)
            formData.append('nombre', input.nombre.toLocaleUpperCase())
            formData.append('apaterno', input.apaterno.toLocaleUpperCase())
            formData.append('amaterno', input.amaterno.toLocaleUpperCase())
            formData.append('celular', input.celular)
            formData.append('gy_celular', input.giveaway_name +'-'+input.celular)
            formData.append('gy_email', input.giveaway_name +'-'+input.email)
            formData.append('email', input.email)
            formData.append('calle', input.calle.toLocaleUpperCase())
            formData.append('num_ext', input.num_ext)
            formData.append('colonia', input.colonia.toLocaleUpperCase())
            formData.append('poblacion', input.poblacion.toLocaleUpperCase())
            formData.append('comoseentero', input.comoseentero)


            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                    },
                    body: formData,                    
                })

                if (!res.ok) {
                    const errorData = await res.json().catch(() => null);
                    throw new Error(
                        errorData?.message || "Error al registrar GiveAway en el servidor"
                    );
                }


                const data = await res.json();
                return data;
            } catch (e) {
                console.error("Error al registrar GiveAway:", e);

                return {
                error: true,
                message:
                    "Error al registrar GiveAway:"+ e
                };
            }
                

        }
    })
}