import { AppBar, Paper, Tabs, Tab } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseNight, faChild } from '@fortawesome/pro-solid-svg-icons';
import { faMountains } from '@fortawesome/pro-duotone-svg-icons';
import { faLeaf } from '@fortawesome/pro-regular-svg-icons';
import { faBookOpen } from '@fortawesome/pro-regular-svg-icons';

import styles from './tab-bar.module.scss';

export interface TabBarProps {
  readonly activeLink: string;
  onTabChange(link: string): void;
}

function TabBar(props: TabBarProps): JSX.Element {
  return (
    <AppBar position="static" className={styles.appBar}>
      <Paper>
        <Tabs
          value={props.activeLink == '/' ? '/events' : props.activeLink}
          onChange={(_event: React.ChangeEvent<unknown>, value: string) =>
            props.onTabChange(value)
          }
          className={styles.tabs}
          centered
        >
          <Tab
            className={
              props.activeLink == '/events' ? styles.tabSelected : styles.tab
            }
            label="Events"
            value="/events"
            icon={<FontAwesomeIcon icon={faBookOpen} />}
          />
          <Tab
            className={
              props.activeLink == '/real-estate'
                ? styles.tabSelected
                : styles.tab
            }
            label="Real Estate"
            value="/real-estate"
            icon={<FontAwesomeIcon icon={faHouseNight} />}
          />
          <Tab
            className={
              props.activeLink == '/nature' ? styles.tabSelected : styles.tab
            }
            label="Nature"
            value="/nature"
            icon={<FontAwesomeIcon icon={faLeaf} />}
          />
          <Tab
            className={
              props.activeLink == '/landscapes'
                ? styles.tabSelected
                : styles.tab
            }
            label="Landscapes"
            value="/landscapes"
            icon={<FontAwesomeIcon icon={faMountains} />}
          />
          <Tab
            className={
              props.activeLink == '/children' ? styles.tabSelected : styles.tab
            }
            label="Children"
            value="/children"
            icon={<FontAwesomeIcon icon={faChild} />}
          />
        </Tabs>
      </Paper>
    </AppBar>
  );
}

export default TabBar;
