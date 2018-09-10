window.Model = {
    login(appId, perms) {
        return new Promise((resolve, reject) => {
            VK.init({
                apiId: appId
            });

            VK.Auth.login(response => {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, perms);
        });
    },
    callApi(method, params) {
        params.v = params.v || '5.78';

        return new Promise((resolve, reject) => {
            VK.api(method, params, response => {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    resolve(response.response);
                }
            });
        });
    },
    getFriends(params = {}) {
        return this.callApi('friends.get', params);
        /*return {
            items: [
                {
                    first_name: "Travolta",
                    last_name: "Johh",
                    photo_100: "img/user.png"
                },
                {
                    first_name: "Ritchy",
                    last_name: "Guy",
                    photo_100: "img/user.png"
                },
                {
                    first_name: "Unknown",
                    last_name: "Player",
                    photo_100: "img/user.png"
                }
            ]
        }*/
    }
}