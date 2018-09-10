window.Controller = {
    async friendsList(id) {
        const results = document.querySelector(id); //'left_list'        
        const friends = await Model.getFriends({ fields: 'photo_100' });        
        results.innerHTML = View.render('friends', { list: friends.items });
    }
}