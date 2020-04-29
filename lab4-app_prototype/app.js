class App {
    constructor(){
        this.getLocation();   
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
            this.getFilm();
            let message = document.querySelector("#message");
            message.innerHTML = "It's " + summary + " right now, let's watch:";
        }).catch(err => {
            console.log(err);
        });
    }
    getFilm(){
        var films = ["night+of+the+living+dead", "the+thing", "thor+ragnarok", "parasite", "portrait+of+a+lady+on+fire", "knives+out", "midsommar", "the+lighthouse", "once+upon...+a+time+in+hollywood", "her", "total+recall"]
        let number = Math.floor((Math.random() * 10) + 1);
        let url = `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=` + films[number] + `&apikey=3626e9cb`;
        console.log(url);
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            let title = data.Title;
            let poster = data.Poster;
            let background = document.querySelector("main");
            let displayTitle = document.getElementById("title");
            background.style.backgroundImage = "url('" + poster + "')";
            displayTitle.innerHTML = title;
        }).catch(err => {
            console.log(err);
        });
    }

    errorLocation(err){
        console.log(err);
    }
}

let app = new App();