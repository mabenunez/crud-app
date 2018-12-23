let mailError = "Invalid e-mail address";
let nameError = "This field can only contain letters";
let phoneError = "Invalid phone number";
let emptyError = "All fields must be completed";
let notFoundError = "There aren't any users that match this search";

function append(data) {
    for (let i = 0; i < data.length; i++) {
        let id = data[i].id;
        let name = `<div>${data[i].name}</div>`;
        let phone = `<div>${data[i].phone}</div>`;
        let mail = `<div>${data[i].mail}</div>`;
        let lastname = `<div>${data[i].lastname}</div>`;
        let editIcon = `<a target="_blank" href="/users/edit-user?id=${id}"><i class="fas fa-user-edit"></i></a>`;
        let deleteIcon = `<a data-id="${id}"><i class="fas fa-trash-alt delete"></i></a>`;
        $(".main-container").append(`<div class="row" id="${id}">${name}${lastname}${phone}${mail}<div>${deleteIcon}${editIcon}</div></div>`)
    }
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
//ERROR MSJ CANT BE APPENDED THEY NEED TO BE SHOWN AND THE MSJ CHANGED DINAMICALLY
function errorMsj (location, error) {
    location.siblings(".error-msj").removeClass("hidden").html(`<span>${error}</span>`)

    setTimeout(function () {
        $(".error-msj").addClass("hidden");
    }, 4000);
}
//GET ALL
$.ajax(
    "http://localhost:3000/api/users"
).done(function (data) {
    append(data)
});
//POST
$("#add").on("click", function() {
    let addedName = $("#add-name").val();
    let addedLastname = $("#add-lastname").val();
    let addedPhone = $("#add-phone").val();
    let addedMail = $("#add-mail").val()
    if (addedName == "" || addedLastname == "" || addedPhone == "" || addedMail == "") {
        errorMsj ($("#add-mail"), emptyError)
        return
    }
    if (validateEmail(addedMail) === false){
        errorMsj ($("#add-mail"), mailError)
        return
    } 
    if (!(/^\d+$/.test(addedPhone))) {
        errorMsj ($("#add-phone"), phoneError)
        return
    }
    if (!(/^[a-zA-Z]+$/.test(addedName))) {
        errorMsj ($("#add-name"), nameError)
        return
    }
    if (!(/^[a-zA-Z]+$/.test(addedLastname))) {
        errorMsj ($("#add-lastname"), nameError)
        return
    }
    $.ajax(
        "http://localhost:3000/api/users",
        {
            method: "POST",
            data: {
                name: addedName,
                lastname: addedLastname,
                phone: addedPhone,
                mail: addedMail
            }
        }
    ).done(function() {
        $("#created-modal-container").removeClass("hidden");
    })
})
//DELETE
$(document).on("click", ".delete", function() {
    const id = $(this).parent().parent().parent().attr("id");
    $("#delete-modal-container").removeClass("hidden");
    $(".yes-choice").parent().attr("href", `/api/users/${id}`)
    $(".yes-choice").on("click", function (params) {
        window.location.href = window.location.href + "/" + id;
        $.ajax(
            "http://localhost:3000/api/users/" + id,
            {
                method: "DELETE",
            }
        ).done(function () {
            location.reload("http://localhost:3000/users/")
        })
    })
    $(".no-choice").on("click", function (params) {
        $("#delete-modal-container").addClass("hidden");
    })
})
/*FILTER AND THEN GET */
$("#go-filter").click(function () {
    let search = $("#filter").val()
    if(search.length === 0) {
        errorMsj ($(".search-bar"), emptyError)
        return
    }
    $.ajax("/api/users?search=" + search,
    ).done(function (data) {
        $(".main-container").html("")
        $("#go-filter").siblings("#go-back").removeClass("hidden")
        append(data)
        if(data.length === 0) {
            errorMsj ($(".search-bar"), notFoundError)
        }
    })
})
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
//nodemon bin/www --ignore datos.json
/*
-validar en el edit.js
-cambiar las validaciones a inglés
-evitar que se appendee mas de una vez el mismo usuario (EN EL LADO DEL SERVIDOR Y DEL CLIENTE)
-hacer que cuando se presione enter, baje al proximo campo de texto (en añadir y editar)
-hacer que cuando se presione enter se active la búsqueda
*/