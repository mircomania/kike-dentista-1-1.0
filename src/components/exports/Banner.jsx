import styles from '../../styles/modules/banner.module.css';
import { useEffect, useState } from 'react';

export const Banner = () => {
    const [banners, setBanners] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/banner')
            .then((res) => res.json())
            .then((data) => setBanners(data))
            .catch((err) => console.error(err));
    }, []);

    if (!banners || banners.length === 0) return null;

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
