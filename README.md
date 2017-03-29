# O-Results Angular

The O-Results App tracks students participating on various courses at an orienteering event.

## Technical Skills

Angular, Angular CLI, CSS, Javascript, HTML, SASS, Typescript

## Breakdown

This is the frontend interface for the O-Results application built using the Angular framework. The user can add an event or select an already existing event to manage, view, or track participants as their status changes during the event. All data changes are saved to the associated Mongo collections through API calls to the routes on the Node server setup using Express. This project presented numerous challenges beginning with the database design to managing the state of the application using Observables, the foundation of reactive programming. Although manipulating and passing data through Angular parent and child components is relatively simple, I ran into issues when data was altered in components with no direct connection. As a result, I had the opportunity to solve problems dealing with the concepts of application state, object immutability, and the asynchronous nature of the web browser.

## Notable Features

The interface is designed using an alpha release of Material Design. I really like the consistent look and feel of Google's CSS framework and since our university relies heavily on Google Apps I intend to use it frequently in future applications. To implement the forms in the application I chose Angular's Reactive Forms technology which allowed me to keep most of the form logic in the component and maintain a cleaner, more maintainable template file.

## Run the Code

To run the application, first setup the MongoDB and start the Node server from the o-results-node repository. Then use `npm start` to activate the interface in the browser at `http://localhost:4200/`.
