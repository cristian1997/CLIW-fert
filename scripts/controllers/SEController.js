class SEController {
    constructor(clientId, key) {
        this.clientId = clientId;
        this.key = key;
        this.defaultPath = 'https://api.stackexchange.com/2.2/';
    }

    eventWrapper(func) {
        let args = Array.prototype.splice.call(arguments, 1);
        return func.apply(this, args)
            .then((result) => {
                console.log(result);
                if (result.data !== undefined)
                    window.postMessage({
                        type: result.event,
                        payload: result.data
                    });
                else
                    throw "No data!";
            }).catch((err) => {
                window.postMessage({
                    type: AppConfig.EVENTS.ON_ERROR,
                    payload: err
                });
            });
    }

    authenticate(redirectUri) {
        let urlPath = "https://stackexchange.com/oauth/dialog";
        let scope = "write_access";
        if (!sessionStorage.getItem("authenticated")) {
            window.location = urlPath + "/?client_id=" + this.clientId + "&" + "scope=" + scope + "&" + "redirect_uri=" + redirectUri + "&" + "site=" + sessionStorage.getItem("site");
        } else {
            throw "Already authenticated!";
        }
    }

    async getUserInfo() {
        if (sessionStorage.getItem("authenticated") === null) {
            throw "Need to authenticate!";
        }
        if (sessionStorage.getItem("site") === null) {
            throw "Need to specify site!";
        }
        return fetch(this.defaultPath + "me?" + "key=" + this.key + "&" + "access_token=" + sessionStorage.getItem("access_token") + "&" + "site=" + sessionStorage.getItem("site"))
            .then(response => {
                if (!response.ok)
                    throw response.statusText;
                return response.json();
            })
            .then(data => {
                if (data.items[0] === undefined) {
                    window.postMessage({
                        type: AppConfig.EVENTS.NO_SITE_ACCOUNT,
                        data: null
                    });
                    throw "No account on chosen StackExchange site!";
                }
                return {
                    data: data.items[0],
                    event: AppConfig.EVENTS.RECEIVED_USER_INFO
                };
            })
            .catch(err => {
                throw err;
            });
    }

    async logout() {
        let failed = false;
        if (sessionStorage.getItem("authenticated") === null) {
            throw "Need to authenticate!";
        }
        return fetch(this.defaultPath + "access-tokens/" + sessionStorage.getItem("access_token") + "/invalidate?" + "key=" + this.key)
            .then(response => {
                if (!response.ok)
                    failed = true;
                return response.json();
            })
            .then(data => {
                if (failed) {
                    throw data.error_message;
                } else
                    return data.items[0];
            })
            .catch(err => {
                throw err;
            });
    }

    //Returns questions with specified page size and minimum 5 answers (accepted or not)
    async getQuestions(numberOfQuestions) {
        if (numberOfQuestions === undefined) {
            throw "Please specify the number of questions you want to retreive!";
        }
        return fetch(this.defaultPath + "search/advanced?" + "pagesize=" + numberOfQuestions + "&" + "site=" + sessionStorage.getItem("site") + "&" + "filter=" + "!--gVN.zYJKFz" + "&" + "key=" + this.key + "&" + "answers=5")
            .then(response => {
                if (!response.ok)
                    throw response.statusText;
                return response.json();
            })
            .then(data => {
                return data.items;
            })
            .catch((err) => {
                throw err;
            });
    }

    async getAnswers(questionId, numberOfAnswers) {
        if (questionId === undefined) {
            throw "No questionId error!";
        }
        if (numberOfAnswers === undefined) {
            throw "Please specify the number of answers you want to retreive!";
        }
        return fetch(this.defaultPath + "questions" + "/" + questionId + "/answers?" + "pagesize=" + numberOfAnswers + "&" + "site=" + sessionStorage.getItem("site") + "&" + "key=" + this.key + "&" + "filter=" + "!9Z(-wzftf")
            .then(response => {
                if (!response.ok)
                    throw response.statusText;
                return response.json();
            })
            .then(data => {
                return data.items;
            })
            .catch((err) => {
                throw err;
            });
    }

    async upvoteAnswer(answerId) {
        let failed = false;
        if (sessionStorage.getItem("authenticated") === null) {
            throw "Need to authenticate!";
        }
        if (answerId === undefined) {
            throw "No answerId error!";
        }
        return fetch(this.defaultPath + "answers" + "/" + answerId + "/upvote", {
                method: 'post',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: 'id=' + answerId + '&key=9)bOO0dxebBgnNxZafI7Tg((&access_token=' + sessionStorage.getItem("access_token") + '&preview=false&filter=default&site=' + sessionStorage.getItem("site")
            })
            .then(response => {
                if (!response.ok)
                    failed = true;
                return response.json();
            })
            .then(data => {
                if (failed) {
                    throw data.error_message;
                } else
                    return data;
            })
            .catch((err) => {
                throw err;
            });
    }

    async postAnswer(questionId, body) {
        let failed = false;
        if (sessionStorage.getItem("authenticated") === null) {
            throw "Need to authenticate!";
        }
        if (questionId === undefined) {
            throw "No questionId error!";
        }
        return fetch(this.defaultPath + "questions" + "/" + questionId + "/answers/add", {
                method: 'post',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: 'body=' + body + '&id=' + questionId + '&key=9)bOO0dxebBgnNxZafI7Tg((&access_token=' + sessionStorage.getItem("access_token") + '&preview=false&filter=default&site=' + sessionStorage.getItem("site")
            })
            .then(response => {
                if (!response.ok)
                    failed = true;
                return response.json();
            })
            .then(data => {
                if (failed) {
                    throw data.error_message;
                } else
                    return data;
            })
            .catch((err) => {
                throw err;
            });
    }

    async getBaseStats() {
        if (sessionStorage.getItem("authenticated") === null) {
            throw "Need to authenticate!";
        }
        if (sessionStorage.getItem("site") === null) {
            throw "Need to specify site!";
        }
        return fetch(this.defaultPath + "me?" + "key=" + this.key + "&" + "access_token=" + sessionStorage.getItem("access_token") + "&" + "site=" + sessionStorage.getItem("site") + "&" + "filter=!-*jbN*IioeFP")
            .then(response => {
                if (!response.ok)
                    throw response.statusText;
                return response.json();
            })
            .then(data => {
                return data.items[0];
            })
            .catch(err => {
                throw err;
            });
    }

    async getAnswersStats() {
        if (sessionStorage.getItem("authenticated") === null) {
            throw "Need to authenticate!";
        }
        if (sessionStorage.getItem("site") === null) {
            throw "Need to specify site!";
        }
        return fetch(this.defaultPath + "me/answers?" + "key=" + this.key + "&" + "access_token=" + sessionStorage.getItem("access_token") + "&" + "site=" + sessionStorage.getItem("site") + "&" + "filter=!-*jbN*IioeFP")
            .then(response => {
                if (!response.ok)
                    throw response.statusText;
                return response.json();
            })
            .then(data => {
                return data.items;
            })
            .catch(err => {
                throw err;
            });
    }

    async getTagsStats() {
        if (sessionStorage.getItem("authenticated") === null) {
            throw "Need to authenticate!";
        }
        if (sessionStorage.getItem("site") === null) {
            throw "Need to specify site!";
        }
        return fetch(this.defaultPath + "me/tags?" + "key=" + this.key + "&" + "access_token=" + sessionStorage.getItem("access_token") + "&" + "site=" + sessionStorage.getItem("site") + "&" + "filter=!-*jbN*IioeFP")
            .then(response => {
                if (!response.ok)
                    throw response.statusText;
                return response.json();
            })
            .then(data => {
                return data.items;
            })
            .catch(err => {
                throw err;
            });
    }

    async getTopTagsStats() {
        if (sessionStorage.getItem("authenticated") === null) {
            throw "Need to authenticate!";
        }
        if (sessionStorage.getItem("site") === null) {
            throw "Need to specify site!";
        }
        return fetch(this.defaultPath + "me/top-tags?" + "key=" + this.key + "&" + "access_token=" + sessionStorage.getItem("access_token") + "&" + "site=" + sessionStorage.getItem("site") + "&" + "filter=!-*jbN*IioeFP" + "&" + "pagesize=5")
            .then(response => {
                if (!response.ok)
                    throw response.statusText;
                return response.json();
            })
            .then(data => {
                return data.items;
            })
            .catch(err => {
                throw err;
            });
    }
}

var SE = new SEController(13513, '9)bOO0dxebBgnNxZafI7Tg((');