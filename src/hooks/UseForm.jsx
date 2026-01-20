import { useState, useCallback, useEffect } from 'react';

let SwalPromise;

const loadSwal = () => {
    if (!SwalPromise) {
        SwalPromise = import('sweetalert2').then((m) => m.default);
    }
    return SwalPromise;
};

export const useForm = (initialState, { onSuccess = () => {}, onError = () => {} } = {}) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [utmParams, setUtmParams] = useState({});

    useEffect(() => {
        const DAYS_TO_EXPIRE = 15;
        const MS_IN_ONE_DAY = 1000 * 60 * 60 * 24;
        const now = Date.now();

        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source') || '';
        const utmMedium = urlParams.get('utm_medium') || '';
        const utmCampaign = urlParams.get('utm_campaign') || '';

        const storedData = localStorage.getItem('utmParams');

        if (utmSource || utmMedium || utmCampaign) {
            // Nuevos UTM encontrados → guardar en localStorage con timestamp
            const newParams = { utmSource, utmMedium, utmCampaign, timestamp: now };
            localStorage.setItem('utmParams', JSON.stringify(newParams));
            setUtmParams(newParams);
        } else if (storedData) {
            // No hay en URL → recuperar de localStorage
            const parsedData = JSON.parse(storedData);
            const ageInDays = (now - parsedData.timestamp) / MS_IN_ONE_DAY;

            if (ageInDays <= DAYS_TO_EXPIRE) {
                setUtmParams(parsedData);
            } else {
                // Expirado → eliminar
                localStorage.removeItem('utmParams');
            }
        }
    }, []);

    const showAlert = useCallback(async (title, message, icon, color) => {
        const Swal = await loadSwal();

        await Swal.fire({
            title,
            html: `<div class="futura-light"><p>${message}</p></div>`,
            icon,
            confirmButtonColor: color,
            scrollbarPadding: false,
            customClass: {
                title: 'futura-bold',
            },
            willOpen: () => {
                document.body.style.overflow = 'auto';
            },
            willClose: () => {
                document.body.style.overflow = 'auto';
            },
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        setErrors((prev) => {
            const { [name]: removed, ...rest } = prev;
            return rest;
        });
    };

    const validateForm = () => {
        const newErrors = {};

        validateNombre(newErrors);

        validateEmail(newErrors);

        validateTelefono(newErrors);

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateNombre = (newErrors) => {
        if (!formData.nombre.trim()) {
            newErrors.nombre = true;
        }
    };

    const validateEmail = (newErrors) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = true;
        }
    };

    const validateTelefono = (newErrors) => {
        const isValidPhone = /^\+(52|1)\d{10}$/.test(formData.telefono);

        if (!isValidPhone) {
            newErrors.telefono = true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            const utmWithoutTimestamp = (({ timestamp, ...rest }) => rest)(utmParams);

            const formDataToSend = {
                nombre: formData.nombre,
                telefono: formData.telefono,
                email: formData.email,
                comentario: formData.comentario,
                ...utmWithoutTimestamp,
            };
            //'http://localhost:5000/submit | http://localhost:5000/api/submit'
            const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataToSend),
            });

            const data = await response.json();

            if (response.ok) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: 'formulario_enviado' });
                onSuccess(data);
                resetForm();
            } else {
                onError(data);
            }
        } catch (error) {
            onError(false, error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            ...initialState,
            telefono: '+52',
        });
    };

    return { formData, errors, loading, handleChange, handleSubmit, showAlert };
};
