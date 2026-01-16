import { useState } from 'react';

import styles from '../../styles/modules/form.module.css';

import { useForm } from '../../hooks/UseForm';

import { Spinner } from '../../assets/icons/Spinner';

import PhoneInput from 'react-phone-input-2';

export const Form = () => {
    const [hideErrorOnFocus, setHideErrorOnFocus] = useState({});

    const handleFocusRemoveError = (field) => {
        setHideErrorOnFocus((prev) => ({
            ...prev,
            [field]: true,
        }));
    };

    const [showPhoneUI, setShowPhoneUI] = useState(false);

    const { formData, errors, loading, handleChange, handleSubmit, showAlert } = useForm(
        {
            nombre: '',
            telefono: '',
            email: '',
            comentario: '',
        },
        (success, data) => {
            if (success) {
                showAlert('Excelente', 'Datos enviados correctamente.<br>Pronto nos pondremos en contacto contigo.', 'success', '#112c43');
            } else {
                showAlert('Ups', 'Hubo un error al enviar los datos.', 'error', '#ac3150');
            }
        }
    );

    return (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.inputsContainer}>
                {/* NOMBRE Y APELLIDO */}
                <div className={styles.inputContainer}>
                    <label htmlFor="nombre" className={`futura-light ${errors.nombre ? styles.labelError : ''}`}>
                        Nombre y apellido
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        aria-invalid={!!errors.nombre}
                    />
                </div>

                {/* TELEFONO */}
                <div className={styles.inputContainer}>
                    <label htmlFor="telefono" className={`futura-light ${errors.telefono ? styles.labelError : ''}`}>
                        Teléfono
                    </label>
                    <PhoneInput
                        country={showPhoneUI ? 'mx' : null}
                        value={formData.telefono}
                        onFocus={() => {
                            setShowPhoneUI(true);
                            handleFocusRemoveError('telefono');
                        }}
                        onChange={(phone) => {
                            const formatted = phone ? `+${phone}` : '';
                            handleChange({ target: { name: 'telefono', value: formatted } });
                        }}
                        inputClass={`${styles.input} ${errors.telefono && !hideErrorOnFocus.telefono ? styles.errorInput : ''}`}
                        containerClass={showPhoneUI ? 'phone-visible' : 'phone-hidden'}
                        inputProps={{
                            name: 'telefono',
                            required: true,
                            autoComplete: 'tel',
                            id: 'telefono',
                            placeholder: '',
                            'aria-invalid': !!errors.telefono,
                        }}
                        enableSearch
                        preferredCountries={['mx', 'us']}
                    />
                </div>

                {/* EMAIL */}
                <div className={styles.inputContainer}>
                    <label htmlFor="email" className={`futura-light ${errors.email ? styles.labelError : ''}`}>
                        Correo electronico
                    </label>
                    <input
                        type="email"
                        className={styles.input}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        aria-invalid={!!errors.email}
                    />
                </div>

                {/* COMENTARIO */}
                <div className={styles.inputContainer}>
                    <label htmlFor="comentario" className="futura-light">
                        Algún comentario adicional
                    </label>
                    <textarea
                        className={styles.input}
                        name="comentario"
                        id="comentario"
                        value={formData.comentario}
                        onChange={handleChange}
                        rows="5"
                    />
                </div>
            </div>

            {/* BOTON ENVIAR */}
            <div className={styles.contentEnvio}>
                <button type="submit" className="boton-2 alliance-text" disabled={loading}>
                    {loading ? <Spinner size={22} color="var(--white-color)" strokeWidth={3} speed={1} /> : 'Enviar'}
                </button>
            </div>

            {Object.keys(errors).length > 0 && (
                <div className={styles.mensajeErrorGeneral}>
                    <p className="futura-light">Por favor completa el formulario</p>
                </div>
            )}
        </form>
    );
};
