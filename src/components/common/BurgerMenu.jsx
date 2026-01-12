import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { BurgerIcon } from '../../assets/icons/BurgerIcon';

import logo from '../../assets/images/logo-negro-bi-2.png';

import { navLinks } from '../../utils/NavBarMenu';

export const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const menuRef = useRef(null);

    /* ABRIR Y CERRAR MENU PRINCIPAL */
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    /* CERRAR MENU SI SE CLIQUEA FUERA */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    /* DESPLASARSE POR LAS SECTIONS DE LA LANDING */
    const handleLinkClick = (e, link) => {
        e.preventDefault();

        if (location.pathname === '/') {
            const targetElement = document.querySelector(link.to);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth',
                });
            }
        } else {
            navigate(`/${link.to}`);
        }

        toggleMenu();
    };

    /* DESPLASARSE AL TOP O A INICIO SI SE LE DA CLICK A INICIO */
    const handleInicioClick = (e) => {
        e.preventDefault();

        if (location.pathname === '/') {
            const topElement = document.querySelector('#inicio') || document.body;
            topElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/#inicio');
        }

        toggleMenu();
    };

    /* BLOQUEAR EL SCROLL DEL BODY */
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <div className="burger-menu" ref={menuRef}>
            {/* ICONO */}
            <div className={`burger-menu-container ${isOpen ? 'open' : ''}`}>
                <BurgerIcon onClick={toggleMenu} className="burger-menu-icon" aria-label="Abrir menú de navegación" />
            </div>

            {/* CONTENEDOR LISTA */}
            <div className={`mobile-nav-menu ${isOpen ? 'open' : ''}`}>
                {/* LISTA  */}
                <ul className="burger-menu-nav futura-light">
                    {navLinks.map((link) => (
                        <div className="link-container" key={link.id}>
                            <li>
                                {(() => {
                                    /* LINK INICIO DESPLAZABLE POR LANDING O NAVEGABLE POR OTRAS PESTAÑAS  */
                                    if (link.id === 'inicio') {
                                        return (
                                            <a href="/" onClick={handleInicioClick} title={link.title}>
                                                {link.label}
                                            </a>
                                        );
                                    } else if (link.to.startsWith('#')) {
                                        /* LINKS GENERALES DESPLAZABLE POR LANDING O NAVEGABLE POR OTRAS PESTAÑAS  */
                                        return (
                                            <a href={link.to} onClick={(e) => handleLinkClick(e, link)} title={link.title}>
                                                {link.label}
                                            </a>
                                        );
                                    } else {
                                        /* LINKS NAVEGABLES A OTRAS PESTAÑAS  */
                                        return (
                                            <NavLink to={link.to} onClick={toggleMenu} title={link.title} data-link={link.dataLink}>
                                                {link.label}
                                            </NavLink>
                                        );
                                    }
                                })()}
                            </li>
                        </div>
                    ))}
                </ul>

                {/* LOGO  */}
                <img src={logo} alt="Logotipo de Doctora Stefany Quintero Ortodoncia" loading="lazy" decoding="async" />
            </div>
        </div>
    );
};
