

function PizzaVer({ pizza }) {

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-blue-600">INFORMACIÓN DE LA PIZZA</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <img src={pizza.foto || '/pwa/icon-192x192.png'} alt='foto' width={100} />

                <div className="flex flex-col justify-center w-full">
                    <p className="text-xl">{pizza.nombre}</p>
                    <p className="text-4xl font-bold text-slate-300">{pizza.precio} €</p>
                </div>
            </div>

            <div>
                <p className="font-bold">Ingredientes</p>
            </div>

        </div>
    );
}

export default PizzaVer;