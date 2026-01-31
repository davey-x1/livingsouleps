import { Metadata } from "next";
import styles from "./pub.module.css"
import Image from "next/image";
import DOMPurify from 'isomorphic-dompurify';

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

export async function generateMetadata({ params }: any): Promise<Metadata> {
    function extractBeforeEncodedSpace(text: string): string {
        const index = text.indexOf('%20');
        return index !== -1 ? text.substring(0, index) : text;
    }
    const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
    const id = extractBeforeEncodedSpace(params.slug);
    const post: PublicacionBlog | undefined = apiUrl && await fetch(`${apiUrl}blog/public/blog`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    }).then((response) => {
        if (!response.ok) {
            return undefined
        }
        const respuesta = response.json()
        return respuesta
    })
        .then((data: tipoRespuesta) => {
            if (data.tipo === "success") {
                return data.datos
            } else {
                return undefined
            }
        })
        .catch(() => {
            return undefined
        })
    return {
        title: post?.titulo,
        description: post?.descripcion,
        openGraph: {
            title: post?.titulo,
            description: post?.descripcion,
            images: [
                {
                    url: `${apiUrl}images/blog/${post?.imagendestacada}`, // Asegúrate de que esta URL es accesible
                    width: 1000,
                    height: 600,
                    alt: post?.titulo,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post?.titulo,
            description: post?.descripcion,
            images: [`${apiUrl}images/blog/${post?.imagendestacada}`],
        },
    };
}

export default async function Publicacion({ params }: any) {
    function extractBeforeEncodedSpace(text: string): string {
        const index = text.indexOf('%20');
        return index !== -1 ? text.substring(0, index) : text;
    }
    const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
    const id = extractBeforeEncodedSpace(params.slug);
    const post: PublicacionBlog | undefined = apiUrl && await fetch(`${apiUrl}blog/public/blog`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    }).then((response) => {
        if (!response.ok) {
            return undefined
        }
        const respuesta = response.json()
        return respuesta
    })
        .then((data: tipoRespuesta) => {
            if (data.tipo === "success") {
                return data.datos
            } else {
                return undefined
            }
        })
        .catch(() => {
            return undefined
        })

    return (
        <main className={styles.main}>
            <section className={styles.seccion}>
                <div className={styles.container}>
                    <article className={styles.article}>
                        <h1>{post?.titulo}</h1>
                        <p>{post?.descripcion}</p>
                    </article>
                    <Image className={styles.fondo} src={`${apiUrl}images/blog/${post?.imagendestacada}`} alt="Imagen destacada de la publicación" title="Imagen destacada de la publicación" width={1000} height={600} />
                </div>
                <article className={styles.artf}>
                    <h2>Publicada</h2>
                    <i>{post && new Date(post.fecha).toLocaleString('es-CO', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</i>

                    <div className={styles.textPublication} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post?.publicacion || '') }} />
                </article>
            </section>
        </main>
    )
} 