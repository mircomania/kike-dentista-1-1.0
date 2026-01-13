import logo from '../../assets/images/logo-negro-bi-2.png';
import { NavLink } from 'react-router-dom';

import { NavLinks } from '../../utils/NavLinks';
import { NavItems } from '../../utils/NavItems';
import { Redes } from '../../utils/Redes';
import { useNavActions } from '../../hooks/useNavActions';

export const Footer = () => {
    const { handleNavigation } = useNavActions();

    return (
        <footer role="contentinfo" className="footer" aria-label="Navegación pie de página">
            <div className="contenido-footer">
                <div className="footer-redes-container">
                    <a href="/" aria-label="Ir a la página de inicio" data-link="footer-logo-btn" onClick={(e) => handleNavigation(e, { to: '/' })}>
                        <img src={logo} alt="Logotipo de Doctora Stefany Quintero Ortodoncia en el pie de página" className="logo-footer" />
                    </a>

                    <Redes dataLinkPrefix="footer" />
                </div>

                <nav className="nav-footer">
                    <ul className="abigral-light">
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
                </nav>
            </div>

            <div className="utils-footer futura-light">
                <p>All right reserved.</p>

                <div className="utils-nav">
                    <NavLink to="/politica-privacidad" title="Ver la política de privacidad" data-link="footer-politica-link">
                        Política de Privacidad
                    </NavLink>
                </div>
            </div>
        </footer>
    );
};
