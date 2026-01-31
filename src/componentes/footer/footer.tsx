import styles from './footer.module.css'
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <strong>Contacto</strong>
                <ul>
                    <li>(602) 741 5207</li>
                    <li>316 099 3312</li>
                    <li>315 678 2160</li>
                    <li>sau@livingsouleps.com</li>
                </ul>
            </div>
            <div>
                <strong>Ubicación</strong>
                <ul>
                    <li>Popayán</li>
                    <li>Cauca</li>
                    <li>Cl 78N 19 157</li>
                </ul>
            </div>
            <div>
                <strong>Otros enlaces</strong>
                <ul>
                    <li><a href="/politicas">Políticas de privacidad</a></li>
                    <li><a href="/politicas">Información de la empresa</a></li>
                    <li><a href="/politicas">Condiciones de uso</a></li>
                </ul>
            </div>
            <div className={styles.elaborado}>
                <p>
                    &copy; {new Date().getFullYear()} Living Soul Eps Para Mascotas S.A.S, todos los derechos reservados
                </p>
                <p>
                    Elborado por <a target='_blank' href="https://andromedacrea.com">Andrómeda Crea</a>
                </p>
            </div>

        </footer>
    )
}