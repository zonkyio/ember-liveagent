import Service, { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';

export default Service.extend({

  fastboot: service(),

  init(params = {}) {
    this._super(...arguments)
    if (this.get('fastboot.isFastBoot')) return;
    if (!window.liveagent) return;
    const config = getOwner(this).resolveRegistration('config:environment');

    const id = config['ember-liveagent'].id;
    const org = config['ember-liveagent'].org;
    const host = config['ember-liveagent'].host;
    this._setParams(params);

    window.liveagent.init(host, id, org);    
  },

  boot(online, offline, callback) {
    if (this.get('fastboot.isFastBoot')) return;
    if (!window.liveagent || !online || !offline || !callback) return;

    const config = getOwner(this).resolveRegistration('config:environment');
    const buttonId = config['ember-liveagent'].buttonId;


    window.liveagent.addButtonEventHandler(buttonId, callback);

    window._laq = window._laq || [];
    window._laq.push(function() {
      window.liveagent.showWhenOnline(buttonId, document.getElementById(online));
      window.liveagent.showWhenOffline(buttonId, document.getElementById(offline));
    });
  },

  update(params) {
    if (this.get('fastboot.isFastBoot')) return;
    if (!window.liveagent) return; 

    this._setParams(params);
  },

  startChat(){
    if (this.get('fastboot.isFastBoot')) return;
    if (!window.liveagent) return;

    const config = getOwner(this).resolveRegistration('config:environment');
    const buttonId = config['ember-liveagent'].buttonId;

    window.liveagent.startChat(buttonId);
  },

  shutdown() {
    if (this.get('fastboot.isFastBoot')) return;
    if (!window.liveagent) return;
    
    window.liveagent.disconnect();
  },

  _setParams(params = {}){
    Object.keys(params).forEach(function(key) {
      if (key === 'name') {
        window.liveagent.setName(params[key]);
      } else {
        window.liveagent.addCustomDetail(key, params[key]);
      }
    });
  }
});
