import { FC } from 'react';

import clsx from 'clsx';

import styles from './Line.module.scss';

type LineProps = {
  className?: string;
  top?: number;
  bottom?: number;
};

const Line: FC<LineProps> = ({ className, top, bottom }) => (
  <hr
    className={clsx(className, styles['line'])}
    style={{ marginTop: top ?? 0, marginBottom: bottom ?? 0 }}
  />
);

export default Line;
