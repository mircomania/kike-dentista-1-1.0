import styles from '../../styles/modules/sectionLp1.module.css';

import img from '../../assets/images/img-section-lp-1.webp';

import { Form } from '../form/Form';

export const SectionLp1 = () => {
    return (
        <section className={styles.sectionContainer}>
            <div className={styles.sectionContenido}>
                <div className={styles.sectionTexto}>
                    <h1 className="abigral-bold">Ortodoncia</h1>

                    <h2 className="futura-light">Dra. Stefany Quintero</h2>

                    <p className="futura-light">Odontología más allá de los dientes, enfocada al bienestar integral del paciente.</p>
                </div>

                <img src={img} alt="Doctora Stefany Quintero" />
            </div>

            <div className={styles.formContainer}>
                <Form />
            </div>
        </section>
    );
};
