const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
console.log(myParam)
//GET ONE to edit
$.ajax(
    "http://localhost:3000/api/users/" + myParam
).done(function(data) {
    $("#edit-name").val(data.name)
    $("#edit-lastname").val(data.lastname)
    $("#edit-phone").val(data.phone)
    $("#edit-mail").val(data.mail)
});
//EDIT
$("#save-edited").on("click", function() {
    const ename =$("#edit-name").val();
    const elastname = $("#edit-lastname").val()
    const ephone = $("#edit-phone").val()
    const email = $("#edit-mail").val()
    $.ajax(
        "http://localhost:3000/api/users/" + myParam,
        {
            method: "PUT",
            data: {
                name: ename,
                lastname: elastname,
                phone: ephone,
                mail: email
            }
        }
    )
})