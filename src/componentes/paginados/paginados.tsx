"use client";

import { useEffect, useState } from 'react';
import style from './paginados.module.css';
import { IconShoppingCart } from '@tabler/icons-react';
import MasInfo from './masinfo';

interface tipoRespuesta {
    tipo: 'success' | 'error' | 'info';
    mensaje: string;
    datos: any;
}
interface Planes {
    id: number;
    nombre: string;
    descripcion: string;
    caracteristicas: string;
    costo: string;
}
export async function peticion(apiUrl: any) {
    try {
        const consulta = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!consulta.ok) {
            throw new Error("Error en la consulta");
        }
        const respuesta = await consulta.json();
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}
export default function Paginados() {
    const [active, setActive] = useState(0);
    const [planes, setPlanes] = useState<Planes[]>([]);
    const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
    const [seleccionado, setSeleccionado] = useState<Planes | undefined>(undefined);
    useEffect(() => {
        peticion(`${apiUrl}planes/public`)
            .then((data: tipoRespuesta) => {
                if (data.tipo === "success") {
                    setPlanes(data.datos)
                }
            })
    }, [])

    return (
        <>
            {
                seleccionado &&
                <MasInfo plan={seleccionado} cerrar={setSeleccionado} />
            }
            <div className={style.paginados}>
                
                <div className={style.precios}>
                    <div>
                        <h2>Planes y precios</h2>
                        <p>
                            Puedes adquirir cualquiera de nuestros planes directamente
                            por nuestra plataforma,
                            pagando por PSE, Tarjeta crédito o débito. También,
                            puedes contactar a nuestro equipo de ventas
                        </p>

                        <button onClick={() => window.open(`https://wa.me/573160993312?text=${encodeURIComponent('Hola, quiero más información sobre los servicios de LivingSoul EPS. ¿Me pueden ayudar? 🐶🐱')}`, '_blank')} className='btn'>Contacta al equipo de ventas</button>
                    </div>
                    <ul>
                        {
                            planes.map((_, index) => (
                                <li key={index} onClick={() => { setActive(index) }} className={active === index ? style.active : ''}>0{index + 1}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className={style.paginado}>
                    <ul>
                        {
                            planes.length > 0 && planes.map((plan, index) => {
                                return (
                                    <li key={index} onClick={() => { setActive(index) }} className={active === index ? style.active : ''}>
                                        <div className={style.headCard}>
                                            <span>{index + 1 < 10 ? `0${index + 1}` : index + 1} /</span>
                                            <button onClick={() => window.open(`https://wa.me/573160993312?text=${encodeURIComponent(`Hola, quiero comprar el ${plan.nombre}. ¿Me pueden ayudar? 🐶🐱`)}`, '_blank')} className='btn'>Comprar <span><IconShoppingCart size={15} stroke={2} /></span></button>
                                        </div>
                                        <h3>{plan.nombre}</h3>
                                        <ul>
                                            {
                                                JSON.parse(plan.caracteristicas).map((feature: string, indexd: number) =>
                                                    indexd <= 5 && (
                                                        <li key={indexd}>
                                                            {feature}
                                                        </li>
                                                    )
                                                )
                                            }
                                            <p onClick={()=>{setSeleccionado(plan)}} className={style.a}>Ver todas las características</p>
                                        </ul>
                                        <div className={style.price}>
                                            <p className={style.subt}>Valor mensual</p>
                                            <p className={style.value}>{Number(plan.costo).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}</p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}