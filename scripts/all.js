var dashboardParams = "account_id%3D" + sessionStorage.getItem("account_id");
dashboardParams += "%26user_id%3D" + sessionStorage.getItem("user_id");
dashboardParams += "%26site%3D" + sessionStorage.getItem("site");


window.addEventListener("load", function() {
	document.getElementById("dashboard-link").onclick = function (e) {
		this.setAttribute("href", "./dashboard.html?" + dashboardParams);
	};

	document.getElementById("fb-share-button").href =
		"https://www.facebook.com/sharer/sharer.php?u=https://127.0.0.1:5500/dashboard.html?" + dashboardParams;
	document.getElementById("twitter-share-button").href =
		"https://twitter.com/intent/tweet?text=https://127.0.0.1:5500/dashboard.html?" + dashboardParams;
});