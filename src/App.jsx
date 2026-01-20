import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar } from './components/common/Navbar';
import { Cargando } from './utils/Cargando';
import { Footer } from './components/common/Footer';

import { ScrollToTop } from './hooks/ScrollTop';

const LandingPage = lazy(() => import('./components/pages/LandingPage'));
const PoliticasPage = lazy(() => import('./components/pages/PoliticasPage'));

function App() {
    return (
        <>
            <ScrollToTop />

            <Navbar />
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

            <Footer />
        </>
    );
}

export default App;
