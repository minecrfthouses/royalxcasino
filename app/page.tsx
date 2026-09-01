import {prisma} from "@/lib/prisma";import JsonLd from "@/components/JsonLd";import {injectToc} from "@/lib/toc";
export const dynamic="force-dynamic";
export default async function Home(){
  const g=await prisma.game.findFirst({where:{status:"PUBLISHED"},orderBy:[{isFeatured:"desc"},{sortOrder:"asc"},{createdAt:"desc"}],include:{category:true,seo:true}});
  if(!g){
    return <main><section className="section"><div className="container"><h1>Coming soon</h1><p className="lead">Add a published game/app in the admin panel to populate this page.</p></div></section></main>
  }
  return <main>
    <section className="hero"><div className="container heroGrid">
      <div>
        <div className="kicker">{g.category?.name||"App"}</div>
        <h1>{g.title}</h1>
        <p className="lead">{g.shortDesc}</p>
        <div className="actions">
          <a className="btn gold" href={g.downloadUrl||"#"}>Download {g.title}</a>
          <a className="btn outline" href="/blog">Read our blog</a>
        </div>
      </div>
      <div className="heroImage"><img src={g.image||"/logo.svg"} alt={g.title}/></div>
    </div></section>
    <section className="section"><div className="container">
      <div className="kicker">App information</div>
      <h2>{g.title} at a glance</h2>
      <table className="infoTable"><tbody>
        {[["App Name",g.title],["Version",g.version],["File Size",g.fileSize],["Category",g.category?.name],["Developer",g.developer]].map(x=><tr key={x[0]}><td>{x[0]}</td><td>{x[1]||"Not specified"}</td></tr>)}
      </tbody></table>
    </div></section>
    <section className="section soft"><div className="container article">
      <div dangerouslySetInnerHTML={{__html:injectToc(g.description||"<p>Details coming soon.</p>")}}/>
    </div></section>
    <JsonLd data={{"@context":"https://schema.org","@type":"SoftwareApplication","name":g.title,"description":g.shortDesc||g.title,"applicationCategory":"GameApplication","operatingSystem":"Android","softwareVersion":g.version||undefined}}/>
  </main>
}
