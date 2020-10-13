
/// find friend ////

$('.form-friend-search').on('submit', (e) => {
    e.preventDefault()
    const idOfUser = $('.user-profile').children().eq(1).attr('id')
    const sameName = $('#check-user').text().toLowerCase()
    const serBtn = e.target
    const searchTerm = $(serBtn).children().children('input').val().toLowerCase()

    const DataToSearch = { idOfUser, searchTerm }

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
            data: DataToSearch,
            success: function(response) {
                if (!response) {

                    $(".friend-div").empty()
                    const nouser = $('<p class="text-center" style="font-size: 12px; color: red; margin-bottom: 10px;">No User Found</p>')
                    $(".friend-div").append(nouser)
        
                } else if (response == 'alreadyfriend') {
                    
                    $(".friend-div").empty()
                    const nouser = $('<p class="text-center" style="font-size: 12px; color: red; margin-bottom: 10px;">User already friended</p>')
                    $(".friend-div").append(nouser)
                
                
                } else { 
                        const friendDiv = $(".friend-div")
                        friendDiv.empty()
                        const friendSearch = `<div class="card bg-light" style="">
                        <div class="row m-0">
                            <img src="${response.image}" class="card-img-friend">
                        <div class="card-body border-0">
                            <h5 class="card-title">${response.username}</h5>
                            <p class="card-text">${response.location}</p>
                        </div>
                        <div class="d-flex" style="position: relative">
                            <button type="submit" class="btn friend-add-btn align-self-end m-3" id="${response.userId}">Add friend</button>
                            <span class="error-friend" style="font-size: 10px; color: red; display: none; position: absolute; bottom: 0">Pending their apporval.</span> 
                            <span class="error-friend2" style="font-size: 10px; color: red; display: none; position: absolute; bottom: 0">Pending your apporval.</span> 
                            <span class="success-friend" style="font-size: 10px; color: green; display: none; position: absolute; bottom: 0">Requested friendship.</span>   
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
    const newImage = $('#check-image').attr('src')
    const newLoc = $('#check-location').html()
    const newUser = $('#check-user').html()

    const pendData = {
        idToAdd,
        userReq,
        newImage,
        newLoc,
        newUser
    }

    $.ajax(`/users/pendingfriends`, {
        method: 'POST',
        data: pendData
        })
        .then((addUser) => {
            if (addUser == 'alreadysent') {
                $(".success-friend").hide()
                $(".error-friend").show()
            } else if (addUser == 'useralready') {
                $(".success-friend").hide()
                $(".error-friend2").show()   
            } else {
                $(".success-friend").show()
            }
            
        })
        .catch(err => console.log(err))

})

// add pending friend/ delete pending friend // 


$('.friend-pending-btn').on('click',  (e) => {
    const pendingIdToDel = $(e.target).parent().parent().parent().attr('id')
    const idToFriend = e.target.id
    const idOfMe = $('.friend-div').attr('id')
    const pendingOption = $(e.target).attr('data-value')

    const DataToFriend = {
        idOfMe,
        idToFriend,
        pendingOption
    }
    $.ajax(`/users/friends`, {
        method: 'POST',
        data: DataToFriend
        })
        .then((e) => {
            setTimeout(function(){
                window.location.reload();
         }, 200);
            
        })
        .catch(err => console.log(err))

})


// remove friend //

$('.friend-remove-btn').on('click', (e) => {
    const idOfUser = $('.friend-div').attr('id')
    const friendIdToDel = e.target.id
    const dataToDelete = {
        idOfUser,
        friendIdToDel
    }

    $.ajax(`/users/friends`, {
        method: 'DELETE',
        data: dataToDelete
        })
        .then((e) => {
            setTimeout(function(){
                window.location.reload();
         }, 200);
            
        })
        .catch(err => console.log(err))


})