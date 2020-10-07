


$('#complete-reg').on('click', () => {

    const checkImg = $('#img-check').attr('src')
    if (checkImg == './images/150.png') {
        $('#error-pic').show()
    } else {

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




