import { DoctorType } from "@/types/doctor";
import { format, parse } from "date-fns";

export type InfoDoctorProps = {
  doctor: DoctorType;
};

const SimpleSchedule = ({ doctor }: InfoDoctorProps) => {
  const formatHour12 = (timeString: string) => {
    const parsed = parse(timeString, "HH:mm:ss", new Date());
    return format(parsed, "hh:mm a")
      .replace("AM", "a. m.")
      .replace("PM", "p. m.");
  };

  const isScheduleAvailable =
    doctor.startAvailability && doctor.closedAvailability;

  const formattedStart = isScheduleAvailable
    ? formatHour12(doctor.startAvailability!)
    : null;
  const formattedEnd = isScheduleAvailable
    ? formatHour12(doctor.closedAvailability!)
    : null;

  return (
    <div className="flex gap-4 flex-col items-center mx-auto py-4 sm:py-6">
      {isScheduleAvailable ? (
        <p className="text-center leading-relaxed">
          <strong className="font-semibold">
            {doctor.dayAvailable}:
          </strong><br />
          <span>{formattedStart} - {formattedEnd}</span>
        </p>
      ) : (
        <p className="text-center text-muted-foreground">
          Horario no disponible
        </p>
      )}
    </div>
  );
};

export default SimpleSchedule;