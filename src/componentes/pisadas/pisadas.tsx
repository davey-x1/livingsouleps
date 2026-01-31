import Image from 'next/image'
import styles from './pisadas.module.css'

export default function Pisadas(){
    return(
        <div className={styles.pisadas}>
            <Image className={styles.pisada} src="/huellas.svg" alt="pisada de perrito" title="pisada de perrito" width={60} height={60} />
            <Image className={styles.pisada} src="/huellas.svg" alt="pisada de perrito" title="pisada de perrito" width={60} height={60} />
            <Image className={styles.pisada} src="/huellas.svg" alt="pisada de perrito" title="pisada de perrito" width={60} height={60} />
            <Image className={styles.pisada} src="/huellas.svg" alt="pisada de perrito" title="pisada de perrito" width={60} height={60} />
            <Image className={styles.pisada} src="/huellas.svg" alt="pisada de perrito" title="pisada de perrito" width={60} height={60} />
            <Image className={styles.pisada} src="/huellas.svg" alt="pisada de perrito" title="pisada de perrito" width={60} height={60} />
        </div>
    )
}