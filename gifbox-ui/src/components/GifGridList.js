import React from 'react';

import GifCard from '/components/GifCard';
import styles from '/styles.scss';


const GifGridList = () => (
  <div>
    <GifCard url='https://jadedraver-reptivision-dev-2.s3-ap-southeast-2.amazonaws.com/__sized__/gifs/2016-12-11/2016-12-11_150259874983_3hourly-thumbnail-200x200.gif' />
  </div>
);

GifGridList.propTypes = {
};

export default GifGridList;
