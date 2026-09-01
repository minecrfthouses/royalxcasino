export const dynamic = "force-dynamic";
import PostForm from"@/components/admin/PostForm";import{prisma}from"@/lib/prisma";import{notFound}from"next/navigation";
export default async function Edit({params}:{params:Promise<{id:string}>}){
  const{id}=await params;
  const[p,categories]=await Promise.all([
    prisma.post.findUnique({where:{id:Number(id)},include:{seo:true,category:true}}),
    prisma.category.findMany({orderBy:{name:"asc"}})
  ]);
  if(!p)notFound();
  return <><h1>Edit Post</h1><PostForm post={p} categories={categories}/></>
}
