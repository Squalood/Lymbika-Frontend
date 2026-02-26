export default function PrivacidadPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
            {/* Header */}
            <div className="mb-10 border-b pb-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-1">
                    Lymbika Healthcare
                </p>
                <h1 className="text-4xl font-bold mb-2">Aviso de Privacidad</h1>
                <p className="text-sm text-gray-500">Última actualización: 23 de febrero de 2026</p>
            </div>

            {/* Intro */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-10 text-blue-900">
                <p className="font-semibold mb-1">Tu privacidad es importante</p>
                <p className="text-sm leading-relaxed">
                    Lymbika Healthcare protege tu información personal y médica. Este aviso explica cómo usamos tus datos.
                </p>
            </div>

            <div className="flex flex-col gap-10">

                {/* 1 */}
                <section>
                    <h2 className="text-xl font-bold mb-3">1. ¿Quiénes somos?</h2>
                    <p className="text-gray-700 leading-relaxed">
                        <strong>Medical Cyberphysic Platform SAPI de CV (Lymbika Healthcare)</strong><br />
                        Ciudad Juárez, Chihuahua, México<br />
                        <a href="mailto:lymbikagroup@gmail.com" className="text-primary underline">
                            lymbikagroup@gmail.com
                        </a>
                    </p>
                </section>

                {/* 2 */}
                <section>
                    <h2 className="text-xl font-bold mb-3">2. ¿Qué datos recopilamos?</h2>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="font-semibold mb-1">Información Personal</h3>
                            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                <li>Nombre, email, teléfono, dirección</li>
                                <li>Fecha de nacimiento</li>
                                <li>Identificación oficial</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Información de Salud <span className="text-red-500 text-xs">(Datos Sensibles)</span></h3>
                            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                <li>Historial clínico</li>
                                <li>Diagnósticos y tratamientos</li>
                                <li>Medicamentos y alergias</li>
                                <li>Resultados de estudios (laboratorio, rayos X, etc.)</li>
                                <li>Información de seguros médicos (opcional)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Información de Pago</h3>
                            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                <li>Datos de tarjeta (procesados de forma segura)</li>
                                <li>No almacenamos información completa de tarjetas</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 3 */}
                <section>
                    <h2 className="text-xl font-bold mb-3">3. ¿Para qué usamos tus datos?</h2>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="font-semibold mb-1">Necesario para el servicio</h3>
                            <ul className="text-gray-700 text-sm space-y-1">
                                {[
                                    "Coordinar tu atención médica",
                                    "Agendar citas y procedimientos",
                                    "Gestionar tu expediente médico (Alyus EMR)",
                                    "Procesar pagos",
                                    "Cumplir con leyes de salud",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Opcional <span className="text-gray-400 font-normal">(puedes negarte)</span></h3>
                            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                <li>Marketing y promociones</li>
                                <li>Mejorar nuestros servicios</li>
                                <li>Personalizar tu experiencia</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 4 */}
                <section>
                    <h2 className="text-xl font-bold mb-3">4. ¿Con quién compartimos tus datos?</h2>
                    <p className="text-sm text-gray-700 mb-2">Compartimos tu información <strong>solo con:</strong></p>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-4">
                        <li>Médicos que te atienden</li>
                        <li>Hospitales donde recibes atención</li>
                        <li>Laboratorios para procesar estudios</li>
                        <li>Farmacias para surtir recetas</li>
                        <li>Alyus (sistema de expediente médico)</li>
                        <li>Procesadores de pago (Stripe, PayPal)</li>
                    </ul>
                    <p className="text-sm text-gray-700 mb-2">También compartimos con:</p>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-4">
                        <li>Proveedores en Estados Unidos (servidores, servicios)</li>
                        <li>Otras jurisdicciones donde operan nuestros proveedores</li>
                    </ul>
                    <p className="text-sm font-semibold text-gray-800">
                        Nunca vendemos tus datos a terceros.
                    </p>
                </section>

                {/* 5 */}
                <section>
                    <h2 className="text-xl font-bold mb-3">5. ¿Cómo protegemos tus datos?</h2>
                    <ul className="text-gray-700 text-sm space-y-1">
                        {[
                            { icon: "🔒", text: "Cifrado de datos" },
                            { icon: "🔐", text: "Autenticación segura" },
                            { icon: "💾", text: "Respaldos regulares" },
                            { icon: "🛡️", text: "Monitoreo de amenazas" },
                            { icon: "👥", text: "Personal capacitado en privacidad" },
                        ].map(({ icon, text }) => (
                            <li key={text} className="flex items-center gap-2">
                                <span>{icon}</span> {text}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 6 */}
                <section>
                    <h2 className="text-xl font-bold mb-3">6. Tus derechos (ARCO)</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {[
                            { name: "Acceso", desc: "Ver qué datos tenemos" },
                            { name: "Rectificación", desc: "Corregir datos incorrectos" },
                            { name: "Cancelación", desc: "Eliminar tus datos" },
                            { name: "Oposición", desc: "Oponerte a ciertos usos" },
                        ].map(({ name, desc }) => (
                            <div key={name} className="border rounded-lg p-3 text-sm">
                                <p className="font-semibold">{name}</p>
                                <p className="text-gray-500">{desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-700">
                        Cómo ejercer:{" "}
                        <a href="mailto:lymbikagroup@gmail.com" className="text-primary underline">
                            lymbikagroup@gmail.com
                        </a>
                        {" "}· Respuesta en 20 días hábiles.
                    </p>
                </section>

                {/* 7 */}
                <section>
                    <h2 className="text-xl font-bold mb-3">7. Cookies</h2>
                    <p className="text-sm text-gray-700 mb-3">Usamos cookies para mejorar tu experiencia.</p>
                    <div className="flex flex-col gap-2 text-sm">
                        {[
                            { type: "Necesarias", desc: "Para que funcione la plataforma", canDisable: false },
                            { type: "Analytics", desc: "Para entender cómo usas el sitio", canDisable: true },
                            { type: "Marketing", desc: "Para mostrarte anuncios relevantes", canDisable: true },
                        ].map(({ type, desc, canDisable }) => (
                            <div key={type} className="flex items-start justify-between border rounded-lg px-4 py-3">
                                <div>
                                    <p className="font-semibold">{type}</p>
                                    <p className="text-gray-500 text-xs">{desc}</p>
                                </div>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${canDisable ? "bg-gray-100 text-gray-600" : "bg-red-50 text-red-500"}`}>
                                    {canDisable ? "Opcional" : "Requerida"}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 8 */}
                <section>
                    <h2 className="text-xl font-bold mb-3">8. Menores de edad</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        Si eres menor de 18 años, tus padres o tutor deben aprobar el uso de la plataforma.
                    </p>
                </section>

                {/* 9 */}
                <section>
                    <h2 className="text-xl font-bold mb-3">9. Transferencias internacionales</h2>
                    <p className="text-sm text-gray-700 mb-2">Tus datos pueden almacenarse en servidores en:</p>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
                        <li>México</li>
                        <li>Estados Unidos</li>
                        <li>Otros países</li>
                    </ul>
                    <p className="text-sm text-gray-700">Al usar Lymbika, aceptas estas transferencias.</p>
                </section>

                {/* 10 */}
                <section>
                    <h2 className="text-xl font-bold mb-3">10. Cambios a este aviso</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        Podemos actualizar este aviso. Te notificaremos cambios importantes.
                        Revisa periódicamente: <span className="font-medium">www.lymbika.com/privacidad</span>
                    </p>
                </section>

                {/* 11 */}
                <section>
                    <h2 className="text-xl font-bold mb-3">11. Autoridad de protección de datos</h2>
                    <p className="text-sm text-gray-700 mb-1">Si consideras que se violó tu privacidad:</p>
                    <div className="border rounded-lg p-4 text-sm text-gray-700">
                        <p className="font-semibold">INAI — Instituto Nacional de Transparencia</p>
                        <p>www.inai.org.mx</p>
                        <p>800 835 4324</p>
                    </div>
                </section>

                {/* 12 */}
                <section>
                    <h2 className="text-xl font-bold mb-3">12. Consentimiento</h2>
                    <p className="text-sm text-gray-700 mb-3">Al usar Lymbika, consientes:</p>
                    <ul className="text-gray-700 text-sm space-y-1 mb-4">
                        {[
                            "Tratamiento de tus datos personales",
                            "Tratamiento de tus datos de salud (sensibles)",
                            "Compartir con médicos y proveedores necesarios",
                            "Transferencias a Estados Unidos",
                            "Almacenamiento en Alyus EMR",
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span> {item}
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-gray-500">Puedes revocar tu consentimiento en cualquier momento.</p>
                </section>

            </div>

            {/* Footer de la página */}
            <div className="mt-12 border-t pt-8 flex flex-col gap-2 text-sm text-gray-500">
                <p>
                    <span className="font-semibold text-gray-700">Privacidad y datos: </span>
                    <a href="mailto:lymbikagroup@gmail.com" className="text-primary underline">lymbikagroup@gmail.com</a>
                </p>
                <p>
                    <span className="font-semibold text-gray-700">Soporte general: </span>
                    <a href="mailto:soporte@lymbika.com" className="text-primary underline">soporte@lymbika.com</a>
                </p>
                <p className="mt-4 text-xs">
                    © 2024-2026 Medical Cyberphysic Platform SAPI de CV (Lymbika Healthcare) · Ciudad Juárez, Chihuahua, México
                </p>
            </div>
        </main>
    );
}
