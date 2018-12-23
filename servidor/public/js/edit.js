const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
let mailError = "Invalid e-mail address";
let nameError = "This field can only contain letters";
let phoneError = "Invalid phone number";
let emptyError = "All fields must be completed";
let notFoundError = "There aren't any users that match this search";
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
function errorMsj (location, error) {
    location.siblings(".error-msj").removeClass("hidden").html(`<span>${error}</span>`)

    setTimeout(function () {
        $(".error-msj").addClass("hidden");
    }, 4000);
}
function charLimit(clickedInput) {
    let maxlength = clickedInput.attr("maxlength");
    clickedInput.on("input", function(){
        var str = clickedInput.val()
        let currentLength = str.length;
        $(this).siblings("p").html(currentLength + "/" + maxlength)
    });
}
$(".char-counted").on("click", function() {
    $(".chars").html("")
    charLimit($(this))
})
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
    console.log("gvygcfytrdstre")
    const ename =$("#edit-name").val();
    const elastname = $("#edit-lastname").val()
    const ephone = $("#edit-phone").val()
    const email = $("#edit-mail").val()
    if (ename == "" || elastname == "" || ephone == "" || email == "") {
        errorMsj ($("#edit-mail"), emptyError)
        return
    }
    if (validateEmail(email) === false){
        errorMsj ($("#edit-mail"), mailError)
        return
    } 
    if (!(/^\d+$/.test(ephone))) {
        errorMsj ($("#edit-phone"), phoneError)
        return
    }
    if (!(/^[a-zA-Z]+$/.test(ename))) {
        errorMsj ($("#edit-name"), nameError)
        return
    }
    if (!(/^[a-zA-Z]+$/.test(elastname))) {
        errorMsj ($("#edit-lastname"), nameError)
        return
    }
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
    ).done(function() {
        $("#edit-modal-container").removeClass("hidden");
    })
})