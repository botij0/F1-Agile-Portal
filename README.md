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

Initially the project was deployed and accessible to the public.

However, due to the fact that it is a non-profit university project, the deployment maintenance was terminated and currently it can only be run locally.

The following explains how to run the project successfully.

It should be noted that the project used a [Supabase](https://supabase.com/) DB that is currently unavailable, so it is necessary to previously set up a project in [Supabase](https://supabase.com/) for everything to work correctly.

### BBDD

As mentioned above, the database is hosted at [Supabase](https://supabase.com/). To do this you need to create a free account and create an access token and create the database as well as the corresponding tables. 

The `E/R` schema of the DB is:

![E/R schema](https://github.com/user-attachments/assets/e1238929-3134-415c-a152-97b17b1425d0)

🔴**WARNING**🔴 the **url** of the new project as well as the **token** created must be added to both the `frontend` and `backend`.  

- In the front end, certain values must be substituted in the file `app/(utils)/constantes.tsx`.
- In the back end, you must substitute certain values in the file `src/main/resources/application.properties`

### Frontend

Open a terminal and access the `/frontend` directory of the project.

Once inside, run the following command in the terminal to install the dependencies:
```bash
npm install
```
Once installed, run the following command in the terminal:
```bash
npm run dev
```
The project is already in execution. You can access through a browser at the url: `http://localhost:3000/`

### Backend

The easiest way to run it is to open the `/backend` project using JetBrains `IntelliJ IDEA` IDE or similar and run it from there as shown in the following image:

![Screenshot of backend](https://github.com/user-attachments/assets/184bc34c-55a9-4615-8745-52ba3993b5fa)


## Implementation

### Requirements

### Architecture


## User Manual

### Public Access

### Private user

### Admin
