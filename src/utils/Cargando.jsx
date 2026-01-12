import logo from '../assets/images/logo-negro-bi-3.png';

export const Cargando = () => {
    return (
        <div className="cargando-container">
            <img src={logo} alt="Logotipo de Doctora Stefany Quintero Ortodoncia" />

            <p className="futura-light typing">Cargando...</p>
        </div>
    );
};
