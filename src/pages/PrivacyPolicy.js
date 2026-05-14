import React from 'react';
import './PrivacyPolicy.scss';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-container">
            <div className="privacy-card">
                <header className="privacy-header">
                    <h1>Términos y Condiciones de Uso - Charadefy</h1>
                    <span className="updated">Última actualización: 13 Mayo 2026</span>
                </header>

                <div className="privacy-body">
                    <p>
                        Charadefy es una aplicación de entretenimiento en la que los usuarios deben adivinar
                        palabras mediante gestos. Al utilizar la aplicación, aceptas los siguientes términos:
                    </p>

                    <h3>Uso de la App</h3>
                    <p>La app es solo para fines recreativos y personales.</p>

                    <h3>Privacidad</h3>
                    <p>No recolectamos información personal ni almacenamos datos sensibles.</p>

                    <h3>Responsabilidad</h3>
                    <p>
                        El uso de la app es bajo tu propio riesgo. No nos responsabilizamos por lesiones o mal
                        uso.
                    </p>

                    <h3>Propiedad Intelectual</h3>
                    <p>Todos los derechos sobre el contenido de la app pertenecen a su creador.</p>

                    <h3>Cambios</h3>
                    <p>Podemos actualizar estos términos en cualquier momento sin previo aviso.</p>

                    <h3>Contacto</h3>
                    <p>Para más información, puedes contactar a: <a href="mailto:soporte@rafaelacosta.cl">soporte@rafaelacosta.cl</a></p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
