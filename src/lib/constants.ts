export const APP_CONFIG = {
  name: 'Guardian Vision AI',
  shortName: 'Guardian',
  tagline: 'AI-Powered Safety, Always With You',
  description:
    'Guardian Vision AI is a personal safety platform combining real-time threat detection, instant SOS response, and community awareness.',
  maxContentWidth: 430,
} as const;

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/home', icon: 'Home' },
  { id: 'camera', label: 'Camera', href: '/camera', icon: 'Camera' },
  { id: 'sos', label: 'SOS', href: '/sos', icon: 'Siren' },
  { id: 'profile', label: 'Profile', href: '/profile', icon: 'User' },
] as const;

export type NavId = (typeof NAV_ITEMS)[number]['id'];
export type IconName = (typeof NAV_ITEMS)[number]['icon'];
