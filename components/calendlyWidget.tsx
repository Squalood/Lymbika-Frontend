import { InlineWidget } from "react-calendly";

const CalendlyWidget = () => {
  return (
    <div className="w-full flex justify-center">
      <InlineWidget
        url="https://calendly.com/lymbikagroup/30min?hide_gdpr_banner=1"
        styles={{ height: "700px", width: "100%" }}
      />
    </div>
  );
};

export default CalendlyWidget;
