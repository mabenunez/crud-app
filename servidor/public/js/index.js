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
    $.ajax(
        "http://localhost:3000/api/users",
        {
            method: "POST",
            data: {
                name: $("#add-name").val(),
                lastname: $("#add-lastname").val(),
                phone: $("#add-phone").val(),
                mail: $("#add-mail").val()
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
            // success: function () {
            //     $("#" + id).remove()
            // }
        }
    ).done(function () {
        location.reload("http://localhost:3000/users/")
    })
})
$("#go-filter").click(function () {
    $.ajax("/api/users?search=" + $("#filter").val(),
    ).done(function (data) {
        $(".main-container").html("")
        append(data)
    })
})
function charLimit(clickedInput) {
    let maxlength = clickedInput.attr("maxlength");
    let currentLength = 0;
    clickedInput.on("input", function(){
        currentLength = currentLength + 1
        $(this).siblings("p").html(currentLength + "/" + maxlength)
        // if( currentLength >= maxlength -1 ){
        //     console.log("f")
        // } else{
        //             console.log(maxlength - currentLength + " chars left");
        //         }
    });
}
//ponerle una clase a estos inputs para que el de search no dispare esta funcion
$("input").on("click", function() {
    $(".chars").html("")
    charLimit($(this))
})