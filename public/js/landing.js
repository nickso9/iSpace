


$('#complete-reg').on('click', () => {

    $('#img-error-msg').empty()
    const checkImg = $('#img-check').attr('src')
    if (checkImg == './images/150.png') {
        $('#error-pic').show()
    } else {
        console.log('heheheh')

    $.ajax('/users/registration', {
    type: 'POST',
    data: {checkpicture: true}
    })
    .then(() => {
        console.log('ajax true')
        location.reload()
    })
    }
})




