import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { BurgerIcon } from '../../assets/icons/BurgerIcon';

import LogoBurger from '../../assets/images/logo.png';

import { navLinks } from '../../utils/NavBarMenu';

export const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(isOpen && window.scrollY > 0.1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOpen]);

    return (
        <div className="burger-menu" ref={menuRef}>
            {/* ICONO */}

            <BurgerIcon onClick={toggleMenu} className={`burger-menu-icon ${isScrolled && isOpen ? 'fixed' : 'absolute'}`} aria-label="Abrir menú" />

            {/* CONTENEDOR LISTA */}

            <div className={`mobile-nav-menu ${isOpen ? 'open' : ''}`}>
                {/* LISTA  */}

                <ul className="burger-menu-nav light-text">
                    {navLinks.map((link) => (
                        <div className="link-container" key={link.id}>
                            <li>
                                {(() => {
                                    if (link.id === 'inicio') {
                                        return (
                                            <a href="/" onClick={handleInicioClick} title={link.title}>
                                                {link.label}
                                            </a>
                                        );
                                    } else if (link.to.startsWith('#')) {
                                        return (
                                            <a href={link.to} onClick={(e) => handleLinkClick(e, link)} title={link.title}>
                                                {link.label}
                                            </a>
                                        );
                                    } else {
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

                <div className="container-bajo-mobile">
                    {/* LOGO  */}

                    <div className="logo-mobile-menu">
                        <img src={LogoBurger} alt="Logotipo de Method Lab" loading="lazy" decoding="async" />
                    </div>
                </div>
            </div>
        </div>
    );
};
