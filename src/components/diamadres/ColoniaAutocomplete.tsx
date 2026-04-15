import React, { useEffect, useMemo, useRef, useState } from "react";

export type ColoniaItem = {
  id: string | number;
  nombre: string;
  poblacion?: string;
};

type Props = {
  colonias: ColoniaItem[];
  name?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  hiddenIdName?: string;
  noEncontradaName?: string;
  className?: string;
  initialValue?: string;
};

function normalizarTexto(texto: string): string {
  return texto
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\bCERO\b/g, "0")
    .replace(/\bUNO\b/g, "1")
    .replace(/\bDOS\b/g, "2")
    .replace(/\bTRES\b/g, "3")
    .replace(/\bCUATRO\b/g, "4")
    .replace(/\bCINCO\b/g, "5")
    .replace(/\bSEIS\b/g, "6")
    .replace(/\bSIETE\b/g, "7")
    .replace(/\bOCHO\b/g, "8")
    .replace(/\bNUEVE\b/g, "9")
    .replace(/\bDIEZ\b/g, "10")
    .replace(/\bCOLONIA\b/g, "")
    .replace(/\bCOL\b/g, "")
    .replace(/\bFRACCIONAMIENTO\b/g, "")
    .replace(/\bFRACC\b/g, "")
    .replace(/\bRESIDENCIAL\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreCoincidencia(query: string, nombre: string): number {
  const q = normalizarTexto(query);
  const n = normalizarTexto(nombre);

  if (!q) return 0;
  if (n === q) return 100;
  if (n.startsWith(q)) return 95;
  if (n.includes(q)) return 88;

  const tokens = q.split(" ").filter(Boolean);
  const encontrados = tokens.filter((t) => n.includes(t)).length;

  if (tokens.length > 0 && encontrados === tokens.length) {
    return 80 + Math.min(10, encontrados);
  }

  if (encontrados > 0) {
    return 60 + encontrados;
  }

  return 0;
}

export default function ColoniaAutocomplete({
  colonias,
  name = "colonia",
  id = "colonia",
  label = "Colonia",
  placeholder = "Ej. San Benito",
  hiddenIdName = "colonia_id",
  noEncontradaName = "colonia_no_encontrada",
  className = "md:col-span-2",
  initialValue = "",
}: Props) {
  const [query, setQuery] = useState(initialValue);
  const [selectedId, setSelectedId] = useState("");
  const [noEncontrada, setNoEncontrada] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [poblacionSeleccionada, setPoblacionSeleccionada] = useState("");

  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const selectPoblacion = document.querySelector(
      'select[name="poblacion"]'
    ) as HTMLSelectElement | null;

    if (!selectPoblacion) return;

    const updatePoblacion = () => {
      setPoblacionSeleccionada(selectPoblacion.value || "");
      setSelectedId("");
      setNoEncontrada(false);
      setQuery("");
    };

    setPoblacionSeleccionada(selectPoblacion.value || "");
    selectPoblacion.addEventListener("change", updatePoblacion);

    return () => {
      selectPoblacion.removeEventListener("change", updatePoblacion);
    };
  }, []);

  const coloniasFiltradasPorPoblacion = useMemo(() => {
    if (!poblacionSeleccionada) return colonias;

    const poblacionNorm = normalizarTexto(poblacionSeleccionada);

    return colonias.filter((item) => {
      const p = normalizarTexto(item.poblacion || "");
      return p === poblacionNorm;
    });
  }, [colonias, poblacionSeleccionada]);

  const resultados = useMemo(() => {
    const q = query.trim();
    if (!q) return [];

    return coloniasFiltradasPorPoblacion
      .map((item) => ({
        ...item,
        score: scoreCoincidencia(q, item.nombre),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.nombre.localeCompare(b.nombre, "es"))
      .slice(0, 8);
  }, [query, coloniasFiltradasPorPoblacion]);

  function seleccionar(item: ColoniaItem) {
    setQuery(item.nombre);
    setSelectedId(String(item.id));
    setNoEncontrada(false);
    setOpen(false);
    setHighlightedIndex(-1);
  }

  function marcarNoEncontrada() {
    setSelectedId("");
    setNoEncontrada(true);
    setOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current) return;
      const target = event.target as Node;
      if (!rootRef.current.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={rootRef} className={`${className} relative`}>
      <label
        htmlFor={id}
        className="block text-ale-purple font-bold mb-2 text-sm uppercase"
      >
        {label}
      </label>
        <p className="text-xs text-gray-500 mt-2">
            Escribe y selecciona tu colonia de la lista. Si no aparece, click en “No encuentro mi colonia”. Y Solo escribes tu colonia
        </p>

      <input type="hidden" name={hiddenIdName} value={selectedId} />
      <input type="hidden" name={noEncontradaName} value={noEncontrada ? "1" : "0"} />

      <input
        ref={inputRef}
        type="text"
        id={id}
        name={name}
        value={query}
        autoComplete="off"
        placeholder={placeholder}
        onFocus={() => {
          if (query.trim()) setOpen(true);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedId("");
          setNoEncontrada(false);
          setOpen(true);
          setHighlightedIndex(-1);
        }}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            setOpen(true);
            return;
          }

          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
              Math.min(prev + 1, resultados.length - 1)
            );
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          }

          if (e.key === "Enter" && open && highlightedIndex >= 0) {
            e.preventDefault();
            seleccionar(resultados[highlightedIndex]);
          }

          if (e.key === "Escape") {
            setOpen(false);
            setHighlightedIndex(-1);
          }
        }}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-ale-pink focus:ring-0 outline-none transition-colors bg-white"
      />

      {open && query.trim() && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-72 overflow-y-auto">
          {resultados.length > 0 ? (
            resultados.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => seleccionar(item)}
                className={`w-full text-left px-4 py-3 text-sm border-b last:border-b-0 border-gray-100 ${
                  index === highlightedIndex ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                {item.nombre}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No encontramos coincidencias.
            </div>
          )}
        </div>
      )}

      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-xs text-gray-500">
          {poblacionSeleccionada
            ? `Buscando en ${poblacionSeleccionada}.`
            : "Selecciona primero tu localidad para filtrar mejor."}
        </p>

        <button
          type="button"
          onClick={marcarNoEncontrada}
          className="text-sm text-ale-purple cursor-pointer underline hover:text-ale-pink shrink-0"
        >
          No encuentro mi colonia
        </button>
      </div>
    </div>
  );
}