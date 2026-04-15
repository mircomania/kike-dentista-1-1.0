import styles from '../../styles/modules/banner.module.css';
import { useEffect, useState } from 'react';

export const Banner = () => {
    const [banners, setBanners] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('/api/banner')
            .then(async (res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(setBanners)
            .catch((err) => {
                console.error('Banner error:', err);
                setError(true);
            });
    }, []);

    if (error) return null;
    if (!banners) return null;
    if (banners.length === 0) return null;

    const bannerWeb = banners.find((b) => b.promo === 'web');
    const bannerMovil = banners.find((b) => b.promo === 'movil');

    const fallback = bannerWeb?.url || bannerMovil?.url;
    if (!fallback) return null;

    return (
        <div className={styles.banner}>
            <picture>
                {bannerMovil && <source media="(max-width: 575px)" srcSet={bannerMovil.url} />}

                <img src={fallback} alt="Banner promoción" />
            </picture>
        </div>
    );
};
