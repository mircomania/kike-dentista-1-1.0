import styles from '../../styles/modules/sectionLp3.module.css';

import img from '../../assets/images/img-section-lading-1.jpg';

import { TextosNosotrosLp } from '../../utils/TextosNosotrosLp';

export const SectionLp3 = () => {
    return (
        <section className={styles.sectionContainer}>
            <header>
                <h2 className="abigral-bold">¿Quién soy?</h2>
            </header>

            <div className={styles.sectionContenido}>
                <img src={img} alt="Doctora Stefany Quintero" />

                <div className={styles.textosContainer}>
                    {TextosNosotrosLp.map((texto) => (
                        <p key={texto.id} className="futura-light">
                            {texto.texto}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
};
