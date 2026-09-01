import{NextResponse}from"next/server";import{prisma}from"@/lib/prisma";import{requireAdmin}from"@/lib/auth";import{slugify}from"@/lib/utils";

export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){
  try{
    await requireAdmin();
    const{id}=await params;
    const b=await req.json();
    if(!b.title)return NextResponse.json({error:"Title is required"},{status:400});
    const existing=await prisma.post.findUnique({where:{id:Number(id)}});
    if(!existing)return NextResponse.json({error:"Post not found"},{status:404});
    const status=b.status||existing.status;
    const post=await prisma.post.update({
      where:{id:Number(id)},
      data:{
        title:b.title,
        slug:slugify(b.slug||b.title),
        excerpt:b.excerpt||null,
        content:b.content,
        image:b.image||null,
        status,
        publishedAt:status==="PUBLISHED"?(existing.publishedAt||new Date()):existing.publishedAt,
        categoryId:b.categoryId?Number(b.categoryId):null,
        seo:{upsert:{
          create:{title:b.seoTitle||null,description:b.seoDescription||null,schemaType:"Article"},
          update:{title:b.seoTitle||null,description:b.seoDescription||null}
        }}
      }
    });
    return NextResponse.json(post);
  }catch(e:any){
    if(e?.message==="UNAUTHORIZED")return NextResponse.json({error:"Unauthorized"},{status:401});
    if(e?.code==="P2002")return NextResponse.json({error:"A post with that slug already exists"},{status:400});
    return NextResponse.json({error:"Unable to update post"},{status:400});
  }
}

export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){
  try{
    await requireAdmin();
    const{id}=await params;
    await prisma.post.delete({where:{id:Number(id)}});
    return NextResponse.json({ok:true});
  }catch(e:any){
    if(e?.message==="UNAUTHORIZED")return NextResponse.json({error:"Unauthorized"},{status:401});
    return NextResponse.json({error:"Unable to delete post"},{status:400});
  }
}
