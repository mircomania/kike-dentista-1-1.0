import PropTypes from 'prop-types';

export const BurgerIcon = ({ size = 44, stroke = 1.2, onClick, className = '', ariaLabel = 'Menú' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`burger-icon-svg ${className}`}
            onClick={onClick}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            role="button"
            aria-label={ariaLabel}
            tabIndex="0"
            style={{
                cursor: 'pointer',
                color: 'inherit', // usa el color del texto
                display: 'inline-block',
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onClick?.(e);
            }}
        >
            <line x1="3" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
            <line x1="3" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
            <line x1="3" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
    );
};

BurgerIcon.propTypes = {
    size: PropTypes.number,
    stroke: PropTypes.number,
    onClick: PropTypes.func,
    className: PropTypes.string,
    ariaLabel: PropTypes.string,
};
