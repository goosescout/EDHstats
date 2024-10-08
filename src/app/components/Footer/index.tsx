import { FC, useEffect, useState } from 'react';

import Discord from '~/assets/icons/Discord';
import Github from '~/assets/icons/Github';
import Telegram from '~/assets/icons/Telegram';

import Separator from '@app/components/Separator';

import styles from './Footer.module.scss';

type FooterProps = {
  serverRenderTime?: number;
};

const Footer: FC<FooterProps> = ({ serverRenderTime }) => {
  const [loadTime, setLoadTime] = useState('');

  useEffect(() => {
    const loadTime = (performance.mark('pageEnd').startTime / 1000).toFixed(3);
    setLoadTime(loadTime);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles['wizards-legal-info']}>
          Portions of EDHstats are unofficial Fan Content permitted under the
          Wizards of the Coast Fan Content Policy. The literal and graphical
          information presented on this site about Magic: The Gathering,
          including card images and mana symbols, is copyright Wizards of the
          Coast, LLC. EDHstats is not produced by or endorsed by Wizards of the
          Coast.
        </p>
        <p className={styles.links}>
          EDHstats uses data gathered from outer recourses or APIs:{' '}
          <a href="https://scryfall.com/" target="_blank" rel="noreferrer">
            Scryfall
          </a>
          ,{' '}
          <a href="https://eminence.events/" target="_blank" rel="noreferrer">
            Eminence Gaming
          </a>
          ,{' '}
          <a href="https://www.moxfield.com" target="_blank" rel="noreferrer">
            Moxfield
          </a>
          .
        </p>
        <p>
          Page loaded in{' '}
          {serverRenderTime
            ? `${serverRenderTime.toFixed(3)} sec (server) + ${loadTime} sec
          (client)`
            : `${loadTime} sec`}
        </p>

        <div className={styles.contacts}>
          <p>Michael Gurevich © 2024</p>
          <Separator />
          <a
            href="http://discordapp.com/users/363270817318174720"
            target="_blank"
            rel="noreferrer"
          >
            <Discord />
          </a>
          <a href="https://t.me/goosescout" target="_blank" rel="noreferrer">
            <Telegram />
          </a>
          <a
            href="https://github.com/goosescout/Web"
            target="_blank"
            rel="noreferrer"
          >
            <Github />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
