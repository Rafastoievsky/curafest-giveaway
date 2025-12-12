import { useState } from "react";
import type { ChangeEvent } from "react";

const AgreeSubmit = () => {
  const [active, setActive] = useState(true);

  const onHandlerChange = (e: ChangeEvent<HTMLInputElement>) => {

      setActive(!active);
    
  };

  return (
    <div>
      <div className="mt-6 flex items-start gap-3">
        <input
          type="checkbox"
          onChange={onHandlerChange}
          required
          id="legal"
          className="mt-1 w-5 h-5 text-ale-pink rounded focus:ring-ale-pink border-gray-300"
        />
        <label htmlFor="legal" className="text-sm text-gray-500 leading-snug">
          Acepto el{" "}
          <a
            href="/aviso-privacidad"
            target="_blank"
            className="text-ale-pink underline"
          >
            Aviso de Privacidad
          </a>{" "}
          y confirmo que soy mayor de edad y resido en el municipio de
          Hermosillo.
        </label>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={active}
          className={`w-full font-black text-xl py-4 rounded-xl shadow-lg
             transition-all duration-300
            
            /* Estilos normales (Activo) */
            bg-ale-orange text-white cursor-pointer 
            hover:bg-orange-600 hover:-translate-y-1
            
            /* Estilos cuando está disabled (Inactivo) */
            disabled:bg-gray-300 
            disabled:text-gray-500 
            disabled:cursor-not-allowed 
            disabled:shadow-none 
            disabled:hover:bg-gray-300 
            disabled:hover:transform-none
            `}
        >
          ¡REGISTRARME AL SORTEO!
        </button>
      </div>
    </div>
  );
};

export default AgreeSubmit;
