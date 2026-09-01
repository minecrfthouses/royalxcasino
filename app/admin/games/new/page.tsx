export const dynamic = "force-dynamic";
import GameForm from "@/components/admin/GameForm";import{prisma}from"@/lib/prisma";export default async function New(){return <><h1>Add Game</h1><GameForm categories={await prisma.category.findMany({orderBy:{name:"asc"}})}/></>}
