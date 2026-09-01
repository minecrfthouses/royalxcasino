import {PrismaClient,Role,Status} from "@prisma/client";
import bcrypt from "bcryptjs";
const db=new PrismaClient();
async function main(){
 const email=process.env.ADMIN_EMAIL||"admin@yourdomain.com";
 const pass=process.env.ADMIN_PASSWORD||"ChangeMe123!";
 const admin=await db.user.upsert({where:{email},update:{name:process.env.ADMIN_NAME||"Administrator",passwordHash:await bcrypt.hash(pass,12),role:Role.SUPER_ADMIN,status:true},create:{name:process.env.ADMIN_NAME||"Administrator",email,passwordHash:await bcrypt.hash(pass,12),role:Role.SUPER_ADMIN}});
 const cats=[["Casino","casino"],["Card Games","card-games"],["Slots","slots"],["Fishing","fishing"],["Live Casino","live-casino"],["Sports","sports"],["Mini Games","mini-games"],["Demo","demo"]];
 for(const [name,slug] of cats) await db.category.upsert({where:{slug},update:{},create:{name,slug,description:`${name} games and guides.`}});
 const cat=await db.category.findUnique({where:{slug:"casino"}});
 await db.game.upsert({where:{slug:"royal-x-casino"},update:{},create:{title:"Royal X Casino",slug:"royal-x-casino",shortDesc:"App information, features, games and installation guide.",description:"<h2>Royal X Casino</h2><p>This page provides structured information about the app, its features and installation process.</p>",image:"/logo.svg",downloadUrl:"#download",version:"2.65",fileSize:"9 MB",developer:"Royal X",isFeatured:true,isHot:true,status:Status.PUBLISHED,categoryId:cat?.id}});
 for(const [title,slug,content] of [["About","about","<h2>About</h2><p>Learn about this website and our publishing approach.</p>"],["Contact","contact","<h2>Contact Us</h2><p>Use the published contact details for enquiries and corrections.</p>"],["Privacy Policy","privacy-policy","<h2>Privacy Policy</h2><p>Replace this starter text with your final privacy policy before launch.</p>"],["Terms and Conditions","terms","<h2>Terms and Conditions</h2><p>Replace this starter text with your final terms before launch.</p>"]]) await db.page.upsert({where:{slug},update:{},create:{title,slug,content,status:Status.PUBLISHED}});
 const settings={siteName:"Royal X Casino",siteTagline:"Gaming information and download guides",homeTitle:"Royal X Casino Download APK v2.65",homeIntro:"Explore app information, games, features, installation guidance and FAQs.",footerText:"Gaming information and download guides.",contactEmail:email};
 for(const [key,value] of Object.entries(settings)) await db.siteSetting.upsert({where:{key},update:{value},create:{key,value}});
 await db.auditLog.create({data:{userId:admin.id,action:"SEED",entity:"SYSTEM",entityId:"0"}});
 console.log("Seed complete");
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>db.$disconnect());
