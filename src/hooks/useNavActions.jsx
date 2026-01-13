import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useNavActions = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const scrollToAnchor = useCallback((hash) => {
        const el = document.querySelector(hash);
        if (!el) return;

        const offset = 80;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (location.pathname === '/' && location.hash) {
            requestAnimationFrame(() => {
                scrollToAnchor(location.hash);
            });
        }
    }, [location.pathname, location.hash, scrollToAnchor]);

    const handleNavigation = useCallback(
        (e, item) => {
            e?.preventDefault();

            if (item.to === '/') {
                if (location.pathname === '/') scrollToTop();
                else navigate('/');
                return;
            }

            if (item.type === 'anchor') {
                if (location.pathname === '/') {
                    scrollToAnchor(item.to);
                    window.history.replaceState(null, '', item.to);
                } else {
                    navigate(`/${item.to}`);
                }
                return;
            }

            navigate(item.to);
        },
        [location.pathname, navigate, scrollToTop, scrollToAnchor]
    );

    const isAnchorActive = (item) => item.type === 'anchor' && location.pathname === '/' && location.hash === item.to;

    return {
        handleNavigation,
        isAnchorActive,
    };
};
