"use client";

import { useEffect, useState } from "react"
import styles from "./comentarios.module.css"
import { IconHeart } from "@tabler/icons-react";

export default function Comentarios() {
    const [active, setActive] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setActive(prev => (prev === 3 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className={styles.comentarios}>
            <ul>
                <li onClick={() => { setActive(0) }} className={active === 0 ? styles.active : ''}>01</li>
                <li onClick={() => { setActive(1) }} className={active === 1 ? styles.active : ''}>02</li>
                <li onClick={() => { setActive(2) }} className={active === 2 ? styles.active : ''}>03</li>
                <li onClick={() => { setActive(3) }} className={active === 3 ? styles.active : ''}>04</li>
            </ul>

            <div className={styles.comentariosContainer}>
                <ul style={{ transform: `translateX(-${active * 25}%)` }}>
                    <li>
                        <div className={styles.headerComent}>
                            <strong>Ana M.</strong>
                            <span>Hace 7 días</span>
                        </div>
                        <div className={styles.contenido}>
                            <em>
                                "Increíble servicio. Gracias a Living Soul, mi perrito
                                recibió atención rápida y de calidad.
                                Se nota el amor y compromiso por las mascotas.
                                ¡100% recomendados!"
                            </em>
                        </div>
                        <div className={styles.gusta}>
                            <small>225</small> <IconHeart />
                        </div>
                    </li>
                    <li>
                        <div className={styles.headerComent}>
                            <strong>Carlos G.</strong>
                            <span>Hace 19 días</span>
                        </div>
                        <div className={styles.contenido}>
                            <em>
                                "Estoy muy satisfecho con el servicio. La atención veterinaria fue
                                excelente y el proceso de consulta fue muy ágil. Mi gata Luna está
                                mejor que nunca. ¡Gracias, Living Soul!"
                            </em>
                        </div>
                        <div className={styles.gusta}>
                            <small>98</small> <IconHeart />
                        </div>
                    </li>
                    <li>
                        <div className={styles.headerComent}>
                            <strong>Valery R.</strong>
                            <span>Hace 1 mes</span>
                        </div>
                        <div className={styles.contenido}>
                            <em>
                                "Un servicio excepcional. Me dieron toda la orientación y apoyo
                                necesario para el tratamiento de mi mascota. Se preocupan de verdad por el
                                bienestar animal. ¡Los recomiendo sin dudar!"
                            </em>
                        </div>
                        <div className={styles.gusta}>
                            <small>116</small> <IconHeart />
                        </div>
                    </li>
                    <li>
                        <div className={styles.headerComent}>
                            <strong>Javier R.</strong>
                            <span>Hace 1 mes</span>
                        </div>
                        <div className={styles.contenido}>
                            <em>
                                "Desde que inscribí a mi perro en Living Soul, me siento
                                mucho más tranquilo. Las consultas son eficientes, el
                                personal es muy amable y el servicio es de
                                primera calidad. ¡La mejor EPS para mascotas!"
                            </em>
                        </div>
                        <div className={styles.gusta}>
                            <small>103</small> <IconHeart />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}