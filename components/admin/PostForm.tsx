"use client";import{useState}from"react";import{useRouter}from"next/navigation";
export default function PostForm({categories,post}:{categories:any[],post?:any}){
  const r=useRouter();
  const[f,setF]=useState<any>({
    title:post?.title||"",
    slug:post?.slug||"",
    excerpt:post?.excerpt||"",
    content:post?.content||"",
    image:post?.image||"",
    categoryId:post?.categoryId||"",
    status:post?.status||"DRAFT",
    seoTitle:post?.seo?.title||"",
    seoDescription:post?.seo?.description||""
  });
  const set=(k:string,v:any)=>setF((x:any)=>({...x,[k]:v}));
  async function save(e:React.FormEvent){
    e.preventDefault();
    const u=post?`/api/admin/posts/${post.id}`:"/api/admin/posts";
    const x=await fetch(u,{method:post?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(f)});
    if(x.ok){r.push("/admin/posts");r.refresh()}else{const d=await x.json().catch(()=>({}));alert(d.error||"Save failed")}
  }
  async function remove(){
    if(!post)return;
    if(!confirm("Delete this post? This cannot be undone."))return;
    const x=await fetch(`/api/admin/posts/${post.id}`,{method:"DELETE"});
    if(x.ok){r.push("/admin/posts");r.refresh()}else alert("Delete failed")
  }
  return <form className="card" onSubmit={save}>
    <div className="formGrid">
      <div className="field"><label>Title</label><input required value={f.title} onChange={e=>set("title",e.target.value)}/></div>
      <div className="field"><label>Slug</label><input value={f.slug} onChange={e=>set("slug",e.target.value)} placeholder="auto-generated from title if left blank"/></div>
      <div className="field"><label>Category</label><select value={f.categoryId} onChange={e=>set("categoryId",e.target.value)}><option value="">None</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
      <div className="field"><label>Status</label><select value={f.status} onChange={e=>set("status",e.target.value)}><option>DRAFT</option><option>PUBLISHED</option><option>ARCHIVED</option></select></div>
      <div className="field full"><label>Featured image URL</label><input value={f.image} onChange={e=>set("image",e.target.value)} placeholder="paste a URL copied from Media"/></div>
      <div className="field full"><label>Excerpt (shown on the blog list page)</label><textarea value={f.excerpt} onChange={e=>set("excerpt",e.target.value)}/></div>
      <div className="field full"><label>Content HTML</label><textarea className="tall" value={f.content} onChange={e=>set("content",e.target.value)}/></div>
      <div className="field"><label>SEO title</label><input value={f.seoTitle} onChange={e=>set("seoTitle",e.target.value)}/></div>
      <div className="field"><label>Meta description</label><textarea value={f.seoDescription} onChange={e=>set("seoDescription",e.target.value)}/></div>
    </div>
    <div className="formActions">
      <button className="btn gold">Save Post</button>
      {post&&<button type="button" className="btn outline" onClick={remove}>Delete Post</button>}
    </div>
  </form>
}
