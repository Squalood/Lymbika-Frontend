const Cost = () => {
    return ( 
        // section4 
        <div className="w-full py-20 lg:py-40 bg-muted">
            <div className="container mx-auto">
                <div className="flex flex-col text-center py-14 gap-4 items-center">
                    <div className="flex flex-col">
                        <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
                        ¿Listos para el cambio?
                        </h3>
                        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl mt-4">
                        Consulta inicial: $300 MXN
                        Programa integral desde $1400/mes 
                        
                        </p>
                        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
                        Resultados visibles desde el primer mes
                        </p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Cost;