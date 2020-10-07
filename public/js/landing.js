


$('#complete-reg').on('click', () => {

    $('#img-error-msg').empty()
    const checkImg = $('#img-check').attr('src')
    if (checkImg == './images/150.png') {
        $('#error-pic').show()
        
    } else {

    $.ajax('/users/registration', {
    type: 'POST',
    data: {checkpicture: true}
    })
    .then(() => {
        location.reload()
    })
    }
})




