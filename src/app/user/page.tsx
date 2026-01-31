"use client"

import { useEffect, useState } from "react"
import styles from "./user.module.css"
import { peticion } from "@/componentes/paginados/paginados";
import { IconCash, IconCheck, IconX } from "@tabler/icons-react";
import Script from "next/script";

interface Clientes {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    cedula: string;
    vencimiento: Date;
    inscripcion: Date;
    informacion: string;
}
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
export default function Usuario() {
    const [cliente, setCliente] = useState<Clientes | undefined>(undefined);
    const [cedula, setCedula] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [consultando, setConsultando] = useState(false);
    const [planes, setPlanes] = useState<Planes[]>([]);
    const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
    const [obteniendo, setObteniendo] = useState(false);
    const [mensajePago, setMensajePago] = useState('');
    const [ip, setIp] = useState('');
    useEffect(() => {
        peticion(`${apiUrl}planes/public`)
            .then((data: tipoRespuesta) => {
                if (data.tipo === "success") {
                    setPlanes(data.datos)
                }
            })

        fetch("https://api64.ipify.org?format=json")
            .then((res) => res.json())
            .then((data) => {
                setIp(data.ip);
            })
            .catch((err) => console.error("Error obteniendo la IP:", err));
    }, [])
    const buscarCliente = (event: React.FormEvent) => {
        event.preventDefault();

        if (cedula.length < 5) {
            setMensaje('Completa el campo cédula');
            return
        }

        const datos = {
            cedula: cedula
        }

        buscar(`${apiUrl}clientes/public/cliente`, datos)
            .then((data: tipoRespuesta) => {
                if (data.tipo === "success") {
                    setCliente(data.datos)
                } else if (data.tipo === "info") {
                    setMensaje(`El cliente no existe, revisa que hayas escrito bien el número de cédula`)
                } else {
                    setMensaje(`Ocurrió un error, si esto persiste escribe al chat de soporte`)
                }
            })
            .catch(() => {
                setMensaje(`Ocurrió un error, si esto persiste escribe al chat de soporte`)
            })
    }

    async function buscar(apiUrl: any, datos: any) {
        try {
            const consulta = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
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

    function calcularDiferenciaDias(fecha: string | Date): number {
        const fechaActual = new Date();
        const fechaComparar = new Date(fecha);

        // Convertir ambas fechas a milisegundos y calcular la diferencia
        const diferenciaTiempo = fechaActual.getTime() - fechaComparar.getTime();

        // Convertir la diferencia de milisegundos a días
        const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));

        return diferenciaDias;
    }

    function getUserId() {
        setObteniendo(true);
        peticionEpayco()
            .then((data: tipoRespuesta) => {
                if (data.tipo === "success") {
                    if (data.datos.data.sessionId) {

                        if (typeof window !== "undefined" && (window as any).ePayco) {
                            const sessionId = data.datos.data.sessionId;
                            const handler = (window as any).ePayco.checkout.configure({
                                sessionId,
                                external: false // external: true -> para checkout externo ó External: false => para iframe onePage
                            })
                            //open checkout
                            handler.openNew()
                        }
                    } else {
                        setMensajePago('Ocurrió un error, si esto persiste escribe al chat de soporte')
                    }
                } else {
                    setMensajePago(data.mensaje)
                }
            })
            .catch((error: any) => {
                console.log(error);
                setMensajePago('Ocurrió un error, si esto persiste escribe al chat de soporte')
            })
            .finally(() => {
                setObteniendo(false);
            })
    }

    async function peticionEpayco() {
        if (cliente) {

            const peticion = await fetch(`${apiUrl}pagos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cliente: cliente, ipcliente: ip })
            })
            if (!peticion.ok) {
                setMensaje('Ocurrió un error, si esto persiste escribe al chat de soporte')
                throw new Error("Error en la consulta");
            }
            const respuesta = await peticion.json();
            return respuesta
        } else {
            setMensajePago('No se ha encontrado un cliente, por favor intenta de nuevo')
        }
    }

    return (
        <>
            <Script
                src="https://checkout.epayco.co/checkout.js"
                strategy="lazyOnload"
                onLoad={() => console.log("Script de ePayco cargado")}
            />

            <main className={styles.main}>
                <section className={styles.seccion}>
                    {
                        cliente ?
                            <>
                                <h1 style={{ textAlign: 'left' }}>
                                    ¡Hola de nuevo! 👋 {cliente.nombre}
                                </h1>
                                <div className={styles.vencio}>
                                    <span>
                                        {
                                            calcularDiferenciaDias(cliente.vencimiento) >= 0 ?
                                                <>Tu suscripción venció</>
                                                :
                                                <>Te quedan {-1 * calcularDiferenciaDias(cliente.vencimiento)} para renovar tu suscripción</>
                                        }
                                    </span>
                                </div>
                                <div className={styles.infor}>
                                    <div className={styles.plan}>
                                        <span className={styles.bola}>

                                        </span>
                                        <div className={styles.planName}>
                                            {
                                                planes.find((val: Planes) => val.id === Number(cliente.informacion))?.nombre
                                            }
                                        </div>
                                        <div className={styles.fecha}>
                                            {
                                                calcularDiferenciaDias(cliente.vencimiento) >= 0 ?
                                                    <div>
                                                        <p>Venció</p>
                                                        <small>{new Date(cliente.vencimiento).toLocaleString('es-CO', { month: 'short', day: 'numeric' })}</small>
                                                    </div>
                                                    :
                                                    <div>
                                                        <p>Vence</p>
                                                        <small>{new Date(cliente.vencimiento).toLocaleString('es-CO', { month: 'short', day: 'numeric' })}</small>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    {
                                        calcularDiferenciaDias(cliente.vencimiento) >= 0 &&
                                        <div className={styles.costo}>
                                            <div>
                                                Puedes pagar pos PSE, tajetas de crédito y débito o billeteras electrónicas
                                            </div>
                                            <div style={{ marginTop: '15px' }}>
                                                <button disabled={obteniendo} onClick={() => { getUserId() }} className={styles.pagar}>{obteniendo ? <>Obteniendo datos...</> : <>Pagar ahora</>} <span><IconCash /></span></button>
                                            </div>
                                        </div>
                                    }

                                    {
                                        mensajePago.length > 0 &&
                                        <div className={styles.costo}>
                                            <span className={styles.mensajePago}>{mensajePago}</span>
                                        </div>
                                    }

                                    <div className={styles.costo}>
                                        <div>
                                            <span>Descripción del plan</span>
                                            <span>
                                                {
                                                    planes.find((val: Planes) => val.id === Number(cliente.informacion))?.costo &&
                                                    Number(planes.find((val: Planes) => val.id === Number(cliente.informacion))?.costo).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
                                                }
                                            </span>
                                        </div>

                                        <div>
                                            <ul>
                                                {
                                                    planes.find((val: Planes) => val.id === Number(cliente.informacion))?.caracteristicas &&
                                                    JSON.parse((planes.find((val: Planes) => val.id === Number(cliente.informacion))?.caracteristicas as any)).map((data: string, index: number) => (
                                                        <li key={index}><IconCheck size={18} /> <span>{data}</span></li>
                                                    ))
                                                }
                                                <li>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </>
                            :
                            <>
                                <h1>Conoce la información de tu suscripción</h1>
                                <p>
                                    Ingresa al módulo personal usando tu número de cédula. Podrás verificar
                                    la fecha de vencimiento, tipo de plan o realizar el pago si tienes tu suscripción vencida
                                </p>
                                <form onSubmit={buscarCliente}>
                                    <div className={styles.group}>
                                        <input style={{ borderBottom: `${mensaje.length > 0 ? 'solid 1px red' : 'solid 1px var(--gris)'}` }} required value={cedula} onChange={(e) => { setCedula(e.target.value); setMensaje('') }} type="number" placeholder="Escribe tu número de cédula" />
                                    </div>
                                    {mensaje.length > 0 && <p className={styles.mensaje}>{mensaje}</p>}
                                    <button disabled={consultando} type="submit">{consultando ? <>Consultando...</> : <>Consultar</>}</button>
                                </form>
                            </>
                    }
                </section>
            </main>
        </>
    )
}