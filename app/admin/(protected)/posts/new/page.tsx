export const dynamic = "force-dynamic";
import PostForm from"@/components/admin/PostForm";import{prisma}from"@/lib/prisma";
export default async function New(){
  const categories=await prisma.category.findMany({orderBy:{name:"asc"}});
  return <><h1>Add Post</h1><PostForm categories={categories}/></>
}
