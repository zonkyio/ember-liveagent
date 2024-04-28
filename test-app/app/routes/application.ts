import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import type LiveAgentService from 'ember-liveagent/services/liveagent';

export default class ApplicationRoute extends Route {
  @service declare liveagent: LiveAgentService;

  afterModel() {
    this.liveagent.boot({
      salesforceURL: 'test://salesforceURL',
      communityURL: 'test://communityURL',
      org: 'test://org',
      snapinName: 'test://snapinName',
      baseLiveAgentContentURL: 'test://baseLiveAgentContentURL',
      deploymentId: 'test://deploymentId',
      buttonId: 'test://buttonId',
      baseLiveAgentURL: 'test://baseLiveAgentURL',
      eswLiveAgentDevName: 'test://eswLiveAgentDevName',
      settings: {
        displayHelpButton: true,
        domain: 'custom://domain',
        extraPrechatFormDetails: ['custom://extraPrechatFormDetails'],
        extraPrechatInfo: ['custom://extraPrechatInfo'],
        defaultMinimizedText: 'custom:://defaultMinimizedText',
        loadingText: 'custom://loadingText',
        prepopulatedPrechatFields: {
          field: 'custom://prepopulatedPrechatFields',
        },
        offlineSupportMinimizedText: 'custom://offlineSupportMinimizedText',
        isOfflineSupportEnabled: true,
      },
    });
  }
}
