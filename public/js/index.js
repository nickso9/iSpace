

$('.update-btn').on('click', (e) => {
    e.preventDefault()
    console.log(e.target.id)
    let updateUser = {
        id: e.target.id,
        location: $('#location').val(),
        headline: $('#location').val(),
        bio: $('#location').val()
    }
    

    $.ajax(`/users/${e.target.id}`, {
        method: 'PUT',
        data: updateUser
        })
        .then(() => {
            console.log('updated')
        })
        .catch(err => console.log(err))

    
})
