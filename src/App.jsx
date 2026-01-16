import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/common/Navbar';
import { Cargando } from './utils/Cargando';
import { ScrollToTop } from './hooks/ScrollTop';
import { Footer } from './components/common/Footer';

const LandingPage = lazy(() => import('./components/pages/LandingPage'));
const PoliticasPage = lazy(() => import('./components/pages/PoliticasPage'));

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3700);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [loading]);

    return (
        <BrowserRouter basename="kike-dentista-1-1.0">
            <ScrollToTop />

            <Navbar />

            {loading ? (
                <main className="cargando">
                    <Cargando />
                </main>
            ) : (
                <Suspense
                    fallback={
                        <main className="cargando">
                            <Cargando />
                        </main>
                    }
                >
                    <Routes>
                        <Route path="/" element={<LandingPage />}></Route>
                        <Route path="/politica-privacidad" element={<PoliticasPage />}></Route>
                    </Routes>
                </Suspense>
            )}

            <Footer />
        </BrowserRouter>
    );
}

export default App;
