# crud-app

This App allows to: see, filter, add, modify and delete users from a list. It uses JavaScript with JQuery (ajax) to make calls to the API and shows the data in a HTML5 file.

The API performs:
- a GET method which reads the users previously loaded from a JSON file, and these are appended to the HTML document with JS. From an input on the client side the users can be filtered, too.

Each user is an object with this format: 
{
    "name":"María",
    "lastname":"Nuñez",
    "phone":908708237403,
    "mail":"maria@gmail.com",
    "id":1
}
- POST and PUT methods: Validates if the inputs are filled, and if the characters correspond with the type of data that each key should have as value. Else it returns a 404 error. 

- DELETE: requires an ID, wich is passed from the HTML to JS (through the window.location.href) and then splices the index from the array of users.

