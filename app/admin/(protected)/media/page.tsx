export const dynamic = "force-dynamic";
import{prisma}from"@/lib/prisma";import MediaUploader from"@/components/admin/MediaUploader";import MediaGrid from"@/components/admin/MediaGrid";
export default async function Media(){
  const items=await prisma.media.findMany({orderBy:{createdAt:"desc"}});
  return <>
    <div className="adminTop"><div><h1>Media</h1><p>Upload images and videos, then copy the URL into any Description, Excerpt, or Featured image field.</p></div><MediaUploader/></div>
    <MediaGrid items={JSON.parse(JSON.stringify(items))}/>
  </>
}
