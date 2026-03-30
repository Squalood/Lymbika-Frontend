"use client";

const especialidades = [
  { nombre: "Medicina Familiar", href: "/especialidad/medicina-familiar", Icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></svg> },
  { nombre: "Pediatría", href: "/especialidad/pediatria", Icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><circle cx="12" cy="8" r="3.5"/><path d="M7 20v-2a5 5 0 0 1 10 0v2"/></svg> },
  { nombre: "Medicina General", href: "/especialidad/medicina-general", Icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
  { nombre: "Odontología", href: "/especialidad/odontologia", Icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 2C8 2 5 5 5 9c0 2.5 1.5 5 3 6.5V20h8v-4.5C17.5 14 19 11.5 19 9c0-4-3-7-7-7z"/><path d="M9 20h6"/></svg> },
  { nombre: "Psicología", href: "/especialidad/psicologia", Icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg> },
  { nombre: "Nutrición", href: "/especialidad/nutricion", Icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z"/><path d="M4 22c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { nombre: "Neurocirugía", href: "/especialidad/neurocirugia", Icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg> },
  { nombre: "Dermatología", href: "/especialidad/dermatologia", Icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M4.5 12.5c0-4 3-7 7.5-7s7.5 3 7.5 7"/><path d="M9 21c0-1.7 1.3-3 3-3s3 1.3 3 3"/></svg> },
  { nombre: "Gineco-Obstetricia", href: "/especialidad/ginecologia", Icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><path d="M6 2v4M10 2v4M14 2v4"/></svg> },
  { nombre: "Ortopedia", href: "/especialidad/ortopedia", Icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 2L8 7H4l4 3-1.5 5L12 12l5.5 3L16 10l4-3h-4z"/></svg> },
  { nombre: "Nefrología", href: "/especialidad/nefrologia", Icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 22c-4.4 0-8-3.6-8-8 0-3 1.7-5.6 4.2-7L12 2l3.8 5C18.3 8.4 20 11 20 14c0 4.4-3.6 8-8 8z"/></svg> },
  { nombre: "Medicina Interna", href: "/especialidad/medicina-interna", Icon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></svg> },
];

const cirugias = [
  { nombre: "Hernia de disco", especialidad: "Neurocirugía", href: "/cirugia/hernia-de-disco" },
  { nombre: "Cirugía bariátrica", especialidad: "Obesidad", href: "/cirugia/bariatrica" },
  { nombre: "Cesárea", especialidad: "Ginecología", href: "/cirugia/cesarea" },
  { nombre: "Cirugía plástica", especialidad: "Estética", href: "/cirugia/plastica" },
  { nombre: "Reemplazo de rodilla", especialidad: "Ortopedia", href: "/cirugia/rodilla" },
  { nombre: "Marcapasos", especialidad: "Cardiología", href: "/cirugia/marcapasos" },
];

export default function EspecialidadesCirugias() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">

      {/* ESPECIALIDADES */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Especialidades</h2>
        <p className="text-sm text-gray-500 mb-6">Encuentra al especialista que necesitas</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {especialidades.map((e) => (
            <a
              key={e.nombre}
              href={e.href}
              className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-300 transition-colors text-center no-underline"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <e.Icon />
              </div>
              <span className="text-xs font-medium text-gray-800 leading-tight">{e.nombre}</span>
            </a>
          ))}
        </div>
      </div>

      {/* CIRUGÍAS */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Cirugías destacadas</h2>
        <p className="text-sm text-gray-500 mb-6">Coordinadas y gestionadas por Lymbika</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {cirugias.map((c) => (
            <a
              key={c.nombre}
              href={c.href}
              className="flex flex-col gap-3 p-5 bg-white border border-gray-100 rounded-xl hover:border-gray-300 transition-colors no-underline"
            >
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 leading-snug">{c.nombre}</p>
                <p className="text-xs text-gray-400 mt-0.5">{c.especialidad}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}
