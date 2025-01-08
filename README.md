<img src="https://github.com/user-attachments/assets/e142f930-3607-4d31-a513-ec8ff951e969" alt="drawing" style="width: 100%;" />

---
Formula 1 Web Portal for fans and professional teams. Includes news, management of circuits, drivers, teams and much more...

## Contents
1. [Execution](#execution)
   - [BBDD](#bbdd)
   - [Frontend](#frontend)
   - [Backend](#backend)

3. [Implementation](#implementation)
   - [Requirements](#requirements)
   - [Architecture](#architecture)
4. [User Manual](#user-manual)
   - [Public Access](#public-access)
   - [Private User](#private-user)
   - [Admin](#admin)

## Execution

Inicialmente el proyecto estaba desplegado y era accesible para el público.

Sin embargo, debido a que se trata de un proyecto universitario sin ánimo de lucro, se finalizó el mantenimiento del despliegue y actualmente solo se puede ejecutar en local.

A continuación, se explica como ejecutar el proyecto de forma satisfactoria.

Cabe destacar que el proyecto utilizaba una BBDD de [Supabase](https://supabase.com/) que actualmente no está disponible, por lo que es necesario configurar previamente un proyecto en [Supabase](https://supabase.com/) para que todo funcione correctamente.

### BBDD

Como se ha comentado, la BBDD se aloja en [Supabase](https://supabase.com/). Para ello se necesita crear una cuenta gratuita y crear un token de acceso y crear la base de datos así como las tablas correspondientes. 

El esquema `E/R` de la BBDD es:

![E/R schema](https://github.com/user-attachments/assets/e1238929-3134-415c-a152-97b17b1425d0)

🔴**WARNING**🔴 se debe añadir tanto al `frontend` como al `backend` la **url** del nuevo proyecto así como el **token** creado. 

- En el front se debe sustituir ciertos valores en el archivo `app/(utils)/constantes.tsx`.
- En el back se debe sustituir ciertos valores en el archivo `src/main/resources/application.properties`

### Frontend

Abre una terminal y accede al directorio `/frontend` del proyecto.

Una vez dentro ejecuta en la terminal el siguiente comando para instalar las dependencias:
```bash
npm install
```
Una vez instaladas ejecuta el siguiente comando en la terminal:
```bash
npm run dev
```
El proyecto ya está en ejecución. Puede acceder mediante un navegador en la url: `http://localhost:3000/`

### Backend

La forma más sencilla de ejecutarlo es abriendo el proyecto `/backend` usando el IDE de `IntelliJ IDEA` de JetBrains o alguno similar y ejecutarlo desde ahí como se muestra en la siguiente imagen:

![Screenshot of backend](https://github.com/user-attachments/assets/184bc34c-55a9-4615-8745-52ba3993b5fa)


## Implementation

### Requirements

### Architecture


## User Manual

### Public Access

### Private user

### Admin
