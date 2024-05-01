import { FC } from 'react';

import { useGetImagesQuery } from '@app/store/api/commanders';

import styles from './CommanderImages.module.scss';

type CommanderImagesProps = {
  name: string;
};

const CommanderImages: FC<CommanderImagesProps> = ({ name }) => {
  const { data: images, isLoading, isError } = useGetImagesQuery(name);

  const hasMultiple = name.includes(' // ');

  if (isError)
    return <div className={styles.skeleton}>Failed to load image</div>;

  if (isLoading)
    return (
      <div className={styles.wrapper}>
        {hasMultiple ? (
          <>
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
          </>
        ) : (
          <div className={styles.skeleton} />
        )}
      </div>
    );

  return (
    <div className={styles.wrapper}>
      {images?.map(image => <img key={image} src={image} alt={name} />)}
    </div>
  );
};

export default CommanderImages;
