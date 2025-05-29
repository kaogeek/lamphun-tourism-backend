import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app: any) {
    app.customFields.register({
      name: 'opening_hours',
      pluginId: PLUGIN_ID,
      type: 'json',
      intlLabel: {
        id: 'opening-hours.label',
        defaultMessage: 'Opening hours',
      },
      intlDescription: {
        id: 'opening-hours.description',
        defaultMessage:
          'Set the hours during which your service or business is available to customers.',
      },
      icon: PluginIcon,
      components: {
        Input: async () =>
          import('./components/Input').then((module) => ({
            default: module.Input,
          })),
      },
      options: {
        // declare options here
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
