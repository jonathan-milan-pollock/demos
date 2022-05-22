import PropTypes from 'prop-types';

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
  renderItem: JSX.Element;
}

MasterScrollbarContent.propTypes = {
  top: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  layout: PropTypes.object.isRequired,
  renderItem: PropTypes.node.isRequired,
};

export default function MasterScrollbarContent({
  top,
  height,
  layout,
  renderItem,
}: Props): JSX.Element {
  return (
    <ScrollbarContent
      top={top}
      width={
        layout.isLargeWindowWidth
          ? ApplicationLayout.MASTER_WIDTH
          : layout.width
      }
      height={height}
      marginLeft={0}
      className={styles['detailScrollbar']}
      renderItem={renderItem}
    />
  );
}
