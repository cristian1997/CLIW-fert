
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('form-submit-button').addEventListener('click', function() {
		var username = document.getElementById('form-username').value;
		var email = document.getElementById('form-email').value;
		var password = document.getElementById('form-password').value;
		var confirm_password = document.getElementById('form-confirm-password').value;

		// if(password != confirm_password) {
		// 	document.getElementById('confirm-password-error').innerText = 'passwords do not match';
		// } else {
		// 	document.getElementById('confirm-password-error').innerText = '';
		// }
	});
});
