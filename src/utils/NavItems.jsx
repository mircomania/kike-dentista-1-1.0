import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useNavActions } from '../hooks/useNavActions';

export const NavItems = ({ item, dataLink, dataCta, onAfterNavigate }) => {
    const { handleNavigation, isAnchorActive } = useNavActions();

    const handleClick = (e) => {
        handleNavigation(e, item);
        onAfterNavigate?.();
    };

    const commonProps = {
        title: item.title,
        ...(dataLink && { 'data-link': dataLink }),
        ...(dataCta && { 'data-cta': dataCta }),
        onClick: handleClick,
    };

    if (item.type === 'anchor') {
        return (
            <a
                href={item.to}
                className={isAnchorActive(item) ? 'active' : ''}
                {...commonProps}
                aria-current={isAnchorActive(item) ? 'page' : undefined}
            >
                {item.label}
            </a>
        );
    }

    return (
        <NavLink to={item.to} {...commonProps}>
            {item.label}
        </NavLink>
    );
};

NavItems.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.oneOf(['route', 'anchor']).isRequired,
        to: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        title: PropTypes.string,
    }).isRequired,
    dataLink: PropTypes.string,
    dataCta: PropTypes.string,
    onAfterNavigate: PropTypes.func,
};
