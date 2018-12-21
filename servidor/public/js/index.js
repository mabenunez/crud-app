function append(data) {
    for (let i = 0; i < data.length; i++) {
        let id = data[i].id;
        let name = `<div>${data[i].name}</div>`;
        let phone = `<div>${data[i].phone}</div>`;
        let mail = `<div>${data[i].mail}</div>`;
        let lastname = `<div>${data[i].lastname}</div>`;
        let editIcon = `<a target="_blank" href="/users/edit-user?id=${id}"><i class="fas fa-user-edit"></i></a>`;
        let deleteIcon = `<a href="/api/users/${id}"><i class="fas fa-trash-alt delete"></i></a>`;
        $(".main-container").append(`<div class="row" id="${id}">${name}${lastname}${phone}${mail}<div>${deleteIcon}${editIcon}</div></div>`)
    }
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
    //Poner la funcion de validar aqui, en vez de poner return res.status(400), mostrar un msj de error
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
    const id = $(this).parent().parent().parent().attr("id"); // poner un data-id para no tener tres parents
    //o, el elemnto con class row que tenga el id tal
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
$("#go-filter").click(function () {
    let search = $("#filter").val()
    if(search.length === 0) {
        alert("el campo de texto no puede estar vacío")
        return
    }
    $.ajax("/api/users?search=" + search,
    ).done(function (data) {
        $(".main-container").html("")
        append(data)
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
        // } else{
        //             console.log(maxlength - currentLength + " chars left");
        //         }
    });
}
$(".char-counted").on("click", function() {
    $(".chars").html("")
    charLimit($(this))
})
//nodemon bin/www --ignore datos.json
/*
-PONER UN MENSAJE EN EL CASO DE QUE SE BUSQUE CON CHARS QUE NO EXISTEN EN NINGUN USUARIO CARGADO
-diseñar carteles de mensaje de error
-validador de chars en los nombres/phones/mails
-modals o carteles de success
-si el input de search esta vacio, me traiga todos los usuarios
-hacer que cuando se presione enter, baje al proximo campo de texto (en añadir y editar)
-hacer que cuando se presione enter se active la búsqueda
*/