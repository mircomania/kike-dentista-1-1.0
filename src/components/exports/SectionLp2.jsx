import styles from '../../styles/modules/sectionLp2.module.css';

import { ListaServiciosLp } from '../../utils/ListaServiciosLp';

export const SectionLp2 = () => {
    return (
        <section className={styles.sectionContainer}>
            <header>
                <h2 className="abigral-bold">Especialidades</h2>
            </header>

            <div className={styles.serviciosContainer}>
                {ListaServiciosLp.map((servicio) => (
                    <div key={servicio.id} className={styles.servicio}>
                        <img src={servicio.img} alt={servicio.alt} />

                        <h3 className="abigral-bold">{servicio.titulo}</h3>

                        <p className="futura-light">{servicio.texto}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
