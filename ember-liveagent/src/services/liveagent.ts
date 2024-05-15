import Service from '@ember/service';

declare global {
  interface Window {
    embedded_svc?: EmbeddedService;
  }
}

interface LiveAgentConfig {
  salesforceURL: string;
  communityURL: string;
  org: string;
  snapinName: string;
  baseLiveAgentContentURL: string;
  deploymentId: string;
  buttonId: string;
  baseLiveAgentURL: string;
  eswLiveAgentDevName: string;
}

interface BaseSettings {
  displayHelpButton?: boolean;
  language?: string;
  defaultMinimizedText?: string;
  loadingText?: string;
  prepopulatedPrechatFields?: Record<string, string>;
  offlineSupportMinimizedText?: string;
  enabledFeatures?: string[];
  entryFeature?: string;
  storageDomain?: string;
  extraPrechatFormDetails?: (string | number | boolean)[];
  extraPrechatInfo?: (string | number | boolean)[];
  domain: string;
  isOfflineSupportEnabled: boolean;
}

interface ConfigOptions {
  baseLiveAgentContentURL: string;
  deploymentId: string;
  buttonId: string;
  baseLiveAgentURL: string;
  eswLiveAgentDevName: string;
  isOfflineSupportEnabled: boolean;
}

interface EmbeddedService {
  settings: BaseSettings;
  init(
    salesforceURL: string,
    communityURL: string,
    gslbBaseURL: string,
    org: string,
    string: string,
    options: ConfigOptions,
  ): void;
  hideHelpButton(): void;
  showHelpButton(): void;
}

interface Options extends LiveAgentConfig {
  settings: BaseSettings;
}

export default class LiveAgentService extends Service {
  isFastBoot = typeof FastBoot !== 'undefined';

  boot(options: Options) {
    if (this.isFastBoot) {
      return;
    }
    if (!window.embedded_svc) {
      const { salesforceURL } = options;

      const s = document.createElement('script');
      s.setAttribute('src', `${salesforceURL}/embeddedservice/5.0/esw.min.js`);
      s.onload = () => {
        this._initESW('https://service.force.com', options);
      };
      document.body.appendChild(s);
    } else {
      this._initESW('https://service.force.com', options);
    }
  }

  _initESW(gslbBaseURL: string, options: Options) {
    if (!window.embedded_svc) {
      return;
    }

    const svc = window.embedded_svc;
    svc.settings = svc.settings || {};

    const {
      salesforceURL,
      communityURL,
      org,
      snapinName,
      baseLiveAgentContentURL,
      deploymentId,
      buttonId,
      baseLiveAgentURL,
      eswLiveAgentDevName,
    } = options;

    const {
      displayHelpButton = false,
      language = 'en',
      domain,
      defaultMinimizedText = 'Chat with an Expert',
      loadingText = 'Loading',
      isOfflineSupportEnabled = false,
      offlineSupportMinimizedText = 'Contact Us',
      prepopulatedPrechatFields = {},
      extraPrechatFormDetails = [],
      extraPrechatInfo = [],
    } = options.settings;

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

    svc.init(salesforceURL, communityURL, gslbBaseURL, org, snapinName, {
      baseLiveAgentContentURL,
      deploymentId,
      buttonId,
      baseLiveAgentURL,
      eswLiveAgentDevName,
      isOfflineSupportEnabled,
    });
  }

  hideHelpButton() {
    window.embedded_svc?.hideHelpButton();
  }

  showHelpButton() {
    window.embedded_svc?.showHelpButton();
  }
}
