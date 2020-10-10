


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
    const sameName = $('#check-user').text()
    const serBtn = e.target
    const searchTerm = $(serBtn).children().children('input').val()

    if (searchTerm == sameName) {

        $(".friend-div").empty()
        const nouser = $('<p class="text-center" style="font-size: 12px; color: red; margin-bottom: 10px;">Cannot add yourself</p>')
        $(".friend-div").append(nouser)

    }   else if (!searchTerm) {

        $(".friend-div").empty()
        const nouser = $('<p class="text-center" style="font-size: 12px; color: red; margin-bottom: 10px;">Empty fields</p>')
        $(".friend-div").append(nouser)

    } else {
    
        $.ajax(`/users/search` , {
            method: 'GET',
            data: searchTerm,
            success: function(response) {

                if (!response) {

                    $(".friend-div").empty()
                    const nouser = $('<p class="text-center" style="font-size: 12px; color: red; margin-bottom: 10px;">No User Found</p>')
                    $(".friend-div").append(nouser)
        
                } else { 
                        const friendDiv = $(".friend-div")
            
                        friendDiv.empty()
                        const friendSearch = `<div class="card bg-light" style="border: 1px solid rgb(255, 145, 0)">
                        <div class="row m-0">
                        <div class="">
                            <img src="${response.image}" class="card-img-friend" alt="...">
                        </div>
                        <div class="card-body border-0">
                            <h5 class="card-title">${response.username}</h5>
                            <p class="card-text">${response.location}</p>
                        </div>
                        <div class="d-flex" style="position: relative">
  
                            <button type="submit" class="btn friend-add-btn align-self-end m-3" id="${response.userId}">Add friend</button>
                            <span class="error-friend" style="font-size: 10px; color: red; display: none; position: absolute; bottom: 0">Friend requests pending</span> 
                            <span class="success-friend" style="font-size: 10px; color: green; display: none; position: absolute; bottom: 0">Requested friendship</span>   
                        </div>
                        
                        </div>
                    </div>`
                    friendDiv.append(friendSearch)
                }
            },      
    
            error: function(error) {
                console.log(error)
            }

        })
    }
})

// add friend button //


$('.friend-div').on('click', '.friend-add-btn', (e) => {
    const idToAdd = e.target.id
    const userReq = $('.update-btn').attr('id')
    
    const pendData = {
        idToAdd,
        userReq
    }

    $.ajax(`/users/pendingfriends`, {
        method: 'POST',
        data: pendData
        })
        .then((addUser) => {
            if (!addUser) {
                $(".success-friend").hide()
                $(".error-friend").show()
                // const alreadyAdd = '<span style="font-size: 10px; color: red;">Friend requests pending</span>'
                // $(".error-friend").append(alreadyAdd)
            } else {
                $(".success-friend").show()
            }


            
        })
        .catch(err => console.log(err))


   

})