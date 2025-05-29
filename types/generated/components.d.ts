import type { Schema, Struct } from '@strapi/strapi';

export interface SharedDayOpening extends Struct.ComponentSchema {
  collectionName: 'components_shared_day_openings';
  info: {
    description: '';
    displayName: 'Day opening';
    icon: 'calendar';
  };
  attributes: {
    open: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    time_range: Schema.Attribute.Component<'shared.opening-time', true>;
  };
}

export interface SharedLocation extends Struct.ComponentSchema {
  collectionName: 'components_shared_locations';
  info: {
    description: '';
    displayName: 'location';
    icon: 'earth';
  };
  attributes: {
    lat: Schema.Attribute.Decimal;
    lng: Schema.Attribute.Decimal;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedOpeningHours extends Struct.ComponentSchema {
  collectionName: 'components_shared_opening_hours';
  info: {
    description: '';
    displayName: 'Opening hours';
    icon: 'calendar';
  };
  attributes: {
    friday: Schema.Attribute.Component<'shared.day-opening', false> &
      Schema.Attribute.Required;
    monday: Schema.Attribute.Component<'shared.day-opening', false> &
      Schema.Attribute.Required;
    saturday: Schema.Attribute.Component<'shared.day-opening', false> &
      Schema.Attribute.Required;
    sunday: Schema.Attribute.Component<'shared.day-opening', false> &
      Schema.Attribute.Required;
    thursday: Schema.Attribute.Component<'shared.day-opening', false> &
      Schema.Attribute.Required;
    tuesday: Schema.Attribute.Component<'shared.day-opening', false> &
      Schema.Attribute.Required;
    wednesday: Schema.Attribute.Component<'shared.day-opening', false> &
      Schema.Attribute.Required;
  };
}

export interface SharedOpeningTime extends Struct.ComponentSchema {
  collectionName: 'components_shared_opening_times';
  info: {
    displayName: 'Opening time';
    icon: 'clock';
  };
  attributes: {
    end_time: Schema.Attribute.Time;
    start_time: Schema.Attribute.Time;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTest extends Struct.ComponentSchema {
  collectionName: 'components_shared_tests';
  info: {
    displayName: 'test';
    icon: 'arrowUp';
  };
  attributes: {
    asd: Schema.Attribute.Decimal;
    location: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        'plugin::strapi-location-picker.location-picker',
        {
          info: true;
        }
      >;
    test: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.day-opening': SharedDayOpening;
      'shared.location': SharedLocation;
      'shared.media': SharedMedia;
      'shared.opening-hours': SharedOpeningHours;
      'shared.opening-time': SharedOpeningTime;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.test': SharedTest;
    }
  }
}
