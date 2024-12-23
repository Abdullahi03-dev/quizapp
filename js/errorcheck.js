function checkUser(key,redirectURL){
	if (localStorage.getItem(key)==null) {
		window.location=redirectURL;
	}
}