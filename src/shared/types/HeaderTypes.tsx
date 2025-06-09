export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showRightIcon?: boolean;
  RightIconComponent?: React.ComponentType<{size: number; color: string}>;
}
