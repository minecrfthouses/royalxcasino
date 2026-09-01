import{NextResponse}from"next/server";import{prisma}from"@/lib/prisma";import{requireAdmin}from"@/lib/auth";import{put}from"@vercel/blob";

export async function GET(){
  try{
    await requireAdmin();
    const items=await prisma.media.findMany({orderBy:{createdAt:"desc"}});
    return NextResponse.json(items);
  }catch(e:any){
    if(e?.message==="UNAUTHORIZED")return NextResponse.json({error:"Unauthorized"},{status:401});
    return NextResponse.json({error:"Unable to load media"},{status:400});
  }
}

export async function POST(req:Request){
  try{
    await requireAdmin();
    const form=await req.formData();
    const file=form.get("file") as File|null;
    if(!file)return NextResponse.json({error:"No file received"},{status:400});
    const isVideo=file.type.startsWith("video/");
    const isImage=file.type.startsWith("image/");
    if(!isVideo&&!isImage)return NextResponse.json({error:"Only image or video files are allowed"},{status:400});
    if(file.size>50*1024*1024)return NextResponse.json({error:"File is larger than the 50MB limit"},{status:400});
    const blob=await put(`media/${Date.now()}-${file.name}`,file,{access:"public"});
    const media=await prisma.media.create({data:{url:blob.url,type:isVideo?"video":"image",filename:file.name,size:file.size}});
    return NextResponse.json(media);
  }catch(e:any){
    if(e?.message==="UNAUTHORIZED")return NextResponse.json({error:"Unauthorized"},{status:401});
    return NextResponse.json({error:e?.message||"Upload failed"},{status:400});
  }
}
