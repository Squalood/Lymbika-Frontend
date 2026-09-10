export function formatPrice(price: number, decimals = 2){
    const priceFormated = new Intl.NumberFormat('es-MX', {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    })

    const finalPrice = priceFormated.format(price)

    return finalPrice
}
