var escapedDashboardParams = "user_id%3D" + sessionStorage.getItem("user_id");
escapedDashboardParams += "%26site%3D" + sessionStorage.getItem("site");

var dashboardParams = "user_id=" + sessionStorage.getItem("user_id");
dashboardParams += "&site=" + sessionStorage.getItem("site");


window.addEventListener("load", function() {
	document.getElementById("dashboard-link").onclick = function (e) {
		this.setAttribute("href", "./dashboard.html?" + dashboardParams);
	};

	document.getElementById("fb-share-button").href =
		"https://www.facebook.com/sharer/sharer.php?u=http%3A//127.0.0.1%3A5500/dashboard.html%3F" + escapedDashboardParams;
	document.getElementById("twitter-share-button").href =
		"https://twitter.com/intent/tweet?text=http%3A//127.0.0.1%3A5500/dashboard.html%3F" + escapedDashboardParams;
});