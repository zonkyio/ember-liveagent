import Service from '@ember/service';
import { getOwner } from '@ember/application';

export default class LiveAgentService extends Service {
  isFastBoot = typeof FastBoot !== 'undefined';

  boot(options = {}) {
    if (this.isFastBoot) {
      return;
    }

    if (!window.embedded_svc) {
      const config = getOwner(this).resolveRegistration('config:environment');
      const { salesforceURL } = config['ember-liveagent'];

      let s = document.createElement('script');
      s.setAttribute('src', `${salesforceURL}/embeddedservice/5.0/esw.min.js`);
      s.onload = () => {
        this._initESW('https://service.force.com', options);
      };
      document.body.appendChild(s);
    } else {
      this._initESW('https://service.force.com', options);
    }
  }

  _initESW(gslbBaseURL, options) {
    if (!window.embedded_svc) {
      return;
    }

    const config = getOwner(this).resolveRegistration('config:environment');
    const svc = window.embedded_svc;

    const {
      salesforceURL,
      communityURL,
      org,
      snapinName,
      snapinNameWithoutPrechat,
      baseLiveAgentContentURL,
      deploymentId,
      buttonId,
      baseLiveAgentURL,
      eswLiveAgentDevName,
      eswLiveAgentDevNameWithoutPrechat,
    } = config['ember-liveagent'];

    const {
      displayHelpButton = false,
      language = 'en',
      domain,
      defaultMinimizedText = 'Chat with an Expert',
      loadingText = 'Loading',
      isOfflineSupportEnabled = false,
      offlineSupportMinimizedText = 'Contact Us',
      withPrechat = false,
      prepopulatedPrechatFields = {},
      extraPrechatFormDetails = [],
      extraPrechatInfo = [],
    } = options;

    svc.settings.displayHelpButton = displayHelpButton;
    svc.settings.language = language;
    svc.settings.defaultMinimizedText = defaultMinimizedText;
    svc.settings.loadingText = loadingText;
    svc.settings.prepopulatedPrechatFields = prepopulatedPrechatFields;
    svc.settings.offlineSupportMinimizedText = offlineSupportMinimizedText;
    svc.settings.enabledFeatures = ['LiveAgent'];
    svc.settings.entryFeature = 'LiveAgent';

    if (domain) {
      svc.settings.storageDomain = domain;
    }

    svc.settings.extraPrechatFormDetails = extraPrechatFormDetails;
    svc.settings.extraPrechatInfo = extraPrechatInfo;

    svc.init(
      salesforceURL,
      communityURL,
      gslbBaseURL,
      org,
      withPrechat ? snapinName : snapinNameWithoutPrechat,
      {
        baseLiveAgentContentURL,
        deploymentId,
        buttonId,
        baseLiveAgentURL,
        eswLiveAgentDevName: withPrechat
          ? eswLiveAgentDevName
          : eswLiveAgentDevNameWithoutPrechat,
        isOfflineSupportEnabled,
      },
    );
  }

  hideHelpButton() {
    if (!window.embedded_svc) {
      return;
    }
    window.embedded_svc.hideHelpButton();
  }

  showHelpButton() {
    if (!window.embedded_svc) {
      return;
    }
    window.embedded_svc.showHelpButton();
  }
}
