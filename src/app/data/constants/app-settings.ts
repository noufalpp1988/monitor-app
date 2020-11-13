import { environment as ENVui } from '@env/environment';
import { environmentLoader as environmentLoaderPromise } from '@env/environmentLoader';

environmentLoaderPromise
    .then(envJson => {
        Object.assign(ENVui.settings, envJson);
        Object.assign(AppSettings.settings, envJson);
    })
    .then(() => {
        console.log('app set then');
    })
    .catch(e => {
        console.error(e);
    });

export class AppSettings {

    public static settings = {
        dashboard_url: `${ENVui.settings.urlui}:8083`,
    };
}
