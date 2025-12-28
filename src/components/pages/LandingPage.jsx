import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { SectionLp1 } from '../exports/SectionLp1';
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
            <SectionLp1 />
        </main>
    );
};

export default LandingPage;
