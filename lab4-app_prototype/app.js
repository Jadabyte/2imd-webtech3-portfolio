class App {
    constructor(){
        this.getLocation();
        this.lat;
        this.lng;
    }

    getLocation(){
        navigator.geolocation.getCurrentPosition(
            this.gotLocation.bind(this), 
            this.errorLocation.bind(this)
        );
    }

    gotLocation(result){
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        this.getWeather();
    }

    getWeather(){

        let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/3416c702aea211069badc03171a6da3c/${this.lat},${this.lng}?units=si`;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            document.querySelector("#weather").innerHTML = data.currently.temperature;
        }).catch(err => {
            console.log(err);
        });
    }

    errorLocation(err){
        console.log(err);
    }
}

let app = new App();