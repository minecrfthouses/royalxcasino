import{NextResponse}from"next/server";import{prisma}from"@/lib/prisma";import{requireAdmin}from"@/lib/auth";import{del}from"@vercel/blob";

export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){
  try{
    await requireAdmin();
    const{id}=await params;
    const m=await prisma.media.findUnique({where:{id:Number(id)}});
    if(!m)return NextResponse.json({error:"Not found"},{status:404});
    try{await del(m.url)}catch{}
    await prisma.media.delete({where:{id:Number(id)}});
    return NextResponse.json({ok:true});
  }catch(e:any){
    if(e?.message==="UNAUTHORIZED")return NextResponse.json({error:"Unauthorized"},{status:401});
    return NextResponse.json({error:"Delete failed"},{status:400});
  }
}
