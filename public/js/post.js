

// new post //

$('.post-form').on('submit', (e) => {
    e.preventDefault()
   
    const newHeadline = $('.headline-text').val()
    const newText = $('.post-text').val()
    const id = e.target.id
    if (!newHeadline || !newText) {
        $('#small-error-update').show()
    } else {
    
    const newPosts = {
    headline: newHeadline,
    text: newText,
    userId: id,
    postId: id,
    wallPost: false
    }    

    $.ajax(`/users/${e.target.id}/posts`, {
        method: 'PUT',
        data: newPosts
        })
        .then(() => {
            setTimeout(function(){
                window.location.reload();
         }, 200);
        })
        .catch(err => console.log(err))

    }

})

// delete post //

$('.wall-delete-btn').on('click', (e) => {
    const walDel = e.target
    const delData = { 
    postId: $(walDel).parents('.card').attr('id'),
    userId: e.target.id 
    }
     $.ajax(`/users/${delData.userId}/posts`, {
         method: 'DELETE',
         data: delData
         })
         .then(() => {
             setTimeout(function(){
                 window.location.reload();
          }, 200);
         })
         .catch(err => console.log(err))
    
     
})


// wall post // 

$('.post-form-wall').on('submit', (e) => {
    e.preventDefault()
    const newHeadlineWall = $(e.target).children().children('input').val()
    const newTextWall = $(e.target).children().children('textarea').val()
    const wallUserId = $(e.target).children('button').attr('id')
    const wallPosterId = $('.post-form').attr('id')
    if (!newHeadlineWall || !newTextWall) {
        $(e.target).children('#small-error-update-wall').show()
        console.log('in here')
    } else {
        $(e.target).children('#small-error-update-wall').hide()
        $(e.target).children('#small-success-update-wall').show()
    const newPosts = {
    headline: newHeadlineWall,
    text: newTextWall,
    userId: wallPosterId,
    postId: wallUserId,
    wallPost: true
    }    
    $.ajax(`/users/${wallPosterId}/posts`, {
        method: 'PUT',
        data: newPosts
        })
        .then(() => {
            setTimeout(function(){
                window.location.reload();
         }, 200);
        })
        .catch(err => console.log(err))

    }

})