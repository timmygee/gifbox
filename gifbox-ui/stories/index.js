import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import GifItem from '/components/GifItem';

// Needed to bring in main styles, roboto font etc
import '/styles/main.scss';

storiesOf('GifItem', module)
  .add('initial state', () => (
    <GifItem />
  ));
// storiesOf('Welcome', module)
//   .add('to Storybook', () => (
//     <Welcome showApp={linkTo('Button')}/>
//   ));

// storiesOf('Button', module)
//   .add('with text', () => (
//     <Button onClick={action('clicked')}>Hello Button</Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
//   ));
