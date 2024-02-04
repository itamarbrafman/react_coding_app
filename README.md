about

This web application is designed to facilitate remote coding sessions between a mentor and his student. It is designed in a way where the student edit the code while sharing it with mentor. The mentor can observe the student's changes to the code in real-time and provide guidance. In addition, the student can get an real-time indication if they have reached the intended solution, even when the mentor isn't watching (via smiley face popping up on the screen).

The users (mentor/stdent) can interact with a main page and with "code block" pages. In the main page a user can choose from a list of available code blocks. Each code block represents a specific JavaScript coding topic.
Once a user selects a code block, they are directed to a page where the mentor can view the code in read-only mode, and the student can make changes. Code changes are displayed in real-time using Socket.IO. Syntax highlighting is implemented on the mentor's page using Highlight.js, supporting JavaScript code only.


System Architecture

The application is built using the following:

* React: A JavaScript library for building user interfaces, used for the frontend development of the application.

* Express.js: A Node.js web application framework used for building the server-side of the application.

* MongoDB: A NoSQL database used to store information about code blocks, including their titles, and codes.

* Socket.IO: A real-time bidirectional event-based communication library for enabling communication between the server and clients.

* Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js, used to model the application's data and interact with the database.


The conponents are:

* Client: Represents both the mentor and student clients. These clients interact with the server to retrieve code blocks, make changes, and receive real-time updates.

* Server (Express.js): serves the client's files, and communicates with the database. Utilizes Socket.IO for real-time communication with clients.

* Database (MongoDB): Stores information about code blocks.

* Socket.IO: Facilitates real-time communication between the server and clients, allowing for instant updates when code changes occur.

   +---------------------+           +-------------------------+
   |                     |           |                         |
   |        Client       |           |         MongoDB         |
   | (Mentor / Student)  |           |   +-----------------+   |
   |                     |           |   |                 |   |
   +---------------------+           |   | CodeBlock       |   |
            |                        |   | Collection      |   |
            |                        |   |                 |   |
            |                        |   | _id             |   |
            +  Socket.IO Events      |   | code            |   |
            |                        |   | title           |   |
            |                        |   |                 |   |
            |                        |   +-----------------+   |
            |                        |                         |
            |                        +-------------------------+
            |                                   |
   +---------------------+                      |
   |                     |                      |
   |      Express.js     |                      | Mongoose
   |        Server       |                      |
   |                     |-----------------------
   |                     |
   | Socket.IO Handling  |
   +---------------------+

Reflection on the Project:

Throughout the development of this project, I allocated my time between learning the fundamentals of front-end technologies and web programming for the very first time, and the practical implementation of the app. This approach allowed me to rapidly familiarize myself with new technologies, including HTML, CSS, React, JavaScript, and Node js, but resulted in certain trade-offs.

Known gaps:

* The styling of the app is basic; I would have liked to make it have a more professional look and feel more user-friendly.

* The coding examples I provided in the code block pages are somewhat placeholders; I would have liked to have better examples that showcase the true potential of this product for students and mentors.

* Once the server is up and running, render.com (The website I used for deployment) keeps it up for a while, but then it goes down if not interacted with. During the time it's up, only the first person to enter each "code block" page is counted as the mentor. When render.com take it down and it's brought up again, a new mentor can enter. I would have liked to find a better hosting service for this project.

Going forward:

One main thing I would like to do given more time is to improve the interaction with the database. I would like to enable the mentor to not only observe real-time changes made by students but also to access and review edited code retrospectively. This enhancement would involve retrieving and displaying saved, edited code from the database whenever a mentor opens a new code block page, offering a more comprehensive mentoring experience.


