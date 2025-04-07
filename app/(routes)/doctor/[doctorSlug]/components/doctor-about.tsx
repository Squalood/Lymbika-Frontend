type DoctorAboutProps = {
    description: string;
    specialties: string;
    licensedToPractice: string;
    practiceName: string;
    languagesSpoken: string;
  };

  const DoctorAbout = ({
    description,
    specialties,
    licensedToPractice,
    practiceName,
    languagesSpoken,
  }: DoctorAboutProps) => {
    return (
      <div className="p-6">
        <h1 className="text-2xl mb-6">Acerca de</h1>
        {/* Descripción larga */}
        <div className="space-y-4 mb-6">
        {(Array.isArray(description) ? description : [description]).map((paragraph, idx) => (
            <p key={idx} className="text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
  
        {/* Información de columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="font-semibold  mb-1">Specialities</p>
            <p>{specialties}</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Licensed to practice</p>
            <p>{licensedToPractice}</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Practice name</p>
            <p>{practiceName}</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Languages spoken</p>
            <p>{languagesSpoken}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default DoctorAbout;
  