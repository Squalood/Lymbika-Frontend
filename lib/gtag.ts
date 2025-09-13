export const GA_TRACKING_ID = "G-1CNJ3WPFKE" // tu ID

// Enviar evento genérico
export const event = ({ action, category, label, value }: {
  action: string
  category?: string
  label?: string
  value?: number
}) => {
  if (typeof window !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
