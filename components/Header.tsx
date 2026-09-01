import Link from "next/link";
export default function Header(){return <header className="topbar"><div className="container"><Link href="/" className="brand"><img src="/logo.svg" alt=""/><span>Royal X Casino</span></Link><nav className="nav"><Link href="/">Home</Link><Link href="/blog">Blog</Link></nav><span className="mobile">☰</span></div></header>}
