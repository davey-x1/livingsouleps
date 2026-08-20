"use client";

import { useState } from "react";
import style from "./paginados.module.css";
import { IconShoppingCart } from "@tabler/icons-react";
import MasInfo from "./masinfo";
import { Plan, planes } from "@/data/planes";

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
    const [seleccionado, setSeleccionado] = useState<Plan | undefined>(
        undefined
    );

    return (
        <>
            {seleccionado && (
                <MasInfo
                    plan={seleccionado}
                    cerrar={setSeleccionado}
                />
            )}

            <div className={style.paginados}>
                <div className={style.precios}>
                    <div>
                        <h2>Planes y precios</h2>

                        <p>
                            Puedes adquirir cualquiera de nuestros planes directamente
                            por nuestra plataforma, pagando por PSE, tarjeta de crédito
                            o débito. También puedes contactar a nuestro equipo de ventas.
                        </p>

                        <button
                            onClick={() =>
                                window.open(
                                    `https://wa.me/573160993312?text=${encodeURIComponent(
                                        "Hola, quiero más información sobre los servicios de LivingSoul EPS. ¿Me pueden ayudar? 🐶🐱"
                                    )}`,
                                    "_blank"
                                )
                            }
                            className="btn"
                        >
                            Contacta al equipo de ventas
                        </button>
                    </div>

                    <ul>
                        {planes.map((_, index) => (
                            <li key={index} onClick={() => setActive(index)}
                                className={
                                    active === index ? style.active : ""
                                }>
                                {index + 1 < 10
                                    ? `0${index + 1}`
                                    : index + 1}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={style.paginado}>
                    <ul>
                        {planes.map((plan, index) => (
                            <li
                                key={plan.id}
                                onClick={() => setActive(index)}
                                className={
                                    active === index ? style.active : ""
                                }
                            >
                                <div className={style.headCard}>
                                    <span>
                                        {index + 1 < 10
                                            ? `0${index + 1}`
                                            : index + 1}{" "}
                                        /
                                    </span>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            window.open(
                                                `https://wa.me/573160993312?text=${encodeURIComponent(
                                                    `Hola, quiero comprar el ${plan.nombre}. ¿Me pueden ayudar? 🐶🐱`
                                                )}`,
                                                "_blank"
                                            );
                                        }}
                                        className="btn"
                                    >
                                        Comprar{" "}
                                        <span>
                                            <IconShoppingCart size={15} stroke={2}/>
                                        </span>
                                    </button>
                                </div>

                                <h3>{plan.nombre}</h3>

                                <p>{plan.descripcion}</p>

                                <ul>
                                    {plan.caracteristicas.map(
                                        (feature, indexd) =>
                                            indexd <= 5 && (
                                                <li key={indexd}>
                                                    {feature}
                                                </li>
                                            )
                                    )}

                                    <p
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSeleccionado(plan);
                                        }}
                                        className={style.a}
                                    >
                                        Ver todas las características
                                    </p>
                                </ul>

                                <div className={style.price}>
                                    <p className={style.subt}>
                                        Valor mensual
                                    </p>

                                    <p className={style.value}>
                                        {plan.costo.toLocaleString("es-CO", {
                                            style: "currency",
                                            currency: "COP",
                                            maximumFractionDigits: 0,
                                        })}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}