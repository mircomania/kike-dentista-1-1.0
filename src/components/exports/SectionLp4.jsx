import styles from '../../styles/modules/sectionLp4.module.css';

export const SectionLp4 = () => {
    const mapsQuery = encodeURIComponent('Delta, Del Hospital, Sertoma, 64718 Monterrey, N.L., México');
    const iframeSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

    return (
        <section className={styles.sectionContainer}>
            <div className={`${styles.textosContainer} futura-light`}>
                <div className={styles.texto}>
                    <h2 className="abigral-bold">Dirección</h2>

                    <p className="futura-light">
                        Edificio Delta, Piso 5, Consultorio 502 <br /> Calle Del Hospital, Sertoma, <br /> C.P 64718 <br /> Monterrey, N.L.
                    </p>
                </div>

                <div className={styles.texto}>
                    <h2 className="abigral-bold">Horarios de Atención</h2>

                    <p>
                        Lunes a Viernes <br /> 9:00 a.m. a 6:00 p.m.
                    </p>

                    <p>
                        Sábados <br /> 9:00 a.m. a 1:00 p.m.
                    </p>
                </div>
            </div>

            <div className={styles.mapContainer} aria-hidden="false" title="Mapa — Doctora Stefany Quintero Ortodoncia">
                <iframe
                    src={iframeSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de ubicación de Doctora Stefany Quintero Ortodoncia"
                />

                <p className="futura-light">
                    <a href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`} target="_blank" rel="noopener noreferrer">
                        Abrir en Google Maps
                    </a>
                </p>
            </div>
        </section>
    );
};
