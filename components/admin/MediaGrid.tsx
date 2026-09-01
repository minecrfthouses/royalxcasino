"use client";import{useRouter}from"next/navigation";
export default function MediaGrid({items}:{items:any[]}){
  const r=useRouter();
  async function copy(url:string){
    try{await navigator.clipboard.writeText(url);alert("URL copied")}catch{prompt("Copy this URL:",url)}
  }
  async function remove(id:number){
    if(!confirm("Delete this file? This cannot be undone."))return;
    const res=await fetch(`/api/admin/media/${id}`,{method:"DELETE"});
    if(res.ok)r.refresh();else alert("Delete failed")
  }
  if(!items.length)return <p className="muted">No media uploaded yet.</p>;
  return <div className="mediaGrid">
    {items.map(m=><div className="mediaCard" key={m.id}>
      {m.type==="video"?<video src={m.url} muted/>:<img src={m.url} alt={m.filename}/>}
      <div className="mediaMeta">
        <small title={m.filename}>{m.filename}</small>
        <div className="mediaActions">
          <button type="button" className="btn outline" onClick={()=>copy(m.url)}>Copy URL</button>
          <button type="button" className="btn outline" onClick={()=>remove(m.id)}>Delete</button>
        </div>
      </div>
    </div>)}
  </div>
}
