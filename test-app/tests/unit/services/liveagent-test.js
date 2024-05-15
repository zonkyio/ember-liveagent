import { module, test } from 'qunit';
import { setupTest } from 'test-app/tests/helpers';

module('Unit | Service | liveagent', function (hooks) {
  setupTest(hooks);

  function clear() {
    delete window.embedded_svc;
    delete window.FastBoot;
  }

  hooks.beforeEach(clear);
  hooks.afterEach(clear);

  test('it boots', function (assert) {
    window.embedded_svc = {
      settings: {},
      init() {
        assert.strictEqual(arguments.length, 6);
        assert.strictEqual(arguments[0], 'test://salesforceURL');
        assert.strictEqual(arguments[1], 'test://communityURL');
        assert.strictEqual(arguments[2], 'https://service.force.com');
        assert.strictEqual(arguments[3], 'test://org');
        assert.strictEqual(arguments[4], 'test://snapinName');
        assert.deepEqual(arguments[5], {
          baseLiveAgentContentURL: 'test://baseLiveAgentContentURL',
          baseLiveAgentURL: 'test://baseLiveAgentURL',
          buttonId: 'test://buttonId',
          deploymentId: 'test://deploymentId',
          eswLiveAgentDevName: 'test://eswLiveAgentDevName',
          isOfflineSupportEnabled: false,
        });
      },
    };

    let service = this.owner.lookup('service:liveagent');

    service.boot({
      salesforceURL: 'test://salesforceURL',
      communityURL: 'test://communityURL',
      org: 'test://org',
      snapinName: 'test://snapinName',
      baseLiveAgentContentURL: 'test://baseLiveAgentContentURL',
      deploymentId: 'test://deploymentId',
      buttonId: 'test://buttonId',
      baseLiveAgentURL: 'test://baseLiveAgentURL',
      eswLiveAgentDevName: 'test://eswLiveAgentDevName',
      settings: {},
    });

    assert.deepEqual(window.embedded_svc.settings, {
      defaultMinimizedText: 'Chat with an Expert',
      displayHelpButton: false,
      enabledFeatures: ['LiveAgent'],
      entryFeature: 'LiveAgent',
      language: 'en',
      loadingText: 'Loading',
      offlineSupportMinimizedText: 'Contact Us',
      prepopulatedPrechatFields: {},
      extraPrechatFormDetails: [],
      extraPrechatInfo: [],
    });
  });

  test('it boots with custom options', function (assert) {
    window.embedded_svc = {
      settings: {},
      init() {
        assert.strictEqual(arguments.length, 6);
        assert.strictEqual(arguments[0], 'test://salesforceURL');
        assert.strictEqual(arguments[1], 'test://communityURL');
        assert.strictEqual(arguments[2], 'https://service.force.com');
        assert.strictEqual(arguments[3], 'test://org');
        assert.strictEqual(arguments[4], 'test://snapinName');
        assert.deepEqual(arguments[5], {
          baseLiveAgentContentURL: 'test://baseLiveAgentContentURL',
          baseLiveAgentURL: 'test://baseLiveAgentURL',
          buttonId: 'test://buttonId',
          deploymentId: 'test://deploymentId',
          eswLiveAgentDevName: 'test://eswLiveAgentDevName',
          isOfflineSupportEnabled: true,
        });
      },
    };

    let service = this.owner.lookup('service:liveagent');

    service.boot({
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

    assert.deepEqual(window.embedded_svc.settings, {
      defaultMinimizedText: 'custom:://defaultMinimizedText',
      displayHelpButton: true,
      enabledFeatures: ['LiveAgent'],
      entryFeature: 'LiveAgent',
      language: 'en',
      loadingText: 'custom://loadingText',
      offlineSupportMinimizedText: 'custom://offlineSupportMinimizedText',
      prepopulatedPrechatFields: {
        field: 'custom://prepopulatedPrechatFields',
      },
      storageDomain: 'custom://domain',
      extraPrechatFormDetails: ['custom://extraPrechatFormDetails'],
      extraPrechatInfo: ['custom://extraPrechatInfo'],
    });
  });

  test('it does not boot in FastBoot', function (assert) {
    window.embedded_svc = {
      settings: {},
      init() {
        assert.ok(false);
      },
    };

    window.FastBoot = {};

    let service = this.owner.lookup('service:liveagent');
    service.boot();

    assert.deepEqual(window.embedded_svc.settings, {});
  });

  test('it delegates to embedded_svc.hideHelpButton()', function (assert) {
    window.embedded_svc = {
      hideHelpButton() {
        assert.true(true, 'hideHelpButton() called');
      },
    };

    let service = this.owner.lookup('service:liveagent');

    service.hideHelpButton();
  });

  test('it delegates to embedded_svc.showHelpButton()', function (assert) {
    window.embedded_svc = {
      showHelpButton() {
        assert.true(true, 'showHelpButton() called');
      },
    };

    let service = this.owner.lookup('service:liveagent');

    service.showHelpButton();
  });
});
