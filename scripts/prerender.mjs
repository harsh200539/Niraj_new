import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const server = await createServer({server:{middlewareMode:true}, appType:'custom'});
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
try {
 const {default:App}=await server.ssrLoadModule('/src/App.jsx');
 const {getMetadata,publicPaths,otherPaths,origin}=await server.ssrLoadModule('/src/seo/metadata.js');
 const {practices}=await server.ssrLoadModule('/src/data/mockDb.js');
 const template=await readFile('dist/index.html','utf8');
 const manifest=JSON.parse(await readFile('dist/.vite/manifest.json','utf8'));
 for(const path of [...publicPaths,...otherPaths,'/404']) {
  const meta=getMetadata(path);
  let body=renderToString(createElement(App,{initialPath:path}));
  for(const [source,asset] of Object.entries(manifest)) body=body.replaceAll('/'+source,'/'+asset.file);
  const tags = [
   `<title>${escape(meta.title)}</title>`, `<meta name="description" content="${escape(meta.description)}">`,
   `<meta name="robots" content="${meta.noindex?'noindex, follow':'index, follow, max-image-preview:large'}">`, `<link rel="canonical" href="${meta.url}">`,
   ...Object.entries({'og:title':meta.title,'og:description':meta.description,'og:url':meta.url,'og:type':'website','og:site_name':'TNT & Associates','og:locale':'en_IN','og:image':origin+'/TNT.png','og:image:alt':'TNT & Associates logo'}).map(([key,value])=>`<meta property="${key}" content="${escape(value)}">`),
   ...Object.entries({'twitter:card':'summary','twitter:title':meta.title,'twitter:description':meta.description,'twitter:image':origin+'/TNT.png'}).map(([key,value])=>`<meta name="${key}" content="${escape(value)}">`),
   `<script id="seo-schema" type="application/ld+json">${JSON.stringify(meta.schema).replaceAll('<','\\u003c')}</script>`
  ].join('\n    ');
  const html=template.replace(/<title>.*?<\/title>/s,'').replace(/<meta name="description"[^>]*>/,'').replace('<html lang="en">','<html lang="en-IN">').replace('</head>',tags+'\n  </head>').replace('<div id="root"></div>',`<div id="root">${body}</div>`);
  const target=path==='/'?'dist/index.html':path==='/404'?'dist/404.html':`dist${path}/index.html`;
  await mkdir(target.slice(0,target.lastIndexOf('/')),{recursive:true});await writeFile(target,html);
 }
 await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicPaths.map(p=>`\n  <url><loc>${origin}${p}</loc></url>`).join('')}\n</urlset>\n`);
 await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
 await writeFile('dist/llms.txt',`# TNT & Associates\n\n> Practising company secretaries and corporate advisory professionals, with offices in Vadodara and Ahmedabad, India.\n\n## Firm information\n- [About the firm](${origin}/about)\n- [Team and professional profiles](${origin}/people)\n- [Contact and office addresses](${origin}/contact)\n\n## Services\n${practices.map(p=>`- [${p.name}](${origin}/services/${p.id}): ${p.shortDescription}`).join('\n')}\n\n## Contact\nHead office: 218-220 Saffron Complex, Fatehgunj, Vadodara 390002, Gujarat.\nTelephone: +91-265-2784388\nEmail: niraj@nirajtrivedi-cs.com\n\nThis file summarizes the public website. Service descriptions are general information, not personalized legal advice.\n`);
 console.log(`Prerendered ${publicPaths.length} indexable pages plus utility pages; generated sitemap, robots.txt and llms.txt.`);
} finally { await server.close(); }
