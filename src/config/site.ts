export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Next.js + NextUI',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [
    {
      label: '<AiOutlineHome/>',
      href: '/',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ],
  navMenuItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ],
};
