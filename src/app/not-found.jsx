import BackButton from "@/components/ui/back-button";

function NotFoundPage() {
    return (
        <div>
            <BackButton />
            <div className="h-20">{/* Hueco de separación */}</div>

            <div className="grid text-5xl text-stone-500">
                El contenido al que intentas acceder no está disponible.
            </div>
        </div>
    );
}

export default NotFoundPage;