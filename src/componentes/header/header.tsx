"use client";

import Image from "next/image";
import style from "./header.module.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Hamburguer from "./hamburguer";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        if (pathName === "/") {
            const handleScroll = () => {
                const scrollPosition = window.scrollY; // Posición del scroll
                const halfScreen = window.innerHeight * 0.25; // 50% de la primera página
                setIsScrolled(scrollPosition > halfScreen);
            };
    
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }else{
            setIsScrolled(true)
        }
    }, [pathName]);


    return (
        <header className={`${style.header} ${isScrolled ? style.backgroundHeader : ''}`}>
            <Image 
                className={`${style.logo} ${isScrolled ? style.logoScrolled : ''}`} 
                src="/logotipo.svg" 
                alt="Logo de Living Soul" 
                width={100} 
                height={100} 
            />
            <nav className={`${style.nav} ${isMenuOpen ? style.navver : ''}`}>
                <Link onClick={() => setIsMenuOpen(false)} className={`${style.link} ${pathName === "/" ? style.lugar : ''}`} scroll={true} href="/">Inicio</Link>
                <Link onClick={() => setIsMenuOpen(false)} className={`${style.link} ${pathName === "/planes" ? style.lugar : ''}`} scroll={true} href="./#planes">Precios</Link>
                <Link onClick={() => setIsMenuOpen(false)} className={`${style.link} ${pathName === "/nosotros" ? style.lugar : ''}`} scroll={true} href="/nosotros">Nosotros</Link>
                <Link onClick={() => setIsMenuOpen(false)} className={`${style.link} ${pathName === "/blog" ? style.lugar : ''}`} scroll={true} href="/blog">Blog</Link>
                <Link onClick={() => setIsMenuOpen(false)} className={`${style.link} ${pathName === "/contacto" ? style.lugar : ''}`} scroll={true} href="./#contacto">Contacto</Link>
            </nav>
            <div className={style.actions}>
                <Link href={'/user'}><button className={`btn`}>Pagar plan</button></Link>
                <Hamburguer menu={isMenuOpen} menuOpen={setIsMenuOpen} />
            </div>
        </header>
    );
}
