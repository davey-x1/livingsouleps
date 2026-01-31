"use client";
import { IconStarFilled } from "@tabler/icons-react";
import Typewriter from "../escritura/escritura";
import Image from "next/image";
import { useEffect, useState } from "react";

interface props {
    styles: any
}
export default function PageUno({ styles }: props) {
    const [textoUno, setTextoUno] = useState(false);
    const [lugar, setLugar] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setLugar(prev => (prev < 3 ? prev + 1 : prev));
        }, 6000);

        return () => clearInterval(intervalo); // Limpieza al desmontar el componente
    }, []);
    return (
        <div className={styles.contenido}>
            <div className={styles.contenidoDos}>
                {
                    lugar === 0 ?
                        <p className={styles.texto}>
                            {
                                textoUno && <Typewriter typingSpeed={30} text="Living Soul ofrece servicios medicos veterinarios de alta calidad para mantener a tu mascota feliz y saludable" />
                            }
                        </p>
                        :
                        lugar === 1 ?
                            <p className={styles.texto}>
                                {
                                    textoUno && <Typewriter typingSpeed={30} text="Protege a tu mascota con los mejores cuidados preventivos y tratamientos" />
                                }
                            </p>
                            :
                            lugar === 2 ?
                                <p className={styles.texto}>
                                    {
                                        textoUno && <Typewriter typingSpeed={30} text="Acompañamos a tu mascota en todas las etapas de su vida" />
                                    }
                                </p>
                                :
                                <p className={styles.texto}>
                                    {
                                        textoUno && <Typewriter typingSpeed={30} text="Únete a Living Soul y forma parte de una familia que cuida la tuya" />
                                    }
                                </p>
                }
                <ul className={styles.textosmap}>
                    <li onClick={()=>setLugar(0)} className={lugar === 0 ? styles.activado : null}></li>
                    <li onClick={()=>setLugar(1)} className={lugar === 1 ? styles.activado : null}></li>
                    <li onClick={()=>setLugar(2)} className={lugar === 2 ? styles.activado : null}></li>
                    <li onClick={()=>setLugar(3)} className={lugar === 3 ? styles.activado : null}></li>
                </ul>
                <button className="btn"><a href="#planes">Ver planes y precios</a></button>
            </div>
            <div className={styles.contenidoUno}>
                <h2><Typewriter typingSpeed={30} finalizado={setTextoUno} text="Contamos con cobertura a nivel nacional" /></h2>
                {
                    textoUno && <>
                        <p><IconStarFilled size={20} /> <strong>4.6</strong> <span>(+1.5k calificaciones)</span></p>
                        <ul>
                            <li>
                                <Image className={styles.cliente} src="/hombre1.jpg" alt="Foto de un usuario" title="Foto de un usuario" width={50} height={50} />
                            </li>
                            <li>
                                <Image className={styles.cliente} src="/mujer1.jpg" alt="Foto de un usuario" title="Foto de un usuario" width={50} height={50} />
                            </li>
                            <li>
                                <Image className={styles.cliente} src="/hombre2.jpg" alt="Foto de un usuario" title="Foto de un usuario" width={50} height={50} />
                            </li>
                            <li>
                                <Image className={styles.cliente} src="/mujer2.jpg" alt="Foto de un usuario" title="Foto de un usuario" width={50} height={50} />
                            </li>
                            <li>+1.5k</li>
                        </ul>
                    </>
                }
            </div>

        </div>
    )
}