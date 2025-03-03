import { createApp } from 'petite-vue';
import Timer from 'easytimer.js';

export default () => {
  createApp({
    userEmail: '',
    emailInvalid: false,
    emailSending: false,
    debug: false,
    markersFound: [],
    markerVisible: false,
    timer: 1,
    showSignup: false,
    showRestartFail: false,
    showRestartSuccess: false,
    resetCountdown: 60,
    resetTimer: new Timer(),
    restart() {
      window.location.reload();
    },
    activateDebugFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      const debugParameter = urlParams.get('debug');

      // eslint-disable-next-line
      debugParameter === 'true' ? (this.debug = true) : (this.debug = false);

      return this.debug;
    },

    startCountDown() {
      this.resetTimer.start({ countdown: true, startValues: { seconds: this.resetCountdown } });

      const updateTimer = () => {
        this.resetCountdown = this.resetTimer.getTimeValues().seconds.toString();
      };

      const countdownFinished = () => {
        this.showRestartFail = true;
      };

      this.resetTimer.addEventListener('secondsUpdated', updateTimer);
      this.resetTimer.addEventListener('targetAchieved', countdownFinished);
    },
    pushMarker(markerID) {
      if (this.markersFound.includes(markerID) === false) {
        this.markersFound.push(markerID);
      }

      const showSignup = () => {
        this.showSignup = true;
      };

      if (this.markersFound.length === 5) {
        setTimeout(() => {
          showSignup();
          this.resetTimer.stop();
        }, 1000);
      }

      this.timer = 5;

      this.startCountDown();

      document.querySelector('.timer_wrapper').style.opacity = 1;
    },
    preventMultiClick() {
      const started = Date.now();

      // make it loop every 100 milliseconds
      const interval = setInterval(() => {
        // for 1 seconds
        if (Date.now() - started > 1000) {
          // and then pause it
          clearInterval(interval);
          this.timer = 1;
        } else {
          // the thing to do every 100ms

          this.timer -= 0.1;
        }
      }, 100); // every 100 milliseconds
    },
    sendEmail() {
      const submitForm = () => {
        (async () => {
          const rawResponse = await fetch(
            'https://hook.eu1.make.com/xw5ke95hsnhdnwczhj7s9dcpgzz6m95k',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: this.userEmail }),
            }
          );
          const content = await rawResponse.json();

          if (content.success === true) {
            this.emailSending = false;
            this.showSignup = false;
            this.showRestartSuccess = true;
          }
        })();
      };

      const isEmail = () => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (this.userEmail.match(regex)) return true;
        return false;
      };

      if (isEmail()) {
        this.emailSending = true;
        submitForm();
      } else {
        this.emailInvalid = true;
      }
    },
  }).mount('#app');
};
