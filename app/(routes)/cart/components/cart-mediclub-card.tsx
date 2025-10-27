import { IdCard, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthUserProps } from "./types";

interface CartMediClubCardProps {
  user: AuthUserProps | null;
}

export function CartMediClubCard({ user }: CartMediClubCardProps) {
  return (
    <Card className="overflow-hidden w-full">
      <CardContent className="p-4 sm:p-6 w-full">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background p-4 sm:p-6 w-full">
          <IdCard className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl font-bold mb-2">MediClub</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            Productos de farmacia a precio de proveedor
          </p>

          {user?.mediClubRegular ? (
            <Badge className="w-full justify-center py-2 bg-green-600 hover:bg-green-700 text-xs sm:text-sm">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Precio MediClub aplicado
            </Badge>
          ) : (
            <Button asChild className="w-full text-xs sm:text-sm" variant="default" size="sm">
              <Link href="/membership" className="gap-2">
                Ver planes disponibles
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}