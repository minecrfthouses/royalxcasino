import {cookies} from "next/headers";
import {jwtVerify,SignJWT} from "jose";
import {prisma} from "@/lib/prisma";
if(!process.env.AUTH_SECRET&&process.env.NODE_ENV==="production"){throw new Error("AUTH_SECRET environment variable is required in production. Set a long random secret before starting the app.");}
const secret=new TextEncoder().encode(process.env.AUTH_SECRET||"dev-secret-change-me");
const COOKIE="rx_session";
export async function createSession(userId:number){const token=await new SignJWT({userId}).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("7d").sign(secret);(await cookies()).set(COOKIE,token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:604800});}
export async function clearSession(){(await cookies()).delete(COOKIE);}
export async function currentUser(){try{const t=(await cookies()).get(COOKIE)?.value;if(!t)return null;const {payload}=await jwtVerify(t,secret);return prisma.user.findUnique({where:{id:Number(payload.userId)}})}catch{return null}}
export async function requireAdmin(){const u=await currentUser();if(!u||!u.status)throw new Error("UNAUTHORIZED");return u;}
