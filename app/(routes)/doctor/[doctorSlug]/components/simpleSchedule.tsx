import { DoctorType } from "@/types/doctor";
import { format, parse } from "date-fns";

export type InfoDoctorProps = {
  doctor: DoctorType;
};

const SimpleSchedule = (props: InfoDoctorProps) => {
  const { doctor } = props;

  const formatHour12 = (timeString: string) => {
    const parsed = parse(timeString, "HH:mm:ss", new Date());
    return format(parsed, "hh:mm a")
    .replace("AM", "a. m.")
    .replace("PM", "p. m.");
  };

  return (
    <div className="flex gap-4 flex-col items-center mx-auto py-4 sm:py-6">
      <p className="text-center leading-relaxed">
        <strong className="font-semibold">Lunes a sábado:</strong><br />
        <span>
          {formatHour12(doctor.startAvailability)} - {formatHour12(doctor.closedAvailability)}
        </span>
        {/* <em className="text-muted-foreground">Domingo cerrado</em> */}
      </p>
    </div>
  );
};

export default SimpleSchedule;