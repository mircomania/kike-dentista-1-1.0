import { TitleSEO } from '../../utils/TitleSEO';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Banner } from '../exports/Banner';
import { SectionLp1 } from '../exports/SectionLp1';
import { SectionLp2 } from '../exports/SectionLp2';
import { SectionLp3 } from '../exports/SectionLp3';
import { SectionLp4 } from '../exports/SectionLp4';
import { Cursos } from '../exports/Cursos';
import { SectionLp5 } from '../exports/SectionLp5';

const LandingPage = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                const offsetTop = element.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth',
                });
            }
        }
    }, [location]);

    return (
        <main>
            <TitleSEO
                title="Doctora Stefany Quintero | Ortodoncia"
                description="Consultorio dental en Monterrey con atención integral, ortodoncia y tratamientos especializados, enfocados en salud, estética y bienestar."
                canonical="https://doctoratefy.com.mx/"
            />

            <Banner />

            <SectionLp1 />

            <section id="servicios">
                <SectionLp2 />
            </section>

            <section id="nosotros">
                <SectionLp3 />
            </section>

            <SectionLp5 />

            <Cursos />

            <section id="contacto">
                <SectionLp4 />
            </section>
        </main>
    );
};

export default LandingPage;
