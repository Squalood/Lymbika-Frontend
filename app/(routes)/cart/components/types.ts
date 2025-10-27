export interface AuthUserProps {
  username: string;
  email: string;
  mediClubRegular: boolean;
}

export interface CartClientPageProps {
  user: AuthUserProps | null;
}

export interface CartSummaryProps {
  user: AuthUserProps | null;
  isDelivery: boolean;
  setIsDelivery: (value: boolean) => void;
  onCheckout: () => void;
}