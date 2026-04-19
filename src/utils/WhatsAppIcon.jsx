import { IconoWhatsApp } from '../assets/icons/Whatsapp';

export const WhatsAppIcon = () => {
    const encoded = encodeURIComponent('Haz click para chatear con por WhatsApp');
    const phone = '+528128797121';
    const link = `https://wa.me/${phone}?text=${encoded}`;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-whatsapp"
            aria-label="Haz click para chatear con por WhatsApp"
            data-cta="whatsapp-btn"
        >
            <IconoWhatsApp className="icono-whatsapp" />
        </a>
    );
};
