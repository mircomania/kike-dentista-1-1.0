import logo from '../assets/images/logo.png';

export const Cargando = () => {
    return (
        <div className="cargando-container">
            <img src={logo} alt="Logotipo de mi Gran Evento" />

            <p className="light-text typing">Cargando...</p>
        </div>
    );
};
