import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from './pluginId';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'opening_hours',
    plugin: PLUGIN_ID,
    type: 'json',
  });
};

export default register;
