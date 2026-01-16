import PropTypes from 'prop-types';
import styles from '../../styles/modules/spinner.module.css';

export const Spinner = ({ size = 24, color = 'currentColor', strokeWidth = 3, speed = 1 }) => {
    return (
        <svg
            className={styles.spinner}
            width={size}
            height={size}
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            style={{ '--spinner-speed': `${speed}s` }}
        >
            <circle className={styles.path} cx="25" cy="25" r="20" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
    );
};

Spinner.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    strokeWidth: PropTypes.number,
    speed: PropTypes.number,
};
