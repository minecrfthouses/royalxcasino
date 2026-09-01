export const dynamic = "force-dynamic";
import{prisma}from"@/lib/prisma";import Link from"next/link";import DeletePostButton from"@/components/admin/DeletePostButton";
export default async function Posts(){
  const ps=await prisma.post.findMany({include:{category:true},orderBy:{updatedAt:"desc"}});
  return <><div className="adminTop"><div><h1>Posts</h1><p>Add and manage blog posts.</p></div><Link className="btn gold" href="/admin/posts/new">Add Post</Link></div>
  <table className="table"><thead><tr><th>Title</th><th>Category</th><th>Status</th><th></th></tr></thead>
  <tbody>{ps.map(p=><tr key={p.id}><td>{p.title}<br/><small>{p.slug}</small></td><td>{p.category?.name||"-"}</td><td>{p.status}</td><td className="rowActions"><Link className="btn outline" href={`/admin/posts/${p.id}`}>Edit</Link><DeletePostButton id={p.id}/></td></tr>)}</tbody></table></>
}
