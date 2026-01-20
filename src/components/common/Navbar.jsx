import { useEffect, useState } from 'react';

import logo from '../../assets/images/logo-negro-bi-1.webp';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useNavActions } from '../../hooks/useNavActions';

import { BurgerMenu } from './BurgerMenu';
import { NavLinks } from '../../utils/NavLinks';
import { NavItems } from '../../utils/NavItems';
import { Redes } from '../../utils/Redes';

export const Navbar = () => {
    const { handleNavigation } = useNavActions();
    const [isScrolled, setIsScrolled] = useState(false);
    const isMobile = useMediaQuery('(max-width: 1199px)');

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
                    <>
                        <ul className={`menu-nav ${isScrolled ? 'abigral-light' : 'abigral-bold'}`}>
                            {NavLinks.map((item) => (
                                <li key={item.id}>
                                    <NavItems
                                        item={item}
                                        dataLink={`navbar-${item.id}-link`}
                                        dataCta={item.id === 'contacto' ? 'navbar-contacto-link' : undefined}
                                    />
                                </li>
                            ))}
                        </ul>

                        <div className="navbar-redes-container">
                            <Redes dataLinkPrefix="navbar" />
                        </div>
                    </>
                )}
            </nav>

            {isMobile && <BurgerMenu />}
        </header>
    );
};
