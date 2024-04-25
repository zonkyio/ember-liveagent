import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service liveagent!: {
    boot: (arg0: {
      salesforceURL: string;
      communityURL: string;
      org: string;
      snapinName: string;
      baseLiveAgentContentURL: string;
      deploymentId: string;
      buttonId: string;
      baseLiveAgentURL: string;
      eswLiveAgentDevName: string;
      settings: {
        displayHelpButton: boolean;
        domain: string;
        extraPrechatFormDetails: string[];
        extraPrechatInfo: string[];
        defaultMinimizedText: string;
        loadingText: string;
        prepopulatedPrechatFields: { field: string };
        offlineSupportMinimizedText: string;
        isOfflineSupportEnabled: boolean;
      };
    }) => void;
  };

  afterModel() {
    const liveagentService = this.liveagent;

    if (!liveagentService) {
      throw new Error('Liveagent service is not available.');
    }

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
