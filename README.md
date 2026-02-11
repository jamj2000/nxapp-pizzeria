# Pizzería Mamma Mia

Aplicación web con fines didácticos para la gestión de una pizzería de ejemplo.


## Diagrama Entidad-Relación simplificado


![ER](public/erd.png)


## Diagrama Entidad-Relación de Prisma

![ER Prisma](public/prisma-erd.png)


## Desarrollo

1. **Descargar** 

```sh
git clone https://github.com/jamj2000/nxapp-pizzeria.git
cd nxapp-pizzeria
```

2. **Instalar dependencias**

```sh
npm  install
```

3. **Crear base de datos**

Tu mismo.


4. **Configurar variables de entorno en `.env`**

```sh
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
DATABASE_URL="postgresql://user:password@host:port/dbname?params"

AUTH_SECRET=""   # npx auth secret
```

5. **Crear tablas según esquema de prisma**

```sh
npx  prisma  db  push
```


6. **Introducir datos de prueba**

```sh
npm  run  seed
```



7. **Iniciar aplicación**

```sh
npm  run  dev
```


## Autenticación

Las credenciales de acceso, tanto rol USER como ADMIN son las siguientes:

Email           | Contraseña   | Rol
----------------|--------------|------------
admin@admin.es  | admin        | ADMIN
user@user.es    | user         | USER