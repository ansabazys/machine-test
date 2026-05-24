import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAnnouncements extends Struct.ComponentSchema {
  collectionName: 'components_shared_announcements';
  info: {
    displayName: 'announcements';
  };
  attributes: {
    description: Schema.Attribute.Text;
    priority: Schema.Attribute.Enumeration<['LOW', 'MEDIUM', 'HIGH']>;
    title: Schema.Attribute.String;
  };
}

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface SharedFeature extends Struct.ComponentSchema {
  collectionName: 'components_shared_features';
  info: {
    displayName: 'feature';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    badge: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    primaryButtonLink: Schema.Attribute.String;
    primaryButtonText: Schema.Attribute.String;
    secondaryButtonLink: Schema.Attribute.String;
    secondaryButtonText: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.Text;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    displayName: 'stat';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.announcements': SharedAnnouncements;
      'shared.faq': SharedFaq;
      'shared.feature': SharedFeature;
      'shared.hero': SharedHero;
      'shared.stat': SharedStat;
    }
  }
}
