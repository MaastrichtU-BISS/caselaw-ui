/** Fixtures for the application blocks; one file per block under block-fixtures/. */
import type { Fixture } from './fixtures';
import { fixture as NotificationCenter } from './block-fixtures/notification-center';
import { fixture as Sidebar } from './block-fixtures/sidebar';
import { fixture as WorkspaceSwitcher } from './block-fixtures/workspace-switcher';
import { fixture as CommandMenu } from './block-fixtures/command-menu';
import { fixture as ImportMapper } from './block-fixtures/import-mapper';
import { fixture as Feed } from './block-fixtures/feed';
import { fixture as FeedItem } from './block-fixtures/feed-item';
import { fixture as KeyResult } from './block-fixtures/key-result';
import { fixture as FunnelChart } from './block-fixtures/funnel-chart';
import { fixture as RingGauge } from './block-fixtures/ring-gauge';
import { fixture as Tour } from './block-fixtures/tour';
import { fixture as TemplateGallery } from './block-fixtures/template-gallery';
import { fixture as FeedbackDialog } from './block-fixtures/feedback-dialog';
import { fixture as Lightbox } from './block-fixtures/lightbox';

export const blockFixtures: Record<string, Fixture> = {
  NotificationCenter,
  Sidebar,
  WorkspaceSwitcher,
  CommandMenu,
  ImportMapper,
  Feed,
  FeedItem,
  KeyResult,
  FunnelChart,
  RingGauge,
  Tour,
  TemplateGallery,
  FeedbackDialog,
  Lightbox,
};
