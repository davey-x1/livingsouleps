import { Metadata } from "next";
import styles from "./nosotros.module.css";
import Image from "next/image";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandWhatsapp } from "@tabler/icons-react";
import ScrollSection from "@/componentes/animarseccion/animarseccion";
import Typewriter from "@/componentes/escritura/escritura";
import Pisadas from "@/componentes/pisadas/pisadas";

export const metadata: Metadata = {
    title: 'Acerca de nosotros - La eps para mascotas',
    description: 'Conoce nuestra historia, misión y valores. Descubre por qué somos líderes en el sector'
}
interface tipoRespuesta {
    tipo: 'success' | 'error' | 'info';
    mensaje: string;
    token?: string;
    datos?: any;
    otros?: any
}
interface Galeria {
    id: number;
    imagen: string;
    descripcion: string;
}
export default async function NosotrosPage() {
    const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
    const galeria: Galeria[] = apiUrl && await fetch(`${apiUrl}galeria/public`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (!response.ok) {
            return []
        }
        const respuesta = response.json()
        return respuesta
    })
        .then((data: tipoRespuesta) => {
            if (data.tipo === "success") {
                return data.datos
            } else {
                return []
            }
        })
        .catch(() => {
            return []
        })
    return (
        <main className={styles.main}>
            <ScrollSection id="nostros" activeClass={styles.activeSectionUno} className={`${styles.seccion} ${styles.seccionBackground}`}>
                <div className={styles.pisadasMovidas}>
                    <Pisadas />
                </div>
                <div className={styles.textoUno}>
                    <h1>Acerca de nosotros</h1>
                    <p>
                        <Typewriter typingSpeed={30} text="Nuestro objetivo es ofrecer tranquilidad y
                        seguridad financiera al proporcionar acceso a servicios médicos
                        veterinarios de calidad sin preocuparte por los costos imprevistos." />
                    </p>
                    <button className="btn">Contáctanos <span><IconBrandWhatsapp size={20} /></span></button>
                </div>
                <div className={styles.fondoUno}>
                    <Image className={styles.fondo} src='/grupo2.jpg' alt="Equipo de trabajo" title="Equipo de trabajo" width={2000} height={926} />
                </div>
            </ScrollSection>
            <ScrollSection id="acerca" activeClass={styles.activeSectionDos} className={`${styles.seccion} ${styles.centrada}`}>
                <div className={styles.nosotros}>
                    <div className="tapa"></div>
                    <div className={styles.contenido}>
                        <h2>¿Quienes somos?</h2>
                        <p>
                            Somos una compañía comprometida con la salud y el bienestar de tus
                            amigos peluditos. Nos dedicamos a proporcionar servicios de salud
                            de calidad y atención integral, por eso ofrecemos una amplia gama
                            de servicios y beneficios para mantener a tus peludos amigos sanos
                            y felices durante toda su vida.
                            <br />
                            Actualmente, contamos con convenios a nivel nacional con entidades como
                            secretarías de educación, gobernaciones, alcaldías, fondos de empleados
                            y empresas privadas.
                            <br />
                            <br />
                            Nuestra entidad está vigilada por la Superintendencia de Sociedades
                            y cuenta con todos los permisos establecidos por el Ministerio de
                            Hacienda y Crédito Público para descuento de nómina, bajo el Registro
                            Único de Operadores de Libranza N.º 9014215060007363,
                            según la Ley 1527 de 2012.
                        </p>
                    </div>
                    <div className={styles.redes}>
                        Conoce más en nuestras <br /> redes sociales
                        <ul>
                            <li><a href="https://www.instagram.com/livingsouleps?igsh=MTd6djVtbWZ5aTV1Nw=="><IconBrandFacebook /></a></li>
                            <li><a href="https://www.instagram.com/livingsouleps?igsh=MTd6djVtbWZ5aTV1Nw=="><IconBrandInstagram /></a></li>
                            <li><a href="https://www.instagram.com/livingsouleps?igsh=MTd6djVtbWZ5aTV1Nw=="><IconBrandTiktok /></a></li>
                        </ul>
                    </div>
                </div>
            </ScrollSection>
            <section className={styles.seccionconvenios}>
                <div className={styles.convenios}>
                    <div>
                        <h3>
                            Contamos con convenios
                            <br /> a nivel nacional
                        </h3>
                        <ul>
                            <li>Alcaldías</li>
                            <li>Secretarias de educación</li>
                            <li>Gobernaciones</li>
                            <li>Fondos de empleados</li>
                            <li>Empresas privadas</li>
                            <li>Instituciones del régimen público</li>
                        </ul>
                    </div>
                    <div className={styles.carousel}>
                        <ol>
                            <li><Image className={styles.marca} src='/marcas/1.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/2.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/3.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/4.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/5.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/6.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/7.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/8.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/9.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/10.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/11.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/12.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/13.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/14.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                            <li><Image className={styles.marca} src='/marcas/15.png' alt="Entidad con convenio" title="Entidad con convenio" width={150} height={150} /></li>
                        </ol>
                    </div>
                </div>
                <div className={styles.historias}>
                    <h2>Tenemos mucho más <br /> por contarte</h2>
                    <p>Pero, con nuestra galería de imágenes lo resumiremos</p>
                    <div className={styles.galeria}>
                        <ul>
                            {
                                galeria.length > 0 &&
                                galeria.map((imagen: Galeria, index: number) => (

                                    <li key={index}>
                                        <div>
                                            {imagen.descripcion}
                                        </div>
                                        <Image className={styles.foto} src={`${apiUrl}images/galeria/${imagen.imagen}`} alt="nuestra historia" title="nuestra historia" width={300} height={300} />
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                </div>
            </section>
            <ScrollSection id="pol" activeClass={styles.activeSectionCuatro} className={styles.seccionmini}>
                <h2>Políticas y garantías</h2>
                <ul>
                    <li>
                        <h3>Atención</h3>
                        <p>
                            Con Living Soul EPS para mascotas puedes estar completamente tranquilo,
                            porque nuestros peluditos estarán protegidos al 100%.
                        </p>
                    </li>
                    <li>
                        <h3>Garantía de calidad</h3>
                        <p>
                            Contamos con servicios médicos de la más alta calidad, con profesionales
                            calificados para brindar la atención y
                            los cuidados prioritarios que se merecen nuestros peluditos.
                        </p>
                    </li>
                    <li>
                        <h3>Política de bienestar</h3>
                        <p>
                            En la actualidad, contamos con establecimientos
                            pertenecientes a nuestra Red de Veterinarias,
                            brindando así una cobertura del 100% en el territorio nacional.
                        </p>
                    </li>
                </ul>
            </ScrollSection>
        </main>
    )
}