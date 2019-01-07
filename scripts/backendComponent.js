import AppConfig from "./app.config.js";

document.getElementById("test").addEventListener("click", event => {
	window.postMessage({
		type: AppConfig.EVENTS.REQUEST_BE_STATISTICS,
		payload: null
	});
});

window.addEventListener("message", event => {
	switch(event.data.type) {
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