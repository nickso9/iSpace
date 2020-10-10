


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
          }, 1000);
         })
         .catch(err => console.log(err))
    
     
})

/// find friend ////

$('.form-friend-search').on('submit', (e) => {
    e.preventDefault()
    const serBtn = e.target
    const searchTerm = $(serBtn).children('input').val()
    // console.log(searchTerm)
    $.ajax(`/users/search` , {
        method: 'GET',
        data: searchTerm,
        success: function(response) {
            const friendDiv = $(".friend-div")

            friendDiv.empty()
            const friendSearch = `<div class="card mb-3" style="">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${response.image}" class="card-img" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${response.username}</h5>
                  <p class="card-text">${response.location}</p>
                  
                </div>
              </div>
            </div>
          </div>`


            // const userName = $(`<p>${response.username}</p>`)
            // const location = $(`<p>${response.location}<p>`)
            // const image = $(`<p>${response.image}<p>`)

            friendDiv.append(friendSearch)

        // console.log(response.userId)
        // console.log(response.username)
        // console.log(response.location)
        // console.log(response.image)




        },
        error: function(error) {
            console.log(error)
        }
    //     console.log('then')
    //     setTimeout(function(){
    //         window.location.reload();
    //  }, 1000);
    })
    

})