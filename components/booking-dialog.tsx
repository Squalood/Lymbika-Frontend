"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface BookingDialogProps {
  src: string;
  title: string;
  trigger: React.ReactNode;
}

export function BookingDialog({ src, title, trigger }: BookingDialogProps) {
  const isMobile = useIsMobile();
  const side = isMobile ? "bottom" : "right";
  const contentClass = isMobile
    ? "p-0 overflow-hidden rounded-t-3xl max-h-[90vh] mx-2"
    : "p-0 overflow-hidden rounded-l-2xl max-w-[640px]";
  const scrollClass = isMobile
    ? "overflow-y-auto max-h-[calc(90vh-64px)]"
    : "overflow-y-auto h-[calc(100vh-64px)]";

  const handleOpenChange = (open: boolean) => {
    document.body.classList.toggle("booking-open", open);
  };

  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side={side} className={contentClass}>
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className={scrollClass}>
          <iframe
            title={title}
            src={src}
            width="100%"
            height="920"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
