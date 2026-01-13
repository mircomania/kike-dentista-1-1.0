import { useEffect, useState } from 'react';

import logo from '../../assets/images/logo-negro-bi-1.png';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useNavActions } from '../../hooks/useNavActions';

import { BurgerMenu } from './BurgerMenu';
import { NavLinks } from '../../utils/NavLinks';
import { NavItems } from '../../utils/NavItems';

export const Navbar = () => {
    const { handleNavigation } = useNavActions();
    const [isScrolled, setIsScrolled] = useState(false);
    const isMobile = useMediaQuery('(max-width: 991px)');

    useEffect(() => {
        if (isMobile) {
            setIsScrolled(false);
            return;
        }

        const onScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [isMobile]);

    return (
        <header role="banner">
            <nav className={`navbar ${isScrolled ? 'navbar--shrink' : ''}`} aria-label="Barra de navegación principal">
                <a href="/" aria-label="Ir a inicio" data-link="navbar-logo-btn" onClick={(e) => handleNavigation(e, { to: '/' })}>
                    <img src={logo} alt="Logotipo Doctora Stefany Quintero" className="logo-navbar" />
                </a>

                {!isMobile && (
                    <ul className="menu-nav futura-light">
                        {NavLinks.map((item) => (
                            <li key={item.id}>
                                <NavItems
                                    item={item}
                                    dataLink={`footer-${item.id}-link`}
                                    dataCta={item.id === 'contacto' ? 'footer-contacto-link' : undefined}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </nav>

            {isMobile && <BurgerMenu />}
        </header>
    );
};
