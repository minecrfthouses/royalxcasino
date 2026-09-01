"use client";import{useRef,useState}from"react";import{useRouter}from"next/navigation";
export default function MediaUploader(){
  const r=useRouter();
  const inputRef=useRef<HTMLInputElement>(null);
  const[busy,setBusy]=useState(false);
  async function onChange(e:React.ChangeEvent<HTMLInputElement>){
    const files=e.target.files;
    if(!files||!files.length)return;
    setBusy(true);
    for(const file of Array.from(files)){
      const fd=new FormData();
      fd.append("file",file);
      const res=await fetch("/api/admin/media",{method:"POST",body:fd});
      if(!res.ok){const d=await res.json().catch(()=>({}));alert(`${file.name}: ${d.error||"upload failed"}`)}
    }
    setBusy(false);
    if(inputRef.current)inputRef.current.value="";
    r.refresh();
  }
  return <div>
    <input ref={inputRef} id="mediaFile" type="file" accept="image/*,video/*" multiple onChange={onChange} disabled={busy} style={{display:"none"}}/>
    <label htmlFor="mediaFile" className="btn gold">{busy?"Uploading...":"Upload Image or Video"}</label>
  </div>
}
