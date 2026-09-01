export function slugify(s:string){return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");}
export function baseUrl(){return process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";}
