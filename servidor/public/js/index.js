let mailError = "Ésta dirección de mail no es válida";
let nameError = "Éste campo solo debe contener letras";
let phoneError = "Éste campo solo debe contener números";
let emptyError = "Éste campo debe ser completado";
let errorSign = `<div class="error-msj"><span>${emptyError}</span></div>`;
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
    if (validateEmail(addedMail) === false){
        $("#add-mail").parent().append(`<div class="error-msj"><span>${mailError}</span></div>`)
        setTimeout(function () {
            $(".error-msj").remove();
        }, 3000); 
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
    )
})
//DELETE
$(document).on("click", ".delete", function() {
    const id = $(this).parent().parent().parent().attr("id");
    $("#modal-container").removeClass("hidden");
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
        $("#modal-container").addClass("hidden");
    })

})


//`<a href="/api/users/${id}"></i></a>`



//     window.location.href = window.location.href + "/" + id;
    
//     $.ajax(
//         "http://localhost:3000/api/users/" + id,
//         {
//             method: "DELETE",
//         }
//     ).done(function () {
//         location.reload("http://localhost:3000/users/")
//     })







$("#go-filter").click(function () {
    let search = $("#filter").val()
    if(search.length === 0) {
        $(".search-bar").append(`<div class="error-msj"><span>${emptyError}</span></div>`);
        setTimeout(function () {
            $(".error-msj").remove();
        }, 3000); 
        return
    }
    $.ajax("/api/users?search=" + search,
    ).done(function (data) {
        $(".main-container").html("")
        append(data)
        if(data.length === 0) {
            $("#not-found").removeClass("hidden");
        }
        $(".search-bar").append(`<a href="/users/"><button>Go back</button></a>`);
    })
})
function charLimit(clickedInput) {
    let maxlength = clickedInput.attr("maxlength");
    clickedInput.on("input", function(){
        var str = clickedInput.val()
        let currentLength = str.length;
        $(this).siblings("p").html(currentLength + "/" + maxlength)
        // if( currentLength >= maxlength -1 ){
        //     console.log("f")
        // }
    });
}
$(".char-counted").on("click", function() {
    $(".chars").html("")
    charLimit($(this))
})
//nodemon bin/www --ignore datos.json
/*
-diseñar carteles de mensaje de error
-validador de chars en los nombres/phones/mails
-modals o carteles de success
-hacer que cuando se presione enter, baje al proximo campo de texto (en añadir y editar)
-hacer que cuando se presione enter se active la búsqueda
*/