import styles from '../../styles/modules/sectionLp1.module.css';

import img from '../../assets/images/img-section-lading-1.jpg';

import { Form } from '../form/Form';

export const SectionLp1 = () => {
    return (
        <section className={styles.sectionContainer}>
            <img src={img} alt="Doctora Stefany Quintero" />

            <div className={styles.formContainer}>
                <Form />
            </div>
        </section>
    );
};
