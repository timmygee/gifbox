import React from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import styles from '/styles.scss';


const LoadingSpinner = () => (
  <div className={ styles['loading-spinner-container'] }>
    <div className={ styles['loading-spinner'] }>
      <ProgressBar
        type='circular'
        multicolor
      />
    </div>
  </div>
);

export default LoadingSpinner;
