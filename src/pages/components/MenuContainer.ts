import CalendarContent from './content/CalendarContent';
import CardContent from './content/CardContent';
import CheckboxContent from './content/CheckboxContent';
import DialogContent from './content/DialogContent';
import DrawerContent from './content/DrawerContent';
import FilterContent from './content/FilterContent';
import FormContent from './content/FormContent';
import InfiniteScrollContent from './content/InfiniteScrollContent';
import InfiniteScrollObserverContent from './content/InfiniteScrollObserverContent';
import PaginationContent from './content/PaginationContent';
import RadioContent from './content/RadioContent';
import SkeletonContent from './content/SkeletonContent';
import StepsContent from './content/StepsContent';

export type MenuName =
  | 'card'
  | 'drawer'
  | 'checkbox'
  | 'radio'
  | 'form'
  | 'steps'
  | 'calendar'
  | 'filter'
  | 'skeleton'
  | 'dialog'
  | 'infiniteScroll'
  | 'infiniteScrollObserver'
  | 'pagination';

type MenuContents = {
  [key in MenuName]: () => JSX.Element;
};

export const MenuContainer: MenuContents = {
  card: CardContent,
  drawer: DrawerContent,
  checkbox: CheckboxContent,
  radio: RadioContent,
  form: FormContent,
  steps: StepsContent,
  calendar: CalendarContent,
  filter: FilterContent,
  skeleton: SkeletonContent,
  dialog: DialogContent,
  infiniteScroll: InfiniteScrollContent,
  infiniteScrollObserver: InfiniteScrollObserverContent,
  pagination: PaginationContent,
};
