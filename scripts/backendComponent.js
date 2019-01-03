import AppConfig from "./app.config.js";

window.addEventListener("message", event => {
	switch(event.data.type) {
		case AppConfig.EVENTS.REQUEST_BE_STATISTICS:
			console.log("REQUEST_BE_STATISTICS");
			break
		
		case AppConfig.EVENTS.RECEIVED_BE_STATISTICS:
			console.log("RECEIVED_BE_STATISTICS");
			break
	}
});