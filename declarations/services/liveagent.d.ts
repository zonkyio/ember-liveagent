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
    init(salesforceURL: string, communityURL: string, gslbBaseURL: string, org: string, string: string, options: ConfigOptions): void;
    hideHelpButton(): void;
    showHelpButton(): void;
}
interface Options extends LiveAgentConfig {
    settings: BaseSettings;
}
export default class LiveAgentService extends Service {
    isFastBoot: boolean;
    boot(options: Options): void;
    _initESW(gslbBaseURL: string, options: Options): void;
    hideHelpButton(): void;
    showHelpButton(): void;
}
export {};
//# sourceMappingURL=liveagent.d.ts.map