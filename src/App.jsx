import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/common/Navbar';
import { Cargando } from './utils/Cargando';
import { ScrollToTop } from './hooks/ScrollTop';

const LandingPage = lazy(() => import('./components/pages/LandingPage'));

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3700);

        return () => clearTimeout(timer);
    }, []);

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
                    </Routes>
                </Suspense>
            )}
        </BrowserRouter>
    );
}

export default App;
