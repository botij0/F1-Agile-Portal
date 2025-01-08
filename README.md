<img src="https://github.com/user-attachments/assets/e142f930-3607-4d31-a513-ec8ff951e969" alt="drawing" style="width: 100%;" />

---
Formula 1 Web Portal for fans and professional teams. Includes news, management of circuits, drivers, teams and much more...

## Contents
1. [Execution](#execution)
   - [BBDD](#bbdd)
   - [Frontend](#frontend)
   - [Backend](#backend)

3. [Implementation](#implementation)
   - [Users](#users)
   - [Features](#features)
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

The web application consists of a rather complex F1 portal. This section explains the users and features it presents and the architecture used to carry out the development of the project.


### Users

The web application has three types of users:
- **Public**: does not require authentication. It can access limited sections and exclusively in read mode. The only resource that is not in read mode are the votes in which you can participate.
- **Team Manager**: requires authentication. He/she has access to exclusive sections such as Team and Pilots. Although it still has some limitations such as users or news.
- **Admin**: Has full access to the application. You can add, edit or delete the content you want.

### Features
The web application allows the following actions:
- **User Management**: Registration, login, and customized profiles.
- **Team and Driver Information**: Searchable databases with details on teams and drivers.
- **Car and Track Management**: Detailed information on car and track specifications, as well as performance simulations.
- **Voting and Opinions**: Functionalities to vote in different categories and share opinions.
- **News**: News section updateable by team managers and administrators.

For all of them, the admin can manage them by editing, creating or deleting them. In some cases, the team manager can also perform these options.

### Architecture

The application has a three-layer architecture as shown in the image:

![image](https://github.com/user-attachments/assets/56fcc8c3-1aa9-4973-8d74-a9ff2476d2bd)

- **Frontend**: NextJS with TailwindCSS has been used for styling. Some of the libraries that were used were: `TanStack Table`, `React-Hot-Toast`, `React-Hook-Form` y `Axios`.
- **Backend**: Spring Boot has been used in its entirety. Some key dependencies are: `Modelmapper`, `Spring Boot Starter Data JPA`, `Spring Boot Starter Web`, `Spring Boot Starter Security`, `Spring Security Web` y `JJWT`

## User Manual

### Public Access

### Private user

### Admin
