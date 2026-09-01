"use client";import{useRouter}from"next/navigation";
export default function DeletePostButton({id}:{id:number}){
  const r=useRouter();
  async function remove(){
    if(!confirm("Delete this post? This cannot be undone."))return;
    const x=await fetch(`/api/admin/posts/${id}`,{method:"DELETE"});
    if(x.ok)r.refresh();else alert("Delete failed")
  }
  return <button type="button" className="btn outline" onClick={remove}>Delete</button>
}
