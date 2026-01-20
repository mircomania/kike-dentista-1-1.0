import styles from '../../styles/modules/politicasPage.module.css';

import logo from '../../assets/images/logo-negro-bi-2.png';

import { NavLink } from 'react-router-dom';

import { BotonNav } from '../../utils/BotonNav';

const POLITICAS_LINK = (
    <NavLink to="/" title="ir a doctoratefy.com.mx" data-link="politicas-home-link">
        Stefany Quintero Ortodoncia
    </NavLink>
);

export const SectionPp1 = () => {
    return (
        <section className={styles.sectionContainer}>
            <header className={styles.sectionTitulo}>
                <img src={logo} alt="Logotipo de Stefany Quintero Ortodoncia" />

                <h1 className="abigral-bold">Política de privacidad</h1>

                <h2 className="abigral-bold">doctoratefy.com.mx</h2>
            </header>

            <div className={`${styles.sectionContenido} futura-light`}>
                <p>
                    En nuestro compromiso por proteger su privacidad, {POLITICAS_LINK} siempre reconoce la importancia de mantener muy segura la
                    información personal que recopilamos. Por esta razón, hemos desarrollado esta política de privacidad para poder explicar cómo
                    recopilamos, usamos, compartimos y protegemos la información que usted nos proporciona cuando nos visita en nuestro sitio web{' '}
                    {POLITICAS_LINK}. Nosotros recopilamos información personal como su nombre, correo electrónico, número de teléfono y otros cuantos
                    datos relevantes para poder brindarle siempre un mejor servicio y experiencia de usuario en {POLITICAS_LINK}. Esta información
                    será utilizada para identificarlo y contactarlo en caso de ser necesario, así como para personalizar nuestros servicios según sus
                    necesidades y preferencias a través de {POLITICAS_LINK}.
                </p>

                <p>
                    En {POLITICAS_LINK}, no compartimos ni vendemos su información personal a terceros sin su consentimiento previo, excepto en el/los
                    casos en que sea necesario para cumplir con las leyes y regulaciones aplicables a MX. Además, hemos implementado una infinidad de
                    medidas de seguridad para proteger la información personal de los accesos no autorizados, alteración, divulgación y/o destrucción,
                    así aseguramos que su privacidad esté siempre protegida en {POLITICAS_LINK}.
                </p>

                <p>
                    El acceso a la información personal en {POLITICAS_LINK} está restringido solo a personal autorizado bajo muy estrictos
                    procedimientos de seguridad. Además, en {POLITICAS_LINK}, siempre se utilizan tecnologías avanzadas de encriptación y protocolos
                    de seguridad optimos para asegurar la protección de sus datos en todo momento. Nos aseguramos de que toda la información
                    proporcionada a través del sitio {POLITICAS_LINK} esté resguardada contra cualquier amenaza y accesos no autorizados.
                </p>

                <p>
                    En {POLITICAS_LINK}, hacemos uso de cookies y tecnologías similares para mejorar su experiencia de navegación, personalizar el
                    contenido que ve, y analizar el tráfico del sitio. Las cookies nos permiten reconocer su dispositivo y poder mejorar la
                    funcionalidad del sitio. Puede configurar su navegador para rechazar las cookies o para alertarle cuando se envíen, aunque esto
                    puede afectar algunas de las características de {POLITICAS_LINK}.
                </p>

                <p>
                    Si desea ejercer sus derechos de acceso, rectificación, cancelación u oposición sobre su información personal, puede hacerlo en
                    cualquier momento, solo tiene que enviar un mensaje a nuestro equipo profecional de servicio al cliente vía WhatsApp o a través
                    del formulario de contacto que esta disponible en el sitio {POLITICAS_LINK}.
                </p>

                <p>
                    En {POLITICAS_LINK}, nos aseguraremos de cumplir siempre con todas las leyes y regulaciones de privacidad aplicables, trabajamos
                    para mantener su confianza al proteger sus datos personales. Nos comprometemos a revisar y actualizar regularmente todas nuestras
                    prácticas de privacidad para estar al día con los estándares de seguridad y protección de sus datos. Si detectamos cambios
                    importantes en nuestra política, se lo notificaremos por medio del sitio web {POLITICAS_LINK}.
                </p>

                <p>
                    Nuestro compromiso con su privacidad es muy importante para nuestro equipo en {POLITICAS_LINK}, por lo que siempre nos
                    aseguraremos de que todos los empleados y proveedores de servicios comprendan y cumplan con todas las políticas de privacidad. Si
                    tiene alguna pregunta o inquietud con respecto a estas políticas, no dude en ponerse en contacto con nosotros a través de todos
                    los medios disponibles en nuestro sitio web {POLITICAS_LINK}.
                </p>

                <p>
                    En {POLITICAS_LINK}, entendemos que su información personal es muy valiosa, por lo que siempre nos aseguramos de manejarla
                    teniendo el mayor cuidado y respeto. Nos esforzamos cada día por cumplir con los más altos estándares de seguridad para poder
                    evitar el acceso no autorizado a sus datos. Cada vez que usted visita {POLITICAS_LINK}, estamos comprometidos a brindarle siempre
                    la mejor experiencia en línea segura.
                </p>

                <p>
                    En {POLITICAS_LINK} también queremos asegurarnos de proporcionar una clara información sobre cómo gestionamos sus datos hoy. Si
                    usted decide optar por suscribirse a nuestros boletines o recibir comunicados, anuncios o promociones periodicas, siempre tendrá
                    la opción de cancelar esta suscripción en cualquier momento desde nuestro enlace que encontrará en dichos mensajes, con el unico
                    fin de que usted siempre controle sus preferencias de comunicación.
                </p>

                <p>
                    Cualquier cambio que podamos realizar a esta política serán siempre reflejados en el sitio {POLITICAS_LINK}. En el caso de que
                    hayan cambios significativos en el manejo de su información personal, se lo notificaremos a través de todos los medios
                    correspondientes que podamos disponer. Recuerde que puede acceder, rectificar, cancelar oponerse a cualquier mal uso de su
                    información personal en cualquier momento, utilizando todos los recursos que tenemos disponibles en {POLITICAS_LINK}.
                </p>
            </div>

            <BotonNav
                to="/"
                className="boton-2"
                ariaLabel="Ir a la página de inicio"
                title="Haz clic para ir a la página de inicio"
                dataLink="polilicas-home-btn"
            >
                IR AL INICIO
            </BotonNav>
        </section>
    );
};
