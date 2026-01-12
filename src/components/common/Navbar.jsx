import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo-negro-bi-1.png';

import { useMediaQuery } from '../../hooks/UseMediaQuery';
import { BurgerMenu } from './BurgerMenu';
import { navLinks } from '../../utils/NavBarMenu';

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [activeLink, setActiveLink] = useState(navLinks[0].id);
    const [isScrolled, setIsScrolled] = useState(false);

    const isMobile = useMediaQuery('(max-width: 991px)');

    /* NAVEGACION COMPLETA DE LINKS EN LANDING Y OTRAS PESTAÑAS */
    const handleLinkClick = (e, item) => {
        e.preventDefault();
        setActiveLink(item.id);

        // ———————— INICIO ————————
        if (item.to === '/') {
            if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                navigate('/');
            }
            return;
        }

        // ————— ANCLAS EN LANDING —————
        if (item.to.startsWith('#')) {
            if (location.pathname === '/') {
                const targetEl = document.querySelector(item.to);
                if (targetEl) {
                    window.scrollTo({
                        top: targetEl.offsetTop,
                        behavior: 'smooth',
                    });
                }
            } else {
                navigate(`/${item.to}`);
            }
            return;
        }

        // ————— RUTAS COMPLETAS —————
        navigate(item.to);
    };

    /* IR AL TOP SI LE DAN CLICK AL LOGO EN EL LANDING */
    const handleLogoClick = (e) => {
        e.preventDefault();
        setActiveLink(navLinks[0].id);
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    /* DETECTAR SCROLL EN DISEÑO WEB */
    useEffect(() => {
        if (isMobile) return;

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobile]);

    return (
        <header>
            <nav className={`navbar ${isScrolled ? 'navbar--shrink' : ''}`} aria-label="Barra de navegación principal">
                {/* LOGO */}
                <a href="/" aria-label="Ir a la página de inicio" data-link="navbar-logo-btn" onClick={handleLogoClick}>
                    <img src={logo} alt="Logotipo de Doctora Stefany Quintero Ortodoncia en la barra de navegación" className="logo-navbar" />
                </a>

                {/* LINKS  */}
                {!isMobile && (
                    <ul className="menu-nav futura-light">
                        {navLinks.map((item) => (
                            <li key={item.id}>
                                {item.to.startsWith('#') || item.to === '/' ? (
                                    <a
                                        href={item.to}
                                        onClick={(e) => handleLinkClick(e, item)}
                                        className={activeLink === item.id ? 'active' : ''}
                                        title={item.title}
                                        data-link={item.dataLink}
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <NavLink
                                        to={item.to}
                                        title={item.title}
                                        className={({ isActive }) => (isActive || activeLink === item.id ? 'active' : '')}
                                        onClick={() => setActiveLink(item.id)}
                                        data-link={item.dataLink}
                                    >
                                        {item.label}
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </nav>

            {/* BURGERMENU */}
            {isMobile && <BurgerMenu />}
        </header>
    );
};
