import MapboxGl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import State from './components/State';
import { Form } from './components/Form';
import { RadioGroup } from './components/RadioGroup';
import { SelectionElement } from './components/SelectionElement';
import { TownDateTime, WeatherGroup } from './components/WeatherGroup';
import markerBlue from '../images/markerBlue.png';
import { Location } from './components/LocationGroup';
import Renderer from './dom/Renderer';
import getCurrentPosition from './service/getCurrentPosition';
import getIPAddress from './service/getIPAddress';
import getLinkToImage from './service/getLinkToImage';
import getGeocoding from './service/getGeocoding';
import getGeocodingRev from './service/getGeocodingRev';
import getDarkSky from './service/getDarkSky';
import Languages from './translations';
import { getSeason, getTimeOfDay } from './utils';

function RefreshButton(onClick) {
  const refreshButton = Renderer.createElement('button', {
    type: 'button',
    id: 'refreshBtn',
    class: 'btn refreshBtn',
  });

  refreshButton.addEventListener('click', onClick);

  return refreshButton;
}

const languageOptions = [
  { value: Languages.EN, text: 'en' },
  { value: Languages.RU, text: 'ru' },
  { value: Languages.BE, text: 'be' },
];

class App {
  constructor() {
    this.state = new State({
      geolocation: {},
      place: {},
      language: localStorage.getItem('lang') || 'en',
      searchFormValues: '',
      backgroundImgUrl: '',
      weather: {},
      radioGroupChoice: localStorage.getItem('radioGroupChoice') || 'C',
    });

    this.setState = this.setState.bind(this);

    this.handleLanguageSelectChange = this.handleLanguageSelectChange.bind(this);
    this.handleRefreshButtonClick = this.handleRefreshButtonClick.bind(this);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this);

    this.searchForm = new Form({
      onSubmit: this.handleSearchFormSubmit,
      language: this.state.getState().language,
    });
    this.updateSearchForm = this.updateSearchForm.bind(this);
    this.state.subscribe(this.updateSearchForm);

    this.location = new Location(
      this.state.getState().geolocation,
      this.state.getState().language,
    );
    this.updateLocationGroup = this.updateLocationGroup.bind(this);
    this.state.subscribe(this.updateLocationGroup);

    this.townDateTime = new TownDateTime(
      this.state.getState().place,
      this.state.getState().language,
      this.state.getState().weather.timezone,
      this.state.getState().weather.offset,
    );
    this.updateTownDateTime = this.updateTownDateTime.bind(this);
    this.state.subscribe(this.updateTownDateTime);

    this.weatherGroup = new WeatherGroup({
      weatherData: this.state.getState().weather,
      radioGroupChoice: this.state.getState().radioGroupChoice,
      language: this.state.getState().language,
    });
    this.updateWeatherGroup = this.updateWeatherGroup.bind(this);
    this.state.subscribe(this.updateWeatherGroup);

    this.updateBackgroundImg = this.updateBackgroundImg.bind(this);

    this.radioGroup = new RadioGroup(
      this.handleRadioGroupChange,
      this.state.getState().radioGroupChoice,
    );

    this.selectLanguage = new SelectionElement(
      languageOptions,
      this.handleLanguageSelectChange,
      this.state.getState().language,
    );
  }

  setState(nextState) {
    this.state.update(nextState);
    this.state.notify();
  }

  async handleLanguageSelectChange(value) {
    localStorage.setItem('lang', value);

    const {
      lat, lng, city, country, continent,
    } = await getGeocodingRev(
      this.state.getState().geolocation,
      value,
    );

    const weatherData = await getDarkSky(lat, lng, value);

    this.setState({
      language: value,
      place: { city, country, continent },
      weather: weatherData,
    });
  }

  handleRadioGroupChange(value) {
    localStorage.setItem('radioGroupChoice', value);
    this.setState({ radioGroupChoice: value });
  }

  async handleSearchFormSubmit({ searchInput: value }) {
    const lang = this.state.getState().language;

    const {
      lat, lng, city, country, continent,
    } = await getGeocoding(value, lang);

    const weatherData = await getDarkSky(lat, lng, lang);

    this.setState({
      geolocation: { latitude: lat, longitude: lng },
      searchFormValues: value,
      weather: weatherData,
      place: { city, country, continent },
    });

    this.handleRefreshButtonClick();

    const { map, languageManager } = this.state.getState().mapBox;
    map.setCenter([lng, lat]);
    map.setZoom(10);

    const mapStyle = map.getStyle();
    const localLang = (lang !== 'be') ? lang : 'en';
    languageManager.setLanguage(mapStyle, localLang);

    const el = document.createElement('div');
    el.className = 'marker';

    new MapboxGl.Marker(el, { offset: [0, 0] })
      .setLngLat([lng, lat])
      .addTo(map);
  }

  async handleRefreshButtonClick() {
    const season = getSeason(
      this.state.getState().language,
      this.state.getState().weather.timezone,
      this.state.getState().weather.offset,
    );

    const timeOfDay = getTimeOfDay(
      this.state.getState().language,
      this.state.getState().weather.timezone,
      this.state.getState().weather.offset,
    );

    const url = await getLinkToImage({
      req1: this.state.getState().weather.currently.icon
        ? this.state.getState().weather.currently.icon
        : 'stars',
      req2: timeOfDay || '',
      req3: season || '',
      // req4: this.state.getState().place.continent
      //   ? this.state.getState().place.continent
      //   : '',
    });

    this.setState({ backgroundImgUrl: url });
    this.updateBackgroundImg(url);
  }

  updateSearchForm() {
    this.searchForm.update(this.state.getState().language);
  }

  updateLocationGroup() {
    this.location.update(
      this.state.getState().geolocation,
      this.state.getState().language,
    );
  }

  updateTownDateTime() {
    this.townDateTime.update(
      this.state.getState().place,
      this.state.getState().language,
      this.state.getState().weather.timezone,
      this.state.getState().weather.offset,
    );
  }

  updateWeatherGroup() {
    this.weatherGroup.update({
      weatherData: this.state.getState().weather,
      radioGroupChoice: this.state.getState().radioGroupChoice,
      language: this.state.getState().language,
    });
  }

  updateBackgroundImg(link) {
    this.el = document.getElementById('app');
    this.el.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5),  rgba(0, 0, 0, 0.5)), url(${link})`;
  }

  async didMount() {
    const { language } = this.state.getState();

    async function getPos() {
      try {
        const res = await getCurrentPosition();
        return res;
      } catch (e) {
        console.log(`Something wrong with getCurrentPosition(): ${e}`);
        const res = await getIPAddress();
        return res;
      }
    }

    const result = await getPos();
    const { latitude: initLat, longitude: initLong } = result;

    const place = await getGeocodingRev({ latitude: initLat, longitude: initLong }, language);

    const {
      lat, lng, city, country, continent,
    } = place;

    const weatherData = await getDarkSky(lat, lng, language);

    const season = getSeason(language, weatherData.timezone, weatherData.offset);
    const timeOfDay = getTimeOfDay(language, weatherData.timezone, weatherData.offset);

    const url = await getLinkToImage({
      req1: weatherData.currently.icon ? weatherData.currently.icon : 'stars',
      req2: timeOfDay || '',
      req3: season || '',
    });

    this.updateBackgroundImg(url);

    const options = {
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [lng, lat], // starting position [lng, lat]
      zoom: 10, // starting zoom
      accessToken: 'pk.eyJ1IjoicnZpdGFseSIsImEiOiJjazQwYTB4Y3MwMHZ6M2RrOXh1aXhzbWZkIn0.RGahq-joI0XvHkd1R4OsPA',
    };

    MapboxGl.setRTLTextPlugin(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
    );

    const map = new MapboxGl.Map(options);

    const languageManager = new MapboxLanguage({
      defaultLanguage: 'en',
    });

    map.addControl(languageManager);

    const localLang = (language !== 'be') ? language : 'en';
    map.on('load', () => {
      map.setLayoutProperty('country-label', 'text-field', [
        'format',
        ['get', `name_${localLang}`], { 'font-scale': 1.2 },
        '\n',
        {},
        ['get', 'name'],
        {
          'font-scale': 0.8,
          'text-font': ['literal', ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']],
        },
      ]);
    });

    map.on('load', () => {
      map.loadImage(markerBlue, (error, image) => {
        if (error) throw error;
        map.addImage('custom-marker', image);
        map.addLayer({
          id: 'markers',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: [lng, lat],
                  },
                },
              ],
            },
          },
          layout: {
            'icon-image': 'custom-marker',
          },
        });
      });
    });

    this.setState({
      geolocation: { latitude: lat, longitude: lng },
      place: { city, country, continent },
      weather: weatherData,
      backgroundImgUrl: url,
      mapBox: { map, languageManager },
    });
  }

  render() {
    const refreshButton = RefreshButton(this.handleRefreshButtonClick);

    const selectLanguage = this.selectLanguage.render();

    const radioGroup = this.radioGroup.render();

    const searchForm = this.searchForm.render();

    const controllers = Renderer.createElement('div', {
      id: 'controllers',
      class: 'controllers',
      children: [refreshButton, selectLanguage, radioGroup, searchForm],
    });

    const townDateTime = this.townDateTime.render();

    const weatherGroup = this.weatherGroup.render();

    const weathers = Renderer.createElement('div', {
      id: 'weathers',
      class: 'weathers',
      children: [townDateTime, weatherGroup],
    });

    const location = this.location.render();

    const timerInterval = setInterval(
      () => {
        this.townDateTime.update(
          this.state.getState().place,
          this.state.getState().language,
          this.state.getState().weather.timezone,
          this.state.getState().weather.offset,
        );
      },
      60000,
    );

    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000;
    const timerId = setTimeout(
      () => timerInterval,
      delay,
    );

    window.addEventListener('beforeunload', () => {
      clearTimeout(timerId);
    });

    return Renderer.createElement('div', {
      id: 'main',
      class: 'main',
      children: [controllers, weathers, location],
    });
  }
}

export default App;
