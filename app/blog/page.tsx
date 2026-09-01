import {prisma} from "@/lib/prisma";import Link from "next/link";
export const dynamic="force-dynamic";
export default async function Blog(){const ps=await prisma.post.findMany({where:{status:"PUBLISHED"},orderBy:{publishedAt:"desc"}});return <main><div className="container breadcrumb">Home / Blog</div><section className="section"><div className="container"><div className="kicker">Articles</div><h1>Blog</h1><div className="grid3">{ps.map(p=><Link className="card" href={`/blog/${p.slug}`} key={p.id}><h3>{p.title}</h3><p>{p.excerpt}</p></Link>)}</div></div></section></main>}
