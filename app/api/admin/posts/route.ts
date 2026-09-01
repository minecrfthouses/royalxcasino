import{NextResponse}from"next/server";import{prisma}from"@/lib/prisma";import{requireAdmin}from"@/lib/auth";import{slugify}from"@/lib/utils";

export async function POST(req:Request){
  try{
    const user=await requireAdmin();
    const b=await req.json();
    if(!b.title)return NextResponse.json({error:"Title is required"},{status:400});
    const slug=slugify(b.slug||b.title);
    const status=b.status||"DRAFT";
    const post=await prisma.post.create({data:{
      title:b.title,
      slug,
      excerpt:b.excerpt||null,
      content:b.content||"",
      image:b.image||null,
      status,
      publishedAt:status==="PUBLISHED"?new Date():null,
      authorId:user.id,
      categoryId:b.categoryId?Number(b.categoryId):null,
      seo:(b.seoTitle||b.seoDescription)?{create:{title:b.seoTitle||null,description:b.seoDescription||null,schemaType:"Article"}}:undefined
    }});
    return NextResponse.json(post);
  }catch(e:any){
    if(e?.message==="UNAUTHORIZED")return NextResponse.json({error:"Unauthorized"},{status:401});
    if(e?.code==="P2002")return NextResponse.json({error:"A post with that slug already exists"},{status:400});
    return NextResponse.json({error:"Unable to create post"},{status:400});
  }
}
