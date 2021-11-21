import { ReactElement } from 'react';
import styles from './LoadingBoxes.module.css';

const LoadingBoxes = (): ReactElement => {
  const numberOfBoxes = 4;
  const sides = 3;

  return (
    <div className={styles.boxes}>
      {Array.from(Array(numberOfBoxes).keys()).map((_, index) => (
        <div key={`box-${index}`} className={styles.box}>
          {Array.from(Array(sides).keys()).map((_, index) => (
            <div key={`side-${index}`} className="side" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default LoadingBoxes;
