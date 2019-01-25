## Startup

When the app first loads an HTTP GET call is made to the Node server API to retrieve a list of events.

* To help with performance, the list of events should be stored in the EventService at the time of the request. The issue to resolve is to load the page only when the data is available. Since the api request returns an Observable, I want to store the data in a property in the Event Service AND send it to the subscriber in the dashboard component.

1. Make an http get call from the event service which returns an array wrapped in an observable
1. Use the map function on the observable to map the data returned from the call to the json method. Also, note the events will be in an 'events' property on the JSON returned by the server.
1. To help with performance, should the list of events should be stored in the EventService at the time of the request? The upside is the array no longer has the async issue. The downside is the data in the array could be stale.

The app should present a list of events from which the user can click on an event to use when accessing the other features in the app.

* When an event in the list is clicked, the app should set the selectedEvent property. The object stored by this property needs to be connected to the same property on the EventService. 

1. Subscribe to the observable in the dashboard component in the ngOnInit function so the page doesn't load until the data is available
1. Store the events in the events property on the dashboard so it can be used in the template to render the list using ngFor
1. Add a function that sets the current event when an event in the list is clicked called selectEvent. This should store the event._id in the selected event property on the EventService and forward the user to the EventDashboard component.

If the event the user wants to use does not exist, the user should be able to add a new event.

* The event can be created with just a few required properties. When the save button is clicked, the new event needs to be added to the database. If the add succeeds, then the updated events need to be sent back to the app to repopulate the events properties on the EventService and the dashboard.

1. The form fields should provide examples of the information that belongs in each field, perhaps as a placeholder.
1. The data entered into the form must be validated.
1. Duplicate entries should not be permitted in the database or in the frontend storage - the events property on the EventService.
1. After a new event is added successfully to the database, the change needs to be reflected in the events array on the EventService and in the list of events on the dashboard.
1. What should happen after the user clicks the save button? I can set the newly added event as the selected event, then forward the user to the event dashboard.

The user should also be able to edit the basic information in an event.

* If the user chooses to edit an event, the updates need to be sent to the database, the event must also be updated in the events property in the EventService, and the updates need to be propagated to the events property in the dashboard component.

1. The date property needs to be converted to a Date object then modfied to render in the YYYY-MM-DD format.
1. Once the event properties are modified the event needs to be updated. The event should be updated in the database. The events array in the EventService needs to reflect the change and the list presented on the dashboard. 
1. Do I head straight to the EventDashboard using the newly added event or return to the dashboard, list the new event, and allow the user to select the next event? Go to the event dashboard.

The user should be able to delete an event from the list.

* Much like the add and edit functions, if the event is removed, the change must be noted on the server and propagated to all the events properties affected.

1. Select the event to delete by the id property.
1. Remove the event from the database.
1. If the remove is successful on the db, remove the event from the array on the frontend.

## Event 

When the user selects an event it should lead to an event dashboard page.

* The event dashboard should have links to:

1.  Students
2.  Registration

1. Create an event dashboard component.
1. Add a click event to call a method on the dashboard component. 

The selected event object should be stored in the Event Service where it can be updated and accessible to the other components.

1. Include a method call in the selected event click event to store the event object in the EventService.

The event dashboard should have a tab to view the students registered in the event.

1. Use the tabs from Material

The event dashboard should have a tab to view the registration form for the event.

* Students that are already registered should be listed here.


## Students

If the students tab is selected the user should be presented with a method to register students to the event.

1. Option 1: I could provide a list of students in the database with the ability to select those that should be registered. If a student isn't on the list, I could use a form to add the student. Selected students should be added to the registration form and removed from the list (or have some indicator that shows the student is registered).
1. Option 2: The add students tab could have a search feature that allows the user to begin entering some piece of info related to a student. Possible matches could appear below. If the student does not exist an add option could present a form to add a new student.
1. Option 3: The add student tab could include a form to add a new student. If the student exists already, the form could be populated as soon as the unityid is entered. Then the student could be edited or registered to the event.
1. Option 4: The student tab could show a list of the students that have already been registered for the event, with an option to unregister. If the student isn't on the list, an add form could be accessed. If the student already exists in the db, the form can be populated as soon as enough info is entered, such as the unityid.

There should be a way to add new students to the event and the database.

1. Create the html form with the student property inputs
1. Setup the form group placeholders and validation in the component
1. Populate the form with the student data if used for editing a student
1. Fill the form with the student info if the unityid already exists in the database
1. What about removing a student from the db? Include a delete button
1. There should be some indication on the page to show if a student is registered
1. Remember: it should not be possible to unregister a student if the student status is anything other than registered on the event management page.

If a student is already in the DB, there should be a way to find and/or select the student to be registered in the event.

* Use the add/edit form - populate the info when the unityid is entered

When a student is registered - or added to the event - the change needs to be cascaded throughout the app and DB.

Initially this could be accomplished by storing the event in the event service and always act on it or a reference to it.

It should not be possible to unregister a student when the status for the student is anything other than 'registered'.

You should not be able to add a student that is already registered for the event. Therefore, it would be nice to have some indication that a student is registered to the current event on this page.

* Add a check to make sure the student isn't already in the event before it is added.

Include a 'registered' toggle button on the student page to indicate the student is registered. When it's updated the change needs to be viewable on both the student page and the registration page.

1. Use a checkbox

## Registration

The registration page should track the student, card, status, and course name at a minimum.

* The registration page needs to track:

1.  Student
2.  Card number
3.  Student status
4.  Course name

1. Create a form as a container for the form control components

Create individual components for each of the fields which will need to be editable.

1. Card number - the number of the RFID finger stick assigned to the student
1. Status - current status of the student in the event
1. Course - identifier for the course the student is completing

Student Status Field - Keep track of the student status in the event. Use different colors for each status state to make it easy to identify patterns.

* The student status possibilities can be set via toggling from one state to the next with a click event?

The status options (in order):

1.  Registered - Gray
2.  Checked-In - Blue
3.  On Course - Yellow
4.  Completed - Green

Card Number Field - Add the card number assigned to the student which is used to map the results output to the student.

1. Include the prefix "204" automatically since all cards start with this number
1. Limit the length of the field to 7 digits

Course Field - Add the course name, number, or nickname to the student to track which course the student is completing.

* This could simply be a text field which holds a string such as a letter or the course name.

The event results need to be saved to the database.

* The results will be saved on the event object in a property which is an array of result objects.

1. The result object has a student object, card number, status, and course.
1. The student object will be stored as a Mongo Id in the database, but needs to be populated when retrieved by the angular frontend.
1. Modify event route to include the results property, convert the student object to a mongo id, and populate the student property when retrieved.

The references to the event object need to be updated when changes are made to the event.

* Currently, there is an issue with the event manager in which the results used to propagate the list are not accurate after the student on the student list is removed. To replicate the issue, add a student to the event, cycle through the statuses of the student until it returns to 0 or 'registered', then uncheck the registration checkbox on the student list component. Finally, click on the event manager page to see that the student is still there. Next, if you once again change the status, leave the app and return, the student will be listed on the student list component again.

1. Make the event property on the event service an Observable to which other properties that need it must subscribe.

The status value of the student is not always accurate.

* When the status of a student is changed and the app is reloaded, the status number stored and retrieved is correct. However, when the user clicks on the status to modify the value, the method reports an incorrect value for the status - it seems like the value is always zero.