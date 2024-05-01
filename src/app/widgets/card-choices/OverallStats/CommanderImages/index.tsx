import { FC } from 'react';

import { useGetImagesQuery } from '@app/store/api/commanders';

import styles from './CommanderImages.module.scss';

type CommanderImagesProps = {
  name: string;
};

const CommanderImages: FC<CommanderImagesProps> = ({ name }) => {
  const hasMultiple = name.includes(' // ');

  const { data: images, isError } = useGetImagesQuery(name);

  if (isError)
    return <div className={styles.skeleton}>Failed to load image</div>;

  return (
    <div className={styles.wrapper}>
      {hasMultiple ? (
        <>
          <div
            className={styles.skeleton}
            style={{
              backgroundImage: `url(${images?.[0]})`,
              backgroundSize: 'cover',
            }}
          />
          <div
            className={styles.skeleton}
            style={{
              backgroundImage: `url(${images?.[1]})`,
              backgroundSize: 'cover',
            }}
          />
        </>
      ) : (
        <div
          className={styles.skeleton}
          style={{
            backgroundImage: `url(${images?.[0]})`,
            backgroundSize: 'cover',
          }}
        />
      )}
    </div>
  );
};

export default CommanderImages;
