export interface IBreadcrumbLink {
  label: string;
  href: string;
}

export type Props = {
  links: IBreadcrumbLink[];
  activeIndex: number;
};
