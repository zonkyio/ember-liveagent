import Service, { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

export default Service.extend({

  fastboot: service(),

  boot(options = {}) {
    if (this.get('fastboot.isFastBoot')) return;

    if (!window.embedded_svc) {
      const config = getOwner(this).resolveRegistration('config:environment');

      const salesforceURL = config['ember-liveagent'].salesforceURL;
      
      let s = document.createElement('script');
      s.setAttribute('src', `${salesforceURL}/embeddedservice/5.0/esw.min.js`);
      s.onload = () => {
        this._initESW('https://service.force.com', options);
      };
      document.body.appendChild(s);
    } else {
      this._initESW('https://service.force.com', options);
    }
  },

  _initESW(gslbBaseURL, options) {
    if (this.get('fastboot.isFastBoot')) return;
    if (!window.embedded_svc) return; 

    const config = getOwner(this).resolveRegistration('config:environment');

    const salesforceURL = config['ember-liveagent'].salesforceURL;
    const communityURL = config['ember-liveagent'].communityURL;
    const org = config['ember-liveagent'].org;
    const snapinName = config['ember-liveagent'].snapinName;
    const snapinNameWithoutPrechat = config['ember-liveagent'].snapinNameWithoutPrechat;
    const baseLiveAgentContentURL = config['ember-liveagent'].baseLiveAgentContentURL;
    const deploymentId = config['ember-liveagent'].deploymentId;
    const buttonId = config['ember-liveagent'].buttonId;
    const baseLiveAgentURL = config['ember-liveagent'].baseLiveAgentURL;
    const eswLiveAgentDevName = config['ember-liveagent'].eswLiveAgentDevName;
    const eswLiveAgentDevNameWithoutPrechat = config['ember-liveagent'].eswLiveAgentDevNameWithoutPrechat;

    window.embedded_svc.settings.displayHelpButton = options.displayHelpButton || false;
    window.embedded_svc.settings.language = options.language || 'en';

    if(options.domain) {
      window.embedded_svc.settings.storageDomain = options.domain;
    }

    window.embedded_svc.snippetSettingsFile.extraPrechatFormDetails = options.extraPrechatFormDetails || [];
    window.embedded_svc.snippetSettingsFile.extraPrechatInfo = options.extraPrechatInfo || [];

    window.embedded_svc.settings.defaultMinimizedText = options.defaultMinimizedText || 'Chat with an Expert';
    window.embedded_svc.settings.loadingText = options.loadingText || 'Loading';
    console.log("ember-liveagent - smallCompanyLogoImgURL ", config['ember-liveagent'].smallCompanyLogoImgURL);
    console.log(config['ember-liveagent']);
    
    if (config['ember-liveagent'].smallCompanyLogoImgURL) {
      window.embedded_svc.settings.smallCompanyLogoImgURL = config['ember-liveagent'].smallCompanyLogoImgURL;
    }

    // Settings for Live Agent
    window.embedded_svc.settings.prepopulatedPrechatFields = options.prepopulatedPrechatFields || {};
    window.embedded_svc.settings.offlineSupportMinimizedText = options.offlineSupportMinimizedText || 'Contact Us';

    window.embedded_svc.settings.enabledFeatures = ['LiveAgent'];
    window.embedded_svc.settings.entryFeature = 'LiveAgent';

    window.embedded_svc.init(
      salesforceURL,
      communityURL,
      gslbBaseURL,
      org,
      options.withPrechat ? snapinName : snapinNameWithoutPrechat,
      {
        baseLiveAgentContentURL,
        deploymentId,
        buttonId,
        baseLiveAgentURL,
        eswLiveAgentDevName: options.withPrechat ? eswLiveAgentDevName : eswLiveAgentDevNameWithoutPrechat,
        isOfflineSupportEnabled: options.isOfflineSupportEnabled || false
      }
    );
  },

});
