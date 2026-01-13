import { BurgerIcon } from '../../assets/icons/BurgerIcon';
import logo from '../../assets/images/logo-negro-bi-2.png';

import { NavLinks } from '../../utils/NavLinks';
import { NavItems } from '../../utils/NavItems';
import { useBurgerMenu } from '../../hooks/useBurgerMenu';

export const BurgerMenu = () => {
    const { isOpen, toggleMenu, closeMenu, menuRef } = useBurgerMenu();

    return (
        <nav className="burger-menu" aria-label="Menu de navegación móvil" ref={menuRef}>
            {/* ICONO */}
            <button
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                onClick={toggleMenu}
                className={`burger-menu-container ${isOpen ? 'open' : ''}`}
            >
                <BurgerIcon className="burger-menu-icon" aria-label="Abrir menú de navegación" />
            </button>

            {/* MENÚ */}
            <div id="mobile-menu" className={`mobile-nav-menu ${isOpen ? 'open' : ''}`}>
                <ul className="burger-menu-nav futura-light">
                    {NavLinks.map((item) => (
                        <li key={item.id} className="link-container">
                            <NavItems
                                item={item}
                                dataLink={`navbar-${item.id}-link`}
                                dataCta={item.id === 'contacto' ? 'navbar-contacto-link' : undefined}
                                onAfterNavigate={closeMenu}
                            />
                        </li>
                    ))}
                </ul>

                <img src={logo} alt="Logotipo de Doctora Stefany Quintero Ortodoncia" loading="lazy" decoding="async" />
            </div>
        </nav>
    );
};
