/**
 * Respaldo del single type site-config de Strapi.
 *
 * Los componentes no leen de aquí: usan useSiteConfig() (client) o
 * getSiteConfig() (server), que mezclan Strapi con estos valores campo por
 * campo. Esto solo se ve si Strapi falla o el campo está vacío en el panel.
 */

export const WHATSAPP_NUMBER = "526561100446";

export const ADDRESS = "Av. Paseo de la Victoria 9350, Partido Senecú, Juárez, Chih.";

/**
 * Ficha de "Lymbika Healthcare" en Google Maps.
 *
 * /schedules usa otro link a propósito: apunta a la ficha de "Farmacia+ by
 * Lymbika", que está en la misma dirección pero es otro negocio en Maps.
 */
export const MAPS_URL = "https://maps.app.goo.gl/wddxisYk7CM7cGVg6";

export const INSTAGRAM_URL = "https://www.instagram.com/lymbika";
export const FACEBOOK_URL = "https://www.facebook.com/Lymbika";
export const TIKTOK_URL = "https://www.tiktok.com/@lymbika";

/** Pesos por dólar para la conversión aproximada a USD que se muestra al paciente. */
export const EXCHANGE_RATE_USD = 18;

/**
 * Nombre comercial de la membresía.
 *
 * Ha cambiado dos veces (MediClub → HealthPass) y probablemente vuelva a
 * cambiar, así que vive aquí y no incrustado en el JSX. Antes estaba escrito a
 * mano en 8 sitios y ya se habían desincronizado: la misma tarjeta del carrito
 * decía "MediClub" en el título y "HealthPass" en la insignia.
 *
 * El identificador del campo en Strapi es `membershipActive`, a propósito
 * genérico: no hay que tocarlo cuando cambie el nombre comercial.
 */
export const MEMBERSHIP_NAME = "HealthPass";
