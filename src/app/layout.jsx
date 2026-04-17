import "@/app/globals.css";
import Header from "@/components/ui/header";
import { Toaster } from "sonner";



export const metadata = {
  title: "Pizzería Mamma Mia",
  description: "Pizzería Mamma Mia - App de gestión de pedidos",
  manifest: "/pwa/manifest.json"
};


export default function RootLayout({ children }) {
  return (

    <html lang="es">
      <body className={`antialiased min-h-screen`} >
        <Header />
        <main className="my-10 py-20 px-10">
          {children}
        </main>

        <Toaster position="top-center" expand={true} richColors />
      </body>
    </html>

  );
}
