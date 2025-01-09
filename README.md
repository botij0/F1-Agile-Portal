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
   - [Team Manager](#team-manager)
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

![New Details](https://github.com/user-attachments/assets/d343fe4a-ef0c-40ba-80dc-b7a9c72d19de)

#### Votes
To access the voting section, click on the navigation bar just where it says “VOTING”. A list with all the votes of the application will be shown where you can see the results if it has already finished or vote if it is still open:

![Votes](https://github.com/user-attachments/assets/e21ec889-2ad1-4879-9671-96b53a8d674b)

If you click on any of the votes that are open, the following form is displayed with all the pilots that can vote:

![Vote Form](https://github.com/user-attachments/assets/409e30a5-5936-420f-8097-eac148fac063)

Once you have selected the one you want, click on the “Vote” button at the bottom of the page.Once the button is clicked, a modal appears asking for the user's data to save the vote, both the name and the email address, which must be unique to avoid multiple votes from the same user.

Once the provisional results of the voting are displayed.

![Voting Results](https://github.com/user-attachments/assets/f7c5f00a-f59c-4c78-bd8f-93ef3e04e009)

#### Teams

To access the equipment section, click on the navigation bar, right where it says “EQUIPOS”, a list of all the equipment in the application is displayed:

![Teams Page](https://github.com/user-attachments/assets/251c133e-1650-4944-8fd7-2b8661f39d60)

You can click on the equipment of your choice and the equipment will be displayed in detail:

![Team Details](https://github.com/user-attachments/assets/953b9ebd-36db-459f-95ab-b9119a829ca5)

You can also click on the desired pilot to see the detail of this to see it in detail.

#### Calendar

To access the calendar section, click on the navigation bar, right where it says “CALENDARIO” a list appears with the dates of this year's upcoming races along with their location:

![Calendar Page](https://github.com/user-attachments/assets/2b9db39c-6ee1-49a0-974b-e92219b8920d)

#### Circuits

To access the circuits section, click on the navigation bar, right where it says “CIRCUITOS”, a list with all the circuits of the competition is displayed:

![Circuits Page](https://github.com/user-attachments/assets/4393b1c8-ba11-4bac-8e81-8c57edbcf15e)

The detailed view of the circuit can be accessed in the same way as in the previous section by clicking on any of them:

![Circuit Details](https://github.com/user-attachments/assets/97b362ae-b972-4451-bc04-b74e12825792)

#### Autentication

Although this section is open to the public, it will really only be used by those people who have a user and who have been validated by the application administrator or want to create a new user. You can login or register using the appropriate form.

### Team Manager

The user with the role of team manager, in addition to being able to access all the views and functionalities of public access, will also be able to access unique functionalities for this type of user.

Specifically these functionalities are within the new section called “My Team” as explained below.

#### Profile

This is a view with a form containing the user's data. All of them can be modified except the Role. To do this it is necessary to click on the pencil icon next to the field to be modified. Once modified, click on the “Save” button.

#### My Team

To access the “My Team” section, click on the navigation bar, right where it says “MI EQUIPO”, a view is shown in which different information is displayed and we have several options: 

![My Team Page](https://github.com/user-attachments/assets/0258bcf5-730b-4ec8-ac54-6c906dea6920)

The second lower half shows a control panel for the team manager that allows him/her to carry out the pertinent management. The first three allow you to manage team data such as users, drivers and cars. Clicking on any of them displays a table with that data and buttons to create, delete or edit any of them:

![Drivers Page](https://github.com/user-attachments/assets/83cf8da2-2a6e-4b36-8ecc-046cdb5be820)

The last option shows a form in which you can make simulations with the team's cars and the selected circuit:

![Simulations Page](https://github.com/user-attachments/assets/cd867cb9-48f7-47ae-a6a1-03a067d6bd78)


### Admin

The user with administrator role, besides being able to access all the public access views and functionalities, will also be able to access functionalities unique to this type of user. the administrator will not be able to access the “MI EQUIPO” section which is unique to the user with team manager role.

Specifically its functionalities are within a new section called “PANEL DE CONTROL” as explained below.

![Control Panel Page](https://github.com/user-attachments/assets/206f7699-0995-45b3-9576-f912b0195531)

Each of the options displays a table (as seen in the team manager sections) with buttons that allow you to create, delete or edit the corresponding entities.

