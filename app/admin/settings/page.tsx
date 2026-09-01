export const dynamic = "force-dynamic";
import{prisma}from"@/lib/prisma";import SettingsForm from"@/components/admin/SettingsForm";export default async function Settings(){const s=Object.fromEntries((await prisma.siteSetting.findMany()).map(x=>[x.key,x.value]));return <><h1>Site Settings</h1><SettingsForm values={s}/></>}
