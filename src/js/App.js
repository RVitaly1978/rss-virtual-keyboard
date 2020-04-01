import Renderer from './dom/Renderer';

import State from './components/State';
import Keyboard from './components/Keyboard';
// import Button from './components/Button';

import KeyboardDescriptions from './constants/KeyboardDescriptions';
// import KeyboardConfig from './constants/KeyboardConfig';
import KeyboardLanguages from './constants/KeyboardLanguages';

const initState = {
  isShift: false,
  isCapsLock: false,
  lang: KeyboardLanguages.ENG,
};

const state = JSON.parse(localStorage.getItem('keyboardState')) || initState;

// function RefreshButton(onClick) {
//   const refreshButton = Renderer.createElement('button', {
//     type: 'button',
//     id: 'refreshBtn',
//     class: 'btn refreshBtn',
//   });

//   refreshButton.addEventListener('click', onClick);

//   return refreshButton;
// }

// const languageOptions = [
//   { value: Languages.EN, text: 'en' },
//   { value: Languages.RU, text: 'ru' },
//   { value: Languages.BE, text: 'be' },
// ];

class App {
  constructor() {
    this.state = new State(state);

    this.setState = this.setState.bind(this);

    this.textarea = Renderer.createElement('textarea', {
      id: 'textarea',
      class: 'keyboard__input',
      name: 'textarea',
      cols: 60,
      rows: 5,
      autofocus: true,
    });

    this.keyboard = new Keyboard({
      state: this.state.getState(),
    });

    // this.handleLanguageSelectChange = this.handleLanguageSelectChange.bind(this);
    // this.handleRefreshButtonClick = this.handleRefreshButtonClick.bind(this);
    // this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    // this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this);

    // this.searchForm = new Form({
    //   onSubmit: this.handleSearchFormSubmit,
    //   language: this.state.getState().language,
    // });
    // this.updateSearchForm = this.updateSearchForm.bind(this);
    // this.state.subscribe(this.updateSearchForm);

    // this.location = new Location(
    //   this.state.getState().geolocation,
    //   this.state.getState().language,
    // );
    // this.updateLocationGroup = this.updateLocationGroup.bind(this);
    // this.state.subscribe(this.updateLocationGroup);

    // this.townDateTime = new TownDateTime(
    //   this.state.getState().place,
    //   this.state.getState().language,
    //   this.state.getState().weather.timezone,
    //   this.state.getState().weather.offset,
    // );
    // this.updateTownDateTime = this.updateTownDateTime.bind(this);
    // this.state.subscribe(this.updateTownDateTime);

    // this.weatherGroup = new WeatherGroup({
    //   weatherData: this.state.getState().weather,
    //   radioGroupChoice: this.state.getState().radioGroupChoice,
    //   language: this.state.getState().language,
    // });
    // this.updateWeatherGroup = this.updateWeatherGroup.bind(this);
    // this.state.subscribe(this.updateWeatherGroup);

    // this.updateBackgroundImg = this.updateBackgroundImg.bind(this);

    // this.radioGroup = new RadioGroup(
    //   this.handleRadioGroupChange,
    //   this.state.getState().radioGroupChoice,
    // );

    // this.selectLanguage = new SelectionElement(
    //   languageOptions,
    //   this.handleLanguageSelectChange,
    //   this.state.getState().language,
    // );
  }

  setState(nextState) {
    this.state.update(nextState);
    this.state.notify();
  }

  // updateSearchForm() {
  //   this.searchForm.update(this.state.getState().language);
  // }

  // updateLocationGroup() {
  //   this.location.update(
  //     this.state.getState().geolocation,
  //     this.state.getState().language,
  //   );
  // }

  // updateTownDateTime() {
  //   this.townDateTime.update(
  //     this.state.getState().place,
  //     this.state.getState().language,
  //     this.state.getState().weather.timezone,
  //     this.state.getState().weather.offset,
  //   );
  // }

  // updateWeatherGroup() {
  //   this.weatherGroup.update({
  //     weatherData: this.state.getState().weather,
  //     radioGroupChoice: this.state.getState().radioGroupChoice,
  //     language: this.state.getState().language,
  //   });
  // }

  render() {
    // const refreshButton = RefreshButton(this.handleRefreshButtonClick);

    // const selectLanguage = this.selectLanguage.render();

    // const radioGroup = this.radioGroup.render();

    // const searchForm = this.searchForm.render();

    // const controllers = Renderer.createElement('div', {
    //   id: 'controllers',
    //   class: 'controllers',
    //   children: [refreshButton, selectLanguage, radioGroup, searchForm],
    // });

    // const townDateTime = this.townDateTime.render();

    // const weatherGroup = this.weatherGroup.render();

    // const weathers = Renderer.createElement('div', {
    //   id: 'weathers',
    //   class: 'weathers',
    //   children: [townDateTime, weatherGroup],
    // });

    // const location = this.location.render();

    // const timerInterval = setInterval(
    //   () => {
    //     this.townDateTime.update(
    //       this.state.getState().place,
    //       this.state.getState().language,
    //       this.state.getState().weather.timezone,
    //       this.state.getState().weather.offset,
    //     );
    //   },
    //   60000,
    // );

    // const now = new Date();
    // const delay = (60 - now.getSeconds()) * 1000;
    // const timerId = setTimeout(
    //   () => timerInterval,
    //   delay,
    // );

    // window.addEventListener('beforeunload', () => {
    //   clearTimeout(timerId);
    // });

    const getDescriptionsItems = () => {
      const items = [];

      Object.keys(KeyboardDescriptions).forEach((key) => {
        const option = Renderer.createElement('p', {
          class: 'descriptions__option',
          children: [key],
        });

        const value = Renderer.createElement('p', {
          class: 'descriptions__value',
          children: [KeyboardDescriptions[key]],
        });

        items.push(value, option);
      });

      return items;
    };

    this.descriptions = Renderer.createElement('div', {
      id: 'descriptions',
      class: 'descriptions__container',
      children: getDescriptionsItems(),
    });

    window.addEventListener('beforeunload', () => {
      const stateInJSON = JSON.stringify(this.state.getState());
      localStorage.setItem('keyboardState', stateInJSON);
    });

    return Renderer.createElement('div', {
      class: 'main',
      children: [
        this.textarea,
        this.keyboard.render(),
        this.descriptions,
      ],
    });
  }
}

export default App;
