import PropTypes from 'prop-types';
import { RedesData } from './RedesData';

export const Redes = ({ dataLinkPrefix }) => {
    return (
        <div className="redes-container">
            {RedesData.map((red) => (
                <a
                    key={red.id}
                    href={red.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={red.ariaLabel}
                    data-link={`${dataLinkPrefix}-${red.id}-link`}
                >
                    <img src={red.img} alt={red.alt} loading="lazy" decoding="async" />
                </a>
            ))}
        </div>
    );
};

Redes.propTypes = {
    dataLinkPrefix: PropTypes.string,
};
