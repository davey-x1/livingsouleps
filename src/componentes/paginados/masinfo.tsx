import { IconShoppingCart, IconX } from "@tabler/icons-react";
import styles from "./paginados.module.css";
import { Plan } from "@/data/planes";

interface Props {
    plan: Plan;
    cerrar: (data: undefined) => void;
}

export default function MasInfo({ plan, cerrar }: Props) {
    return (
        <div className={styles.tapador} onClick={() => { cerrar(undefined); }}>
            <div onClick={(e) => e.stopPropagation()} className={styles.containerTapador}>
                <span onClick={() => { cerrar(undefined); }} className={styles.cerrar}>
                    <IconX size={22} />
                </span>

                <h3>{plan.nombre}</h3>

                <p>{plan.descripcion}</p>

                <ol>
                    {plan.caracteristicas.map((data, index) => (
                        <li key={index}>{data}</li>
                    ))}
                </ol>

                <i>Aplican términos y condiciones</i>

                <div className={styles.value}>
                    <button>
                        Comprar <span><IconShoppingCart size={20} /></span>
                    </button>

                    {plan.costo.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                    })}
                </div>
            </div>
        </div>
    );
}