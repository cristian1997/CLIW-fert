import AppConfig from "./app.config.js";

document.getElementById("test").addEventListener("click", event => {
	window.postMessage({
		type: AppConfig.EVENTS.NORMAL_UPVOTE,
		payload: null
	});
});

window.addEventListener("message", event => {
	switch(event.data.type) {
		case AppConfig.EVENTS.NORMAL_UPVOTE:
			/* update database on BE */
			fetch("http://127.0.0.1:5500/update", {
				method: 'post',
				body: 'account_id=43279&nr_upvotes=1'
			})
			.catch(err => {
				console.log(err);
			});
			break
		
		case AppConfig.EVENTS.ACCEPTED_UPVOTE:
			/* update database on BE */
			fetch("http://127.0.0.1:5500/update", {
				method: 'post',
				body: 'account_id=43279&nr_accepted_answers=1'
			})
			.catch(err => {
				console.log(err);
			});
			break
		
		case AppConfig.EVENTS.SUBMIT_ANSWER:
			/* update database on BE */
			fetch("http://127.0.0.1:5500/update", {
				method: 'post',
				body: 'account_id=43279&nr_posted_answers=1'
			})
			.catch(err => {
				console.log(err);
			});
			break
		
		case AppConfig.EVENTS.REQUEST_BE_STATISTICS:
			fetch("http://127.0.0.1:5500/statistics?account_id=" + 43279)
			.then(response => response.json())
			.then(response => {
				window.postMessage({
					type: AppConfig.EVENTS.RECEIVED_BE_STATISTICS,
					payload: response
				});
			})
			.catch(err => {
				console.log(err);
			});
			break
		
		case AppConfig.EVENTS.RECEIVED_BE_STATISTICS:
			console.log("RECEIVED_BE_STATISTICS");
			statistics = event.data.payload;
			// statistics.account_id
			// statistics.nr_upvotes
			// ...
			break
	}
});