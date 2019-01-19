document.getElementById("dashboard-link").onclick = function(e) {
	if(!isAuthenticated()) {
		showPopupError("Need to authenticate!")
		e.preventDefault();
	} else {
		this.setAttribute("href", "./dashboard.html?account_id=" + sessionStorage.getItem("account_id"));
	}
};