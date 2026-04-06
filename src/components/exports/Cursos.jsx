import styles from '../../styles/modules/cursos.module.css';
import { useEffect, useState, useRef, useMemo } from 'react';

export const Cursos = () => {
    const [cursos, setCursos] = useState([]);
    const [current, setCurrent] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [loading, setLoading] = useState(true);

    const timeoutRef = useRef(null);

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/cursos');

                if (!res.ok) {
                    throw new Error('Error al obtener cursos');
                }

                const data = await res.json();
                setCursos(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCursos();
    }, []);

    // AUTOPLAY
    useEffect(() => {
        if (!isPlaying || cursos.length < 2) return;

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % cursos.length);
        }, 10000);

        return () => clearTimeout(timeoutRef.current);
    }, [current, cursos, isPlaying]);

    const next = () => {
        setCurrent((prev) => (prev + 1) % cursos.length);
    };

    const prev = () => {
        setCurrent((prev) => (prev - 1 + cursos.length) % cursos.length);
    };

    const visibleSlides = useMemo(() => {
        if (cursos.length < 3) return cursos;

        const total = cursos.length;

        return [cursos[(current - 1 + total) % total], cursos[current], cursos[(current + 1) % total]];
    }, [cursos, current]);

    if (loading) return <div>Cargando cursos...</div>;

    if (!cursos.length) return <div>No hay cursos disponibles</div>;

    if (cursos.length === 1) {
        return (
            <div className={styles.carousel}>
                <img src={cursos[0].url} alt="Curso" className={styles.single} />
            </div>
        );
    }

    return (
        <div className={styles.carousel} onMouseEnter={() => setIsPlaying(false)} onMouseLeave={() => setIsPlaying(true)}>
            <button onClick={prev} aria-label="Anterior">
                ‹
            </button>

            <div className={styles.track}>
                {visibleSlides.map((curso, i) => {
                    const position = cursos.length < 3 ? 0 : i - 1;

                    let positionClass = '';
                    if (position === -1) positionClass = styles.left;
                    if (position === 0) positionClass = styles.center;
                    if (position === 1) positionClass = styles.right;

                    return (
                        <img
                            key={curso.curso}
                            src={curso.url}
                            alt={curso.curso}
                            className={`${styles.slide} ${positionClass}`}
                            loading="lazy"
                            decoding="async"
                        />
                    );
                })}
            </div>

            <button onClick={next} aria-label="Siguiente">
                ›
            </button>
        </div>
    );
};
