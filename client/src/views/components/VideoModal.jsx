import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const VideoModal = ({ open, onClose, videoUrl }) => {
  return (
    <Modal open={open} onClose={onClose} size='small'>
      <Modal.Content>
        <iframe
          title='YouTube Video'
          width='100%'
          height='315'
          src={`https://www.youtube.com/embed/${videoUrl}`}
          frameBorder='0'
          allowFullScreen
        ></iframe>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose} negative>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default VideoModal;
