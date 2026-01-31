"use client"
import { IconBrandWhatsapp } from "@tabler/icons-react"
import styles from "./what.module.css"

export default function Whatsapp() {
    return (
        <button
            className={styles.whatsapp}
            onClick={() => window.open(`https://wa.me/573160993312?text=${encodeURIComponent('Hola, quiero más información sobre los servicios de LivingSoul EPS. ¿Me pueden ayudar? 🐶🐱')}`, '_blank')}
            aria-label="Enviar mensaje a whatsapp"
        >
            <span>
                <IconBrandWhatsapp />
            </span>
        </button>
    )
}