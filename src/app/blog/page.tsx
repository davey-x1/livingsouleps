import Image from 'next/image';
import styles from './blog.module.css';
import DOMPurify from 'isomorphic-dompurify';
import Typewriter from '@/componentes/escritura/escritura';
import { Metadata } from 'next';
import Link from 'next/link';

interface tipoRespuesta {
    tipo: 'success' | 'error' | 'info';
    mensaje: string;
    datos: any;
}
interface PublicacionBlog {
    id: number;
    titulo: string;
    publicacion: string;
    fecha: Date;
    descripcion: string;
    imagendestacada: string;
}

export const metadata: Metadata = {
    title: 'El mejor blog para el cuidado de tus mascotas',
    description: 'Conoce historias, encuentra guías y tutoriales para tus mascotas y mucho más en nuestro blog'
}
export default async function Blog() {
    const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;

    const posts: PublicacionBlog[] = apiUrl && await fetch(`${apiUrl}blog/public`, {
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
            <section className={styles.seccion}>
                <div className={styles.articulo}>
                    <h1>Conoce <br /> nuestro blog</h1>
                    <p>
                        <Typewriter typingSpeed={30} text='Conoce historias de nuestros clientes, aprende sobre
                        el cuidado de tus mascotas y encuentra recursos
                        útiles para conocer más acerca de tus amigos peluditos' />
                    </p>
                    <h2>Última publicación</h2>
                    <i>{new Date(posts[0]?.fecha).toLocaleString('es-CO', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</i>
                    <article className={styles.lastArticle}>
                        <div>
                            <Image className={styles.fondo} src={`${apiUrl}images/blog/${posts[0]?.imagendestacada}`} alt="Imagen destacada de la publicación" title="Imagen destacada de la publicación" width={1000} height={600} />

                            <div className={styles.titulo}>
                                <h3>
                                    {posts[0]?.titulo}
                                </h3>
                                <p>
                                    {posts[0]?.descripcion}
                                </p>
                            </div>
                        </div>
                        <div className={styles.textPublication} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(posts[0]?.publicacion || '') }} />
                    </article>
                </div>

                <aside className={styles.publicaciones}>
                    <h3>Otras publicaciones</h3>
                    <ul>
                        {
                            posts.length > 0 ?
                                posts.map((data: PublicacionBlog, index: number) => (
                                    index > 0 && <li key={index}>
                                        <div className={styles.date}>
                                            <i>{new Date(data.fecha).toLocaleString('es-CO', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</i>
                                        </div>
                                        <p>
                                            {data.descripcion}
                                        </p>
                                        <h4>
                                            {
                                                data.titulo
                                            }
                                        </h4>
                                        <Link className={styles.vermas} href={`/blog/${data.id} ${data.titulo}`} >Ver más</Link>
                                        <Image className={styles.fondo} src={`${apiUrl}images/blog/${data.imagendestacada}`} alt="Imagen destacada de la publicación" title="Imagen destacada de la publicación" width={1000} height={600} />
                                    </li>
                                ))
                                :
                                <li>No hay publicaciones en el blog</li>
                        }
                    </ul>
                </aside>

            </section>
        </main>

    )
}