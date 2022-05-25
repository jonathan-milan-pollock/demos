import styles from './master-scrollbar-content.module.scss';
import {
  ApplicationLayout,
  Layout,
} from '@dark-rush-photography/website/types';
import ScrollbarContent from '../../common/scrollbar-content/scrollbar-content.component';

interface Props {
  top: number;
  height: number;
  layout: Layout;
  children?: React.ReactNode;
}

export default function MasterScrollbarContent(props: Props): JSX.Element {
  return (
    <ScrollbarContent
      top={props.top}
      width={
        props.layout.isLargeWindowWidth
          ? ApplicationLayout.MASTER_WIDTH
          : props.layout.width
      }
      height={props.height}
      marginLeft={0}
      className={styles['detailScrollbar']}
    >
      {props.children}
    </ScrollbarContent>
  );
}
