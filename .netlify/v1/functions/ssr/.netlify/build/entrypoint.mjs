import { o as objectType, d as dateType, a as arrayType, s as stringType, c as coerce, n as numberType, p as preprocessType } from './chunks/astro/server_CZsDV2v1.mjs';
import { g as getActionQueryString, a as astroCalledServerError, A as ActionError, d as deserializeActionResult, b as ACTION_QUERY_PARAMS, c as appendForwardSlash } from './chunks/lexer_DdaWLgl_.mjs';
import { d as defineAction } from './chunks/server_CSn6Xt9j.mjs';

function nullToEmptyString(arg) {
  return arg ?? "";
}

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
objectType({
  tags: arrayType(stringType()).optional(),
  lastModified: dateType().optional()
});

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = "";
createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = "";
createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {};

new Set(Object.keys(lookupMap));

const renderEntryGlob = "";
createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

objectType({
  id: numberType(),
  giveaway_name: stringType(),
  nombre: stringType(),
  apaterno: stringType(),
  amaterno: stringType(),
  celular: stringType(),
  gy_celular: stringType(),
  gy_email: stringType(),
  email: stringType(),
  calle: stringType(),
  num_ext: stringType(),
  colonia: stringType(),
  poblacion: stringType().nullable(),
  comoseentero: stringType().nullable(),
  created_at: coerce.date(),
  updated_at: coerce.date()
});
const CreateGiveawaySchema = objectType({
  giveaway_name: stringType(),
  nombre: preprocessType(
    nullToEmptyString,
    stringType().min(1, { message: "El Nombre no puede ir vacio" })
  ),
  apaterno: preprocessType(
    nullToEmptyString,
    stringType().min(1, { message: "El Apellido Paterno no puede ir vacio" })
  ),
  amaterno: preprocessType(
    nullToEmptyString,
    stringType().min(1, { message: "El Apellido Materno no puede ir vacio" })
  ),
  celular: preprocessType(
    nullToEmptyString,
    stringType().min(10, { message: "El Celular no puede ir vacio, no use simbolos o espacios" }).max(10, { message: "El Celular no tener más de 10 numeros, no use simbolos o espacios" })
  ),
  email: preprocessType(
    nullToEmptyString,
    stringType().email({ message: " Formato de este campo debe ser de un Email" }).min(1, { message: "El email no puede ir vacio" })
  ),
  calle: preprocessType(
    nullToEmptyString,
    stringType().min(1, { message: "El Campo Calle no puede ir vacio" })
  ),
  num_ext: preprocessType(
    nullToEmptyString,
    stringType().min(1, { message: "El Campo numero exterior no puede ir vacio" })
  ),
  colonia: preprocessType(
    nullToEmptyString,
    stringType().min(1, { message: "El Campo colonia no puede ir vacio" })
  ),
  poblacion: preprocessType(
    nullToEmptyString,
    stringType().min(1, { message: "El Campo Localidad no puede ir vacio" })
  ),
  comoseentero: preprocessType(
    nullToEmptyString,
    stringType().min(1, { message: "El Campo Como Se Enteró NO puede ir vacio" })
  )
});

const internalFetchHeaders = {};

const apiContextRoutesSymbol = Symbol.for("context.routes");
const ENCODED_DOT = "%2E";
function toActionProxy(actionCallback = {}, aggregatedPath = "") {
  return new Proxy(actionCallback, {
    get(target, objKey) {
      if (target.hasOwnProperty(objKey) || typeof objKey === "symbol") {
        return target[objKey];
      }
      const path = aggregatedPath + encodeURIComponent(objKey.toString()).replaceAll(".", ENCODED_DOT);
      function action(param) {
        return handleAction(param, path, this);
      }
      Object.assign(action, {
        queryString: getActionQueryString(path),
        toString: () => action.queryString,
        // redefine prototype methods as the object's own property, not the prototype's
        bind: action.bind,
        valueOf: () => action.valueOf,
        // Progressive enhancement info for React.
        $$FORM_ACTION: function() {
          const searchParams = new URLSearchParams(action.toString());
          return {
            method: "POST",
            // `name` creates a hidden input.
            // It's unused by Astro, but we can't turn this off.
            // At least use a name that won't conflict with a user's formData.
            name: "_astroAction",
            action: "?" + searchParams.toString()
          };
        },
        // Note: `orThrow` does not have progressive enhancement info.
        // If you want to throw exceptions,
        //  you must handle those exceptions with client JS.
        async orThrow(param) {
          const { data, error } = await handleAction(param, path, this);
          if (error) throw error;
          return data;
        }
      });
      return toActionProxy(action, path + ".");
    }
  });
}
function _getActionPath(toString) {
  let path = `${"/".replace(/\/$/, "")}/_actions/${new URLSearchParams(toString()).get(ACTION_QUERY_PARAMS.actionName)}`;
  {
    path = appendForwardSlash(path);
  }
  return path;
}
async function handleAction(param, path, context) {
  if (context) {
    const pipeline = Reflect.get(context, apiContextRoutesSymbol);
    if (!pipeline) {
      throw astroCalledServerError();
    }
    const action = await pipeline.getAction(path);
    if (!action) throw new Error(`Action not found: ${path}`);
    return action.bind(context)(param);
  }
  const headers = new Headers();
  headers.set("Accept", "application/json");
  for (const [key, value] of Object.entries(internalFetchHeaders)) {
    headers.set(key, value);
  }
  let body = param;
  if (!(body instanceof FormData)) {
    try {
      body = JSON.stringify(param);
    } catch (e) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: `Failed to serialize request body to JSON. Full error: ${e.message}`
      });
    }
    if (body) {
      headers.set("Content-Type", "application/json");
    } else {
      headers.set("Content-Length", "0");
    }
  }
  const rawResult = await fetch(
    _getActionPath(() => getActionQueryString(path)),
    {
      method: "POST",
      body,
      headers
    }
  );
  if (rawResult.status === 204) {
    return deserializeActionResult({ type: "empty", status: 204 });
  }
  const bodyText = await rawResult.text();
  if (rawResult.ok) {
    return deserializeActionResult({
      type: "data",
      body: bodyText,
      status: 200,
      contentType: "application/json+devalue"
    });
  }
  return deserializeActionResult({
    type: "error",
    body: bodyText,
    status: rawResult.status,
    contentType: "application/json"
  });
}
toActionProxy();

const toBackend = {
  createRegistro: defineAction({
    accept: "json",
    input: CreateGiveawaySchema,
    handler: async (input) => {
      const url = `${undefined                       }/giveaway`;
      const formData = new FormData();
      formData.append("giveaway_name", input.giveaway_name);
      formData.append("nombre", input.nombre.toLocaleUpperCase());
      formData.append("apaterno", input.apaterno.toLocaleUpperCase());
      formData.append("amaterno", input.amaterno.toLocaleUpperCase());
      formData.append("celular", input.celular);
      formData.append("gy_celular", input.giveaway_name + "-" + input.celular);
      formData.append("gy_email", input.giveaway_name + "-" + input.email);
      formData.append("email", input.email);
      formData.append("calle", input.calle.toLocaleUpperCase());
      formData.append("num_ext", input.num_ext);
      formData.append("colonia", input.colonia.toLocaleUpperCase());
      formData.append("poblacion", input.poblacion.toLocaleUpperCase());
      formData.append("comoseentero", input.comoseentero);
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json"
          },
          body: formData
        });
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
          message: "No se pudo registrar GiveAway. Por favor, intente más tarde."
        };
      }
    }
  })
};

const server = {
  toBackend
};

export { server };
