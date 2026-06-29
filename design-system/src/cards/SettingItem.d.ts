import * as React from 'react';

/**
 * SettingItem — from @duovino/design-system@0.1.0.
 */
export interface SettingItemProps {
  icon: string;
  title: string;
  desc: string;
  onSelect?: () => void;
}

export declare const SettingItem: React.ComponentType<SettingItemProps>;
