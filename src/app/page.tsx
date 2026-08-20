import Image from "next/image";
import styles from "./page.module.css";
import PageUno from "@/componentes/textopageuno/pageuno";
import Paginados from "@/componentes/paginados/paginados";
import ScrollSection from "@/componentes/animarseccion/animarseccion";
import Typewriter from "@/componentes/escritura/escritura";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconStarFilled } from "@tabler/icons-react";
import Comentarios from "@/componentes/comentarios/comentarios";
import Formulario from "@/componentes/formulario/formulario";
import Pisadas from "@/componentes/pisadas/pisadas";


export default function Home() {
  return (
    <main className={styles.main}>

      <section className={`${styles.seccion} ${styles.seccionslider}`}>
        <Image className={styles.logoBig} src="/logotipo.svg" alt="Logo de Living Soul" width={200} height={150} />

        <div className={styles.titulo}>
          <h1>La mejor <span> EPS</span> para <br className={styles.spansco} /> mascotas en Colombia</h1>
        </div>
        <PageUno styles={styles} />
      </section>
      <ScrollSection id="planes" activeClass={styles.activeSectionDos} className={styles.seccion}>
        <Pisadas />
        <Paginados />
      </ScrollSection>
      <ScrollSection id="informacion" activeClass={styles.activeSectionTres} className={`${styles.seccion} ${styles.seccionN}`}>
      <Pisadas />
        <div className={styles.paginaTres}>
          <div className={styles.textosTres}>
            <div>
              <em>
                ¡Pregunta por los <br /><span>descuentos por libranza!</span>
              </em>
            </div>
            <div>
              <Image className={styles.huella} src="/huellas.svg" alt="Huella de mascota" title="Huella de mascota" width={70} height={70} />
              <h2>Con nuestros planes tus amigos peluditos pueden tener acceso a servicios cómo los siguientes</h2>
            </div>
          </div>
          <div className={styles.carousel}>
            <ul>
              <li>
                <Image className={styles.fondo} src="/mas.jpg" alt="servicios veterinarios" title="servicios veterinarios" width={1000} height={667} />
                <div className={styles.desc}>
                  Muchos servicios más
                </div>
              </li>
              <li>
                <Image className={styles.fondo} src="/consultas.jpg" alt="Veterinario atendiendo mascota" title="Veterinario atendiendo mascota" width={1000} height={667} />
                <div className={styles.desc}>
                  Consultas médicas veterinarias
                </div>
              </li>
              <li>
                <Image className={styles.fondo} src="/veterinaria.png" alt="Veterinaria vacunando gato" title="Veterinaria vacunando gato" width={1000} height={667} />
                <div className={styles.desc}>
                  Vacunación y desparacitación
                </div>
              </li>
              <li>
                <Image className={styles.fondo} src="/cirugias.jpg" alt="cirugía animal" title="cirugía animal" width={1000} height={667} />
                <div className={styles.desc}>
                  Cirugías y emergencias
                </div>
              </li>
              <li>
                <Image className={styles.fondo} src="/bañado.jpg" alt="bañando un perro" title="bañando un perro" width={1000} height={667} />
                <div className={styles.desc}>
                  Baño y guarderia
                </div>
              </li>
              <li>
                <Image className={styles.fondo} src="/mas.jpg" alt="servicios veterinarios" title="servicios veterinarios" width={1000} height={667} />
                <div className={styles.desc}>
                  Muchos servicios más
                </div>
              </li>
              <li>
                <Image className={styles.fondo} src="/consultas.jpg" alt="Veterinario atendiendo mascota" title="Veterinario atendiendo mascota" width={1000} height={667} />
                <div className={styles.desc}>
                  Consultas médicas veterinarias
                </div>
              </li>
            </ul>
          </div>
        </div>
      </ScrollSection>
      <section className={`${styles.seccion} ${styles.seccionN}`}>
        <div className={styles.slider}>
          <div className={styles.tapa}></div>
          <div className={styles.encabezado}>
            <h2>
              <Typewriter typingSpeed={30} text="Mira los comentarios de nuestros clientes" />
            </h2>
            <p>
              <IconStarFilled size={20} /> <span>4.6</span>
            </p>

          </div>

          <Comentarios />

        </div>
      </section>
      <ScrollSection id="contacto" activeClass={styles.activeSectionCuatro} className={styles.seccion}>
        <div className={styles.paginaTres}>
          <div className={styles.titulos}>
            <h2>
              ¿Quieres asesoría? déjanos tus datos y te asesoraremos, dirígete al siguiente formulario y déjanos tus datos para contactarte
            </h2>
            
          </div>
          <div className={styles.form}>
            <div>
              <Image className={styles.perrofeliz} src="/perrofeliz.png" alt="Mascotas felices" title="Mascotas felices" width={1000} height={1000} />

              <strong>Síguenos en redes sociales</strong>
              <ul>
                <li><a href="https://www.instagram.com/livingsouleps?igsh=MTd6djVtbWZ5aTV1Nw=="><IconBrandTiktok /></a></li>
                <li><a href="https://www.instagram.com/livingsouleps?igsh=MTd6djVtbWZ5aTV1Nw=="><IconBrandInstagram /></a></li>
                <li><a href="https://www.instagram.com/livingsouleps?igsh=MTd6djVtbWZ5aTV1Nw=="><IconBrandFacebook /></a></li>
              </ul>
            </div>
            <div className={styles.formu}>
              <h3>Formulario de contacto</h3>
              <Formulario />
            </div>
          </div>
        </div>

      </ScrollSection>
    </main>
  );
}
