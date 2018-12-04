import Router from '@ember/routing/router';
import { inject as service } from '@ember/service';
import { on } from '@ember/object/evented';

export function initialize() {
  if (typeof FastBoot === 'undefined') {
    Router.reopen({
      liveagent: service(),

      notifyLiveagent: on('didTransition', function () {
        this.get('liveagent').update();
      })
    });
  }
}

export default {
  name: 'router',
  initialize: initialize
};
