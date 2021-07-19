import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | liveagent', function (hooks) {
  setupTest(hooks);

  function clear() {
    delete window.embedded_svc;
    delete window.FastBoot;
  }

  hooks.beforeEach(clear);
  hooks.afterEach(clear);

  test('it boots', function (assert) {
    assert.expect(9);

    window.embedded_svc = {
      settings: {},
      snippetSettingsFile: {},
      init() {
        assert.strictEqual(arguments.length, 6);
        assert.strictEqual(arguments[0], 'test://salesforceURL');
        assert.strictEqual(arguments[1], 'test://communityURL');
        assert.strictEqual(arguments[2], 'https://service.force.com');
        assert.strictEqual(arguments[3], 'test://org');
        assert.strictEqual(arguments[4], 'test://snapinNameWithoutPrechat');
        assert.deepEqual(arguments[5], {
          baseLiveAgentContentURL: 'test://baseLiveAgentContentURL',
          baseLiveAgentURL: 'test://baseLiveAgentURL',
          buttonId: 'test://buttonId',
          deploymentId: 'test://deploymentId',
          eswLiveAgentDevName: 'test://eswLiveAgentDevNameWithoutPrechat',
          isOfflineSupportEnabled: false,
        });
      },
    };

    let service = this.owner.lookup('service:liveagent');
    service.boot();

    assert.deepEqual(window.embedded_svc.settings, {
      defaultMinimizedText: 'Chat with an Expert',
      displayHelpButton: false,
      enabledFeatures: ['LiveAgent'],
      entryFeature: 'LiveAgent',
      language: 'en',
      loadingText: 'Loading',
      offlineSupportMinimizedText: 'Contact Us',
      prepopulatedPrechatFields: {},
    });

    assert.deepEqual(window.embedded_svc.snippetSettingsFile, {
      extraPrechatFormDetails: [],
      extraPrechatInfo: [],
    });
  });

  test('it boots with custom options', function (assert) {
    assert.expect(9);

    window.embedded_svc = {
      settings: {},
      snippetSettingsFile: {},
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
      withPrechat: true,
      isOfflineSupportEnabled: true,
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
    });

    assert.deepEqual(window.embedded_svc.snippetSettingsFile, {
      extraPrechatFormDetails: ['custom://extraPrechatFormDetails'],
      extraPrechatInfo: ['custom://extraPrechatInfo'],
    });
  });

  test('it does not boot in FastBoot', function (assert) {
    assert.expect(2);

    window.embedded_svc = {
      settings: {},
      snippetSettingsFile: {},
      init() {
        assert.ok(false);
      },
    };

    window.FastBoot = {};

    let service = this.owner.lookup('service:liveagent');
    service.boot();

    assert.deepEqual(window.embedded_svc.settings, {});
    assert.deepEqual(window.embedded_svc.snippetSettingsFile, {});
  });
});
