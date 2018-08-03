

var config = {
	apiKey: "AIzaSyBwQnLTGlF1sFR28AQnme1h4gRVZbMRSiY",
	authDomain: "ongkir-a01d2.firebaseapp.com",
	databaseURL: "https://ongkir-a01d2.firebaseio.com",
	projectId: "ongkir-a01d2",
	storageBucket: "ongkir-a01d2.appspot.com",
	messagingSenderId: "768647343251"
};


module.exports = {
	start: function(firebase){
		firebase.initializeApp(config)
	}
}
