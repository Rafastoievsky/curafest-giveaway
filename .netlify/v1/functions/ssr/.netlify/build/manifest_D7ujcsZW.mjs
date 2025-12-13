import { B as NOOP_MIDDLEWARE_HEADER, C as decodeKey } from './chunks/astro/server_CZsDV2v1.mjs';
import './chunks/lexer_DdaWLgl_.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/luisarce/Desktop/ALN/sistemas/landings/curafest/","cacheDir":"file:///Users/luisarce/Desktop/ALN/sistemas/landings/curafest/node_modules/.astro/","outDir":"file:///Users/luisarce/Desktop/ALN/sistemas/landings/curafest/dist/","srcDir":"file:///Users/luisarce/Desktop/ALN/sistemas/landings/curafest/src/","publicDir":"file:///Users/luisarce/Desktop/ALN/sistemas/landings/curafest/public/","buildClientDir":"file:///Users/luisarce/Desktop/ALN/sistemas/landings/curafest/dist/","buildServerDir":"file:///Users/luisarce/Desktop/ALN/sistemas/landings/curafest/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.16.5_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_actions/[...path]","pattern":"^\\/_actions(?:\\/(.*?))?\\/?$","segments":[[{"content":"_actions","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/.pnpm/astro@5.16.5_typescript@5.9.3/node_modules/astro/dist/actions/runtime/route.js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/aviso-privacidad.BPHW43oz.css"}],"routeData":{"route":"/aviso-privacidad","isIndex":false,"type":"page","pattern":"^\\/aviso-privacidad\\/?$","segments":[[{"content":"aviso-privacidad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/aviso-privacidad.astro","pathname":"/aviso-privacidad","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/aviso-privacidad.BPHW43oz.css"}],"routeData":{"route":"/registro-listo","isIndex":false,"type":"page","pattern":"^\\/registro-listo\\/?$","segments":[[{"content":"registro-listo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/registro-listo.astro","pathname":"/registro-listo","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/FormZone.KOmfmGu7.css"},{"type":"external","src":"/_astro/aviso-privacidad.BPHW43oz.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/luisarce/Desktop/ALN/sistemas/landings/curafest/src/schemas/index.ts",{"propagation":"in-tree","containsHead":false}],["/Users/luisarce/Desktop/ALN/sistemas/landings/curafest/src/actions/toBackend.ts",{"propagation":"in-tree","containsHead":false}],["/Users/luisarce/Desktop/ALN/sistemas/landings/curafest/src/actions/index.ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:actions/entrypoint",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/luisarce/Desktop/ALN/sistemas/landings/curafest/src/pages/aviso-privacidad.astro",{"propagation":"none","containsHead":true}],["/Users/luisarce/Desktop/ALN/sistemas/landings/curafest/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/luisarce/Desktop/ALN/sistemas/landings/curafest/src/pages/registro-listo.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/entrypoint":"entrypoint.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.16.5_typescript@5.9.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.16.5_typescript@5.9.3/node_modules/astro/dist/actions/runtime/route@_@js":"pages/_actions/_---path_.astro.mjs","\u0000@astro-page:src/pages/aviso-privacidad@_@astro":"pages/aviso-privacidad.astro.mjs","\u0000@astro-page:src/pages/registro-listo@_@astro":"pages/registro-listo.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_D7ujcsZW.mjs","/Users/luisarce/Desktop/ALN/sistemas/landings/curafest/node_modules/.pnpm/node-fetch-native@1.6.7/node_modules/node-fetch-native/dist/chunks/multipart-parser.mjs":"chunks/multipart-parser_bs5Uv02a.mjs","/Users/luisarce/Desktop/ALN/sistemas/landings/curafest/src/components/curafest/formItems/AgreeSubmit":"_astro/AgreeSubmit.DlFY39oy.js","@astrojs/react/client.js":"_astro/client.9unXo8s5.js","/Users/luisarce/Desktop/ALN/sistemas/landings/curafest/src/components/curafest/FormZone.astro?astro&type=script&index=0&lang.ts":"_astro/FormZone.astro_astro_type_script_index_0_lang.6h9Ub0ZJ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/aln.CTOZHoq1.png","/_astro/gyCuraFest.CuqJqeYA.png","/_astro/alnSloganBco.DDqNSUuo.png","/_astro/alnLogoBco.BMCbR8Fu.png","/_astro/alnSlogan.CxU0Fos5.svg","/_astro/alnLogo.a-vZQh2D.svg","/_astro/aviso-privacidad.BPHW43oz.css","/favicon.svg","/_astro/AgreeSubmit.DlFY39oy.js","/_astro/FormZone.KOmfmGu7.css","/_astro/FormZone.astro_astro_type_script_index_0_lang.6h9Ub0ZJ.js","/_astro/client.9unXo8s5.js","/_astro/index.WFquGv8Z.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"xbBOddEaWrUL9tdvpPF6lIX2D+sjRYU4WTg4eXIs+08=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_BRglg9MK.mjs').then(n => n.n);

export { manifest };
