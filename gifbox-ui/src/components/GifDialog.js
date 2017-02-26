import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';


// TODO: Loading progress

const GifDialog = ({ title, image, active, toggleDialogActive }) => {
  const actions = [
    { label: 'Close', onClick: toggleDialogActive },
  ];

  return (
    <Dialog
      type='fullscreen'
      actions={ actions }
      active={ active }
      onEscKeyDown={ toggleDialogActive }
      title={ title }
    >
      <img alt='Full size gif' src={ image.full_size_url } />
    </Dialog>
  );
};


GifDialog.propTypes = {
  title: React.PropTypes.string.isRequired,
  image: React.PropTypes.object.isRequired,
  toggleDialogActive: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
};


export default GifDialog;
