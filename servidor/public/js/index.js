//GET ALL
$.ajax(
    "http://localhost:3000/api/users"
).done(function(data) {
    console.log(data)
});