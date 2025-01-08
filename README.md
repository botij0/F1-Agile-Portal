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

![Architecture Schema](https://github.com/user-attachments/assets/56fcc8c3-1aa9-4973-8d74-a9ff2476d2bd)

- **Frontend**: NextJS with TailwindCSS has been used for styling. Some of the libraries that were used were: `TanStack Table`, `React-Hot-Toast`, `React-Hook-Form` y `Axios`.
- **Backend**: Spring Boot has been used in its entirety. Some key dependencies are: `Modelmapper`, `Spring Boot Starter Data JPA`, `Spring Boot Starter Web`, `Spring Boot Starter Security`, `Spring Security Web` y `JJWT`

## User Manual

This section explains in detail how the application works.

As explained in the previous section, the application presents three types of users. For this reason this section is divided into three parts each for each user, going from the least restrictive to the most restrictive.

🔴**WARNING**🔴 This section is extremely long, but the vast majority are images of the application.

### Public Access

As you enter the application, the following view is the following view is displayed:

![Main Page](https://github.com/user-attachments/assets/d7c8458b-b23e-47b0-a204-0d12cba2cbbf)

#### News

If we access the news section, by clicking on the navigation bar, right where it says “NOTICIAS”, a kind of paginated mosaic is displayed with the different news published in the application:

![News Page](https://github.com/user-attachments/assets/9a9c1d3c-003d-4516-915a-31d9f6a7a177)

You can click on the desired news item to enter the detailed view of the news item, which allows you to read the news item in depth:

![image](https://github.com/user-attachments/assets/d343fe4a-ef0c-40ba-80dc-b7a9c72d19de)

#### Votes
To access the voting section, click on the navigation bar just where it says “VOTING”. A list with all the votes of the application will be shown where you can see the results if it has already finished or vote if it is still open:

![image](https://github.com/user-attachments/assets/e21ec889-2ad1-4879-9671-96b53a8d674b)

If you click on any of the votes that are open, the following form is displayed with all the pilots that can vote:

![image](https://github.com/user-attachments/assets/409e30a5-5936-420f-8097-eac148fac063)

Once you have selected the one you want, click on the “Vote” button at the bottom of the page.Once the button is clicked, a modal appears asking for the user's data to save the vote, both the name and the email address, which must be unique to avoid multiple votes from the same user.

Once the provisional results of the voting are displayed.

![image](https://github.com/user-attachments/assets/f7c5f00a-f59c-4c78-bd8f-93ef3e04e009)

### Private user

### Admin
