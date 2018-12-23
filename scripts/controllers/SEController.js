class SEController {
    constructor(clientId, key) {
        this.clientId = clientId;
        this.key = key;
        this.defaultPath = 'https://api.stackexchange.com/2.2/';
        this.site = "stackoverflow";
    }

    authenticate(redirectUri) {
        let urlPath = "https://stackexchange.com/oauth/dialog";
        let scope = "write_access";
        if (!sessionStorage.getItem("authenticated")) {
            window.location = urlPath + "/?client_id=" + this.clientId + "&" + "scope=" + scope + "&" + "redirect_uri=" + redirectUri;
        } else {
            throw "Already authenticated!";
        }
    }

    async getUserInfo() {
        if (sessionStorage.getItem("authenticated") === null) {
            throw "Need to authenticate!";
        }
        if (sessionStorage.getItem("site") !== null) {
            site = sessionStorage.getItem("site");
        }
        return fetch(this.defaultPath + "me?" + "key=" + this.key + "&" + "access_token=" + sessionStorage.getItem("access_token") + "&" + "site=" + this.site)
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data.items[0];
            })
            .catch(err => {
                alert(err);
            });
    }

    async logout() {
        if (sessionStorage.getItem("authenticated") === null) {
            throw "Need to authenticate!";
        }
        return fetch(this.defaultPath + "access-tokens/" + sessionStorage.getItem("access_token") + "/invalidate?" + "key=" + this.key)
            .then(response => {
                return response.json();
            })
            .then(data => {
                sessionStorage.clear();
                return data.items[0];
            })
            .catch(err => {
                alert(err);
            });
    }

    async getQuestions(numberOfQuestions) {
        if (numberOfQuestions === undefined) {
            throw "Please specify the number of questions you want to retreive!"
        }
        return fetch(this.defaultPath + "questions?" + "pagesize=" + numberOfQuestions + "&" + "site=" + this.site + "&" + "filter=" + "!--gVN.zYJKFz" + "&" + "key=" + this.key)
            .then(result => {
                return result.json();
            })
            .then(data => {
                return data.items;
            })
            .catch((err) => {
                alert(err);
            });
    }
}

var SE = new SEController(13513, '9)bOO0dxebBgnNxZafI7Tg((');