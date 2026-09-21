export const WHATSAPP_NUMBER = "526561100446";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

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
