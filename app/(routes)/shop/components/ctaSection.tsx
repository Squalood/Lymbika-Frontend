"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import WhatsAppQrDialog from "@/components/whatsapp-qr-dialog";
import { WHATSAPP_URL } from "@/lib/constants";

const CTASection = () => {
  const isDesktop = useIsDesktop();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Bottom CTA */}
        <div className="text-center mt-16">
            <Card className="bg-gray-50 border-0">
                <CardContent className="p-8">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                    ¿No encuentras lo que buscas?
                    </CardTitle>
                    <CardDescription className="text-gray-600 mb-6 max-w-2xl mx-auto text-base">
                    Nuestros médicos pueden crear un kit personalizado según tus necesidades específicas. 
                    Consulta gratis y recibe recomendaciones personalizadas.
                    </CardDescription>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90"
                        onClick={isDesktop ? () => setDialogOpen(true) : () => window.open(WHATSAPP_URL, "_blank")}
                    >
                        📲 Mándanos tu receta
                    </Button>
                    <WhatsAppQrDialog open={dialogOpen} onOpenChange={setDialogOpen} />
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
};
 
export default CTASection;