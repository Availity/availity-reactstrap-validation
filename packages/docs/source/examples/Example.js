import React, { useState } from 'react';
import { AvForm, AvField } from '@availity/reactstrap-validation';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Example = () => {
  const [email, setEmail] = useState(false);
  const [error, setError] = useState(false);

  const modalError = error ? 'not' : ''; // This is just for the modal

  function handleValidSubmit(event, values) {
    setEmail(values.email);
  }

  function handleInvalidSubmit(event, errors, values) {
    setEmail(values.email);
    setError(true);
  }

  function closeModal() {
    setEmail(false);
    setError(false);
  }

  return (
    <div>
      <AvForm
        onValidSubmit={handleValidSubmit}
        onInvalidSubmit={handleInvalidSubmit}
      >
        <AvField name="email" label="Email Address" type="email" required />
        <Button color="primary">Submit</Button>
      </AvForm>

      {/* below this is just for show, it's not needed unless you want a modal upon form submission */}
      <Modal isOpen={email !== false} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>
          Form is {modalError} valid!
        </ModalHeader>
        <ModalBody>
          You have {modalError} successfully filled out the form and submitted
          it. Your email ({email}) is {modalError} valid!
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeModal}>
            Ok, got it!
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Example;