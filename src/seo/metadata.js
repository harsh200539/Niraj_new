import { practices, people, offices } from '../data/mockDb.js';
export const origin = 'https://www.nirajtrivedi-cs.com';
const orgId = `${origin}/#organization`;
const websiteId = `${origin}/#website`;
const titles = {
 ipo: 'IPO Advisory & Due Diligence', llp: 'LLP Formation & Compliance', sebi: 'SEBI & Securities Compliance', fema: 'FEMA & Foreign Investment Advisory', fcra: 'FCRA Advisory & Compliance', ibc: 'IBC & NCLT Advisory', banking: 'Banking & Finance Advisory', audit: 'Secretarial & Compliance Audit', ipr: 'Intellectual Property Advisory', 'corporate-restructuring': 'Corporate Restructuring', 'capital-restructuring': 'Capital Restructuring'
};
const pages = {
 '/': ['Company Secretary in Vadodara | CS Niraj Trivedi', 'TNT & Associates provides company secretarial, IPO, FEMA, SEBI and corporate compliance services from Vadodara and Ahmedabad, serving businesses in India.', 'Home'],
 '/about': ['About TNT & Associates | CS Niraj Trivedi', 'Learn about TNT & Associates, its professional journey, values and corporate advisory practice in Vadodara and Ahmedabad.', 'About Us'],
 '/people': ['Our Team | TNT & Associates, Company Secretaries', 'Meet CS Niraj Trivedi and the company secretaries and legal professionals at TNT & Associates in Vadodara and Ahmedabad.', 'Our People'],
 '/services': ['Company Secretarial Services | TNT & Associates', 'Explore IPO, LLP, SEBI, FEMA, FCRA, IBC, banking, secretarial audit and restructuring services from TNT & Associates.', 'Services'],
 '/contact': ['Contact CS Niraj Trivedi | Vadodara & Ahmedabad', 'Contact TNT & Associates at 0265-2784388 or niraj@nirajtrivedi-cs.com. Find our Vadodara headquarters and Ahmedabad office.', 'Contact'],
 '/privacy': ['Privacy Policy | TNT & Associates', 'Read the website privacy information for TNT & Associates.', 'Privacy Policy'],
 '/terms': ['Terms of Use | TNT & Associates', 'Read the website terms and regulatory information for TNT & Associates.', 'Terms of Use'],
 '/cookies': ['Cookie Policy | TNT & Associates', 'Read the website cookie and privacy information for TNT & Associates.', 'Cookie Policy']
};
export const publicPaths = ['/', '/about', '/people', '/services', ...practices.map(p => `/services/${p.id}`), '/contact'];
export const otherPaths = ['/privacy','/terms','/cookies','/admin','/error'];
export function getMetadata(input = '/') {
 const path = input === '/' ? '/' : input.replace(/\/+$/, '');
 const service = practices.find(p => path === `/services/${p.id}`);
 const entry = service ? [`${titles[service.id]} | TNT & Associates`, service.shortDescription.replace(/^We provide /, 'TNT & Associates provides ').slice(0,157), service.name] : pages[path];
 const known = Boolean(entry);
 const [title, description, label] = entry || [path === '/admin' ? 'Administration | TNT & Associates' : 'Page Not Found | TNT & Associates', 'TNT & Associates website.', 'Page Not Found'];
 const noindex = !publicPaths.includes(path);
 const url = `${origin}${path}`;
 const organization = {
  '@type': 'ProfessionalService', '@id': orgId, name: 'TNT & Associates', url: origin+'/', logo: origin+'/TNT.png', image: origin+'/TNT.png',
  description: pages['/'][1], telephone: '+91-265-2784388', email: 'niraj@nirajtrivedi-cs.com', areaServed: {'@type':'Country', name:'India'},
  address: {'@type':'PostalAddress',streetAddress:'218-220 Saffron Complex, Fatehgunj',addressLocality:'Vadodara',addressRegion:'Gujarat',postalCode:'390002',addressCountry:'IN'},
  sameAs: ['https://www.linkedin.com/in/niraj-trivedi-5458a117'],
  department: offices.filter(o=>o.type==='Branch Office').map(o=>({'@type':'ProfessionalService','@id':`${origin}/#office-${o.id}`,name:`TNT & Associates — ${o.city}`,address:{'@type':'PostalAddress',streetAddress:o.address,addressLocality:o.city,addressRegion:'Gujarat',addressCountry:'IN'}}))
 };
 const page = {'@type': path === '/about' ? 'AboutPage' : path === '/contact' ? 'ContactPage' : path === '/services' || path === '/people' ? 'CollectionPage' : 'WebPage', '@id': url+'#webpage',url,name:title,description,inLanguage:'en-IN',isPartOf:{'@id':websiteId},about:{'@id':orgId}};
 const graph = [organization, {'@type':'WebSite','@id':websiteId,url:origin+'/',name:'TNT & Associates',publisher:{'@id':orgId},inLanguage:'en-IN'}, page];
 if(known && path!=='/') {
  const crumbs = [{name:'Home',item:origin+'/'}];
  if(service) crumbs.push({name:'Services',item:origin+'/services'});
  crumbs.push({name:label,item:url});
  graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumbs',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))});
  page.breadcrumb={'@id':url+'#breadcrumbs'};
 }
 if(service) graph.push({'@type':'Service','@id':url+'#service',name:service.name,serviceType:service.name,description:service.description,url,provider:{'@id':orgId},areaServed:{'@type':'Country',name:'India'}});
 if(path==='/services') graph.push({'@type':'ItemList',itemListElement:practices.map((p,i)=>({'@type':'ListItem',position:i+1,name:p.name,url:`${origin}/services/${p.id}`}))});
 if(path==='/people') graph.push(...people.map(p=>({'@type':'Person','@id':`${origin}/people#${p.id}`,name:p.name,jobTitle:p.title,worksFor:{'@id':orgId},...(p.linkedin ? {sameAs:[p.linkedin]} : {})})));
 return {path,url,title,description,noindex,known,schema:{'@context':'https://schema.org','@graph':graph}};
}
