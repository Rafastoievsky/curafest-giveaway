import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

const AgreeSubmit = () => {
  const [active, setActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onHandlerChange = () => {
    setActive(false);
  };

  useEffect(() => {
    const form = document.querySelector("form");
    if (!form) return;

    const handleSubmit = () => {
      setIsLoading(true);
    };

    const stopLoading = () => {
      setIsLoading(false);
    };

    form.addEventListener("submit", handleSubmit);
    window.addEventListener("stop-submit-loading", stopLoading);

    return () => {
      form.removeEventListener("submit", handleSubmit);
      window.removeEventListener("stop-submit-loading", stopLoading);
    };
  }, []);

  return (
    <div>
      {/* Checkbox */}
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
          y confirmo que soy mayor de edad y resido en el municipio de Hermosillo.
        </label>
      </div>

      {/* Botón */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={active || isLoading}
          className={`w-full font-black text-xl py-4 rounded-xl shadow-lg
            transition-all duration-300 flex items-center justify-center gap-3
            bg-ale-orange text-white
            hover:bg-orange-600 hover:-translate-y-1
            disabled:bg-gray-300 disabled:text-gray-500
            disabled:cursor-not-allowed disabled:shadow-none
          `}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Enviando…</span>
            </>
          ) : (
            "¡REGISTRARME AL SORTEO!"
          )}
        </button>
      </div>
    </div>
  );
};

export default AgreeSubmit;


