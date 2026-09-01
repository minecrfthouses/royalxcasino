import {prisma} from "../lib/prisma";
prisma.$queryRaw`SELECT 1`.then(()=>console.log("MySQL connection OK")).catch(e=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect());
