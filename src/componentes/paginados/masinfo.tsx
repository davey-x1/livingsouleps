import { IconShoppingCart, IconX } from "@tabler/icons-react";
import styles from "./paginados.module.css"

interface Plan {
    id: number;
    nombre: string;
    descripcion: string;
    caracteristicas: string;
    costo: string;
}
interface props{
    plan: Plan;
    cerrar: (data:any)=>void
}
export default function MasInfo({plan, cerrar}:props){
    return(
        <div className={styles.tapador} onClick={()=>{cerrar(undefined)}}>
            <div onClick={(e)=>e.stopPropagation()} className={styles.containerTapador}>
                <span onClick={()=>{cerrar(undefined)}} className={styles.cerrar}><IconX size={22} /></span>
                <h3>
                    {plan.nombre}
                </h3>
                <p>{plan.descripcion}</p>
                <ol>
                    {
                        JSON.parse(plan.caracteristicas).map((data:string, index:number)=>(
                            <li key={index}>{data}</li>
                        ))
                    }
                </ol>
                <i>Aplican términos y condiciones</i>
                <div className={styles.value}>
                    <button>Comprar <span><IconShoppingCart size={20} /></span></button>
                    {Number(plan.costo).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                </div>
                                        
            </div>
        </div>
    )
}