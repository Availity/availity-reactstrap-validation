import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default () => {
  const [email, setEmail] = React.useState(false);
  const [error, setError] = React.useState();

  const handleValidSubmit = (_event, values) => {
    setEmail(values.email);
  };

  const handleInvalidSubmit = (_event, _errors, values) => {
    setEmail(values.email);
    setError(true);
  };

  const closeModal = () => {
    setEmail(false);
    setError(false);
  };

  const modalError = error ? 'not' : ''; // This is just for the modal
  return (
    <div>
      <AvForm onValidSubmit={handleValidSubmit} onInvalidSubmit={handleInvalidSubmit}>
        <AvField name="email" label="Email Address" type="email" required />
        <Button color="primary">Submit</Button>
      </AvForm>

      {/* below this is just for show, it's not needed unless you want a modal upon form submission */}
      <Modal isOpen={email !== false} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Form is {modalError} valid!</ModalHeader>
        <ModalBody>
          You have {modalError} successfully filled out the form and submitted it.
          Your email ({email}) is {modalError} valid!
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeModal}>Ok, got it!</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
