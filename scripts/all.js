document.getElementById("dashboard-link").onclick = function (e) {
	this.setAttribute("href", "./dashboard.html?account_id=" + sessionStorage.getItem("account_id") + "&" + "user_id=" + sessionStorage.getItem("user_id") + "&" + "site=" + sessionStorage.getItem("site"));
};