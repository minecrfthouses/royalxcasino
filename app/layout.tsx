import "./globals.css";import Header from "@/components/Header";import Footer from "@/components/Footer";
export const metadata={title:"Royal X Casino",description:"Gaming information, app guides and download resources.",robots:{index:true,follow:true},icons:{icon:"/logo.svg"}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/>{children}<Footer/></body></html>}
