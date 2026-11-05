import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SpecialtyTitle = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 mb-4">
      <Link
        href="/specialty"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </Link>
    </div>
  );
};

export default SpecialtyTitle;
