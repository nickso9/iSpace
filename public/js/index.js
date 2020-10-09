


/// Update bio/location/headline ///

$('.update-btn').on('click', (e) => {
    const location = $('#location').val()
    const headline = $('#headline').val()
    const bio = $('#bio').val()
    
    if (!location || !headline || !bio) {
        $('#error-update').show()
    } else {

    let updateUser = {
        id: e.target.id,
        location, 
        headline,
        bio 
    }

    $.ajax(`/users/${e.target.id}`, {
        method: 'PUT',
        data: updateUser
        })
        .then(() => {
            setTimeout(function(){
                window.location.reload();
         }, 1000);
        })
        .catch(err => console.log(err))
   }
    
})



// new post //

$('.post-form').on('submit', (e) => {
    e.preventDefault()
    const newHeadline = $('#headline-text').val()
    const newText = $('#post-text').val()
    const id = e.target.id
     
    const newPosts = {
    headline: newHeadline,
    text: newText,
    userId: id

    }

    if (!newHeadline || !newText) {
        $('#small-error-update').show()
    } else {

    $.ajax(`/users/${e.target.id}/posts`, {
        method: 'PUT',
        data: newPosts
        })
        .then(() => {
            setTimeout(function(){
                window.location.reload();
         }, 1000);
        })
        .catch(err => console.log(err))

    }

})

// delete post //

$('.wall-delete-btn').on('click', (e) => {
    const j = e.target
    const delData = { 
    postId: $(j).parents('.card').attr('id'),
    userId:e.target.id 
 
    }
    console.log(delData)
     $.ajax(`/users/${delData.userId}/posts`, {
         method: 'DELETE',
         data: delData
         })
         .then(() => {
         //     setTimeout(function(){
         //         window.location.reload();
         //  }, 1000);
         })
         .catch(err => console.log(err))
    
     
})

