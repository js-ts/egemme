import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import './Modal.css';
function MuiModal({ children, open, onExited, ...rest }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (open) {
      setShowModal(true);
    }
  }, [open]);

  function startExitAnimation() {
    setShowModal(false);
  }

  function onExitAnimationEnd() {
    onExited();
  }

  return (
    <Dialog
      {...rest}
      open={showModal}
      onClose={startExitAnimation}
      onExited={onExitAnimationEnd}
      contentStyle={{
        width: '80%',
        height: '80%',
        maxWidth: 'none'
      }}
    >
      {/* Modal styling    style={{"height" : "550px", "width" : "750px"}}   style={{ height: '80vh', width: '70vw' }}*/}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

MuiModal.propTypes = {
  ...Dialog.propTypes
};

export default MuiModal;
