
// YAHOO API
const query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"%s\")";
const url = "https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=";

class Weather {
  constructor(options) {
    this.city = options.city;
    this.search = options.search;
    
    // Add event Click
    this.search.addEventListener('click', this.submit.bind(this), false);

    // Add event handler for Enter key
    this.city.addEventListener('keypress', (event) => {
      // remove error styling as soon as user starts typing
      this.city.classList.remove('error');

      if (event.keyCode === 13) {
        this.submit();
      }
    });
  }

  submit() {
    // always remove error styling on submit
    this.city.classList.remove('error');

    if (!this.city.value) {
      this.city.classList.add('error');
      return;
    }

    //Loading...
    this.displayHTML('<img src=\'images/loading.gif\'>');

    //Get Data Forecast
    this.showForecast();
  }

  //Get the data and show
  showForecast() {
    this.get(this.buildRequest(this.city.value)).then((response) => {

      console.log('Success!');

      // Maybe insert in a "render" function ?
      let forecastData = response.query.results.channel.item.forecast;
      let html = "<h2>Next Days</h2>";

      //Loop untill get 5 days and add to html
      for (let i = 1; i <= 5; i++) {
        let date = forecastData[i].date;
        let text = forecastData[i].text;
        let high = forecastData[i].high;
        let low = forecastData[i].low;
        let code = forecastData[i].code;

        html += "<div class='day'>";
        html += "<div class='date'><h3>" + date + "</h3></div>";
        html += "<div class='text weather-icon-" + code + "'><h3>" + text + "</h3></div>";
        html += "<div class='min'>Min: " + low + "</div>";
        html += "<div class='max'>Max: " + high + "</div>";
        html += "</div>";
      }

      this.displayHTML(html);


    }, function (error) { 
      console.error("Failed!", error);
    });
  }

  // Add html to the page
  displayHTML(html) {
    document.getElementById('forecast').innerHTML = html;
  }

  // Make request to the yahoo API
  buildRequest(text) {
    return url + escape(query.replace('%s', text));
  }

  // Ajax call function
  get(url) {
    // Return a new promise.
    return new Promise(function (resolve, reject) {
      // Do the usual XHR stuff
      fetch(url)
        .then(function (response) {
          if (response.ok) {
            return response.json().then(json => resolve(json));
          }
        })
        .catch(function (body) {
          reject(new Error(body));
        });
    });
  }
}

export default Weather;
