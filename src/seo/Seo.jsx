import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMetadata, origin } from './metadata.js';
export default function Seo() {
 const { pathname } = useLocation();
 useEffect(() => {
  const meta = getMetadata(pathname);
  document.title = meta.title;
  document.documentElement.lang = 'en-IN';
  const set = (key, value, property=false) => {
   const attr = property ? 'property' : 'name';
   let node = document.head.querySelector(`meta[${attr}="${key}"]`);
   if(!node) {node=document.createElement('meta');node.setAttribute(attr,key);document.head.append(node);}
   node.content=value;
  };
  set('description',meta.description);set('robots',meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  for(const [key,value] of Object.entries({'og:title':meta.title,'og:description':meta.description,'og:url':meta.url,'og:type':'website','og:site_name':'TNT & Associates','og:locale':'en_IN','og:image':origin+'/TNT.png','og:image:alt':'TNT & Associates logo'})) set(key,value,true);
  set('twitter:card','summary');set('twitter:title',meta.title);set('twitter:description',meta.description);set('twitter:image',origin+'/TNT.png');
  let canonical=document.head.querySelector('link[rel="canonical"]');
  if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.append(canonical);}canonical.href=meta.url;
  let schema=document.getElementById('seo-schema');
  if(!schema){schema=document.createElement('script');schema.id='seo-schema';schema.type='application/ld+json';document.head.append(schema);}schema.textContent=JSON.stringify(meta.schema);
 }, [pathname]);
 return null;
}
