"use client";

import { useState } from "react";
import styles from "./formulario.module.css"

export default function Formulario() {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [asunto, setAsunto] = useState('');

    const [mensaje, setMensaje] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [color, setColor] = useState('');

    const url = process.env.NEXT_PUBLIC_API_URL;

    const enviarDatos = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            nombre,
            telefono,
            correo,
            asunto
        }
        setEnviando(true);
        peticionApp(data)
            .then((data:any) => {
                if(data.tipo === 'success'){
                    setMensaje(data.mensaje);
                    setNombre('');
                    setTelefono('');
                    setCorreo('');
                    setAsunto('');
                    setColor('#21c021')
                }else{
                    setMensaje(data.mensaje);
                    setColor('red')
                }
            })
            .catch(() => {
                console.log("Error en la petición");
                setMensaje('No se pudieron enviar los datos, intentalo de nuevo');
                setColor('red')
            })
            .finally(()=>{
                setEnviando(false);
            })
    }

    async function peticionApp(data: any) {
        try {
            const peticion = await fetch(`${url}solicitudes/public/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!peticion.ok) {
                throw new Error("Error en la consulta");
            }
            const respuesta = await peticion.json();
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={enviarDatos} className={styles.formulario}>
            <div className={styles.inputGroup}>
                <label style={nombre.length > 0 ? { transform: 'translateY(-25px)' } : { transform: 'translateY(0)' }} htmlFor="nombre">Nombre</label>
                <input value={nombre} onChange={(e) => { setNombre(e.target.value) }} required type="text" id="nombre" />
            </div>
            <div className={styles.inputGroup}>
                <label style={telefono.length > 0 ? { transform: 'translateY(-25px)' } : { transform: 'translateY(0)' }} htmlFor="telefono">Teléfono</label>
                <input value={telefono} onChange={(e) => { setTelefono(e.target.value) }} required type="tel" id="telefono" />
            </div>
            <div className={styles.inputGroup}>
                <label style={correo.length > 0 ? { transform: 'translateY(-25px)' } : { transform: 'translateY(0)' }} htmlFor="correo">Correo</label>
                <input value={correo} onChange={(e) => { setCorreo(e.target.value) }} required type="email" id="correo" />
            </div>
            <div className={styles.inputGroup}>
                <label style={asunto.length > 0 ? { transform: 'translateY(-25px)' } : { transform: 'translateY(0)' }} htmlFor="asunto">Escribe acerca de tu solicitud</label>
                <input value={asunto} onChange={(e) => { setAsunto(e.target.value) }} required type="text" id="asunto" />
            </div>

            <div className={styles.inputCheck}>
                <input id="check" required type="checkbox" />
                <label htmlFor="check">Acepto el <a href="#">tratamiento de mis datos</a></label>
            </div>

            {
                mensaje.length > 0 &&
                <div className={styles.mensaje}>
                    <p style={{color: color}}>{mensaje}</p>
                </div>
            }

            <button type="submit" disabled={enviando} className="btn">{enviando ? <>Enviando...</> : <>Enviar datos</>}</button>
        </form>
    )
}