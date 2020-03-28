class App {
    constructor(){
        //check if there is stuff in local storage
        //if not, stuff needs to be stored
        //the counter needs to be updated

        //this makes sure that the api isn't being called too often
        let minutes = 5;
        let saved = localStorage.getItem('saved');
        if(saved && (new Date()).getTime() - saved > minutes * 1000){
            localStorage.clear()
            this.getLocation();
            this.lat;
            this.lng;
        }
        else if(saved == null){
            this.getLocation();
            this.lat;
            this.lng;
        }
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
            let summary = data.currently.summary.toLowerCase();
            let precipitation = data.currently.precipIntensity;
            let temperature = Math.round(data.currently.temperature);
            this.checkTemp(temperature, precipitation, summary);
            this.saveToStorage(temperature, precipitation, summary);
        }).catch(err => {
            console.log(err);
        });
    }

    checkTemp(temperature, precipitation, summary){
        let message = document.querySelector("#message");
        let background = document.querySelector("main");
        if(temperature < 10){
            message.innerHTML = "Let's stay inside and play some Animal Crossing";
            background.style.backgroundImage = "url('images/AnimalCrossing.jpg')";
            background.style.backgroundPositionX = "-525px";
        }
        else if(precipitation > 0){
            message.innerHTML = "It's " + summary + " right now, let's go out and play some Pokemon Go";
            background.style.backgroundImage = "url('images/PokemonGo.jpg')";
            background.style.backgroundPositionX = "-525px";
        }
    }
    saveToStorage(temperature, precipitation, summary){
        localStorage.setItem("temperature", JSON.stringify(temperature));
        localStorage.setItem("precipitation", JSON.stringify(precipitation));
        localStorage.setItem("summary", JSON.stringify(summary));
        localStorage.setItem('saved', new Date().getTime());
    }

    errorLocation(err){
        console.log(err);
    }
}

let app = new App();