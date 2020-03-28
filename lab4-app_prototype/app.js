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

        let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e4f9c347eee0e309163dfee2b479555e/${this.lat},${this.lng}?units=si`;
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            document.querySelector("#weather").innerHTML = "It is currently " + Math.round(data.currently.temperature) + "°C";
            let precipitation = data.currently.precipIntensity;
            let temperature = Math.round(data.currently.temperature);
            this.checkTemp();
        }).catch(err => {
            console.log(err);
        });
    }

    checkTemp(temperature, precipitation){
        let message = document.querySelector("#message");
        let background = document.querySelector("main");
        if(temperature < 20 || precipitation > 0){
            message.innerHTML = "Let's stay inside and play some Animal Crossing New Leaf";
            background.style.background = "url('images/AnimalCrossing.jpg')";
        }
        else if(temperature > 20){
            message.innerHTML = "Let's go out and play some Pokemon Go";
            background.style.background = "url('images/PokemonGo.jpg')";
        }
    }

    errorLocation(err){
        console.log(err);
    }
}

let app = new App();