import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    const modalError = this.state.error ? 'not' : ''; // This is just for the modal
    return (
      <div>
        <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInalidSubmit}>
          <AvField name="email" label="Email Address" type="email" required />
          <Button color="primary">Submit</Button>
        </AvForm>

        {/* below this is just for show, it's not needed unless you want a modal upon form submission */}
        <Modal isOpen={this.state.email !== false} toggle={this.closeModal}>
          <ModalHeader toggle={this.closeModal}>Form is {modalError} valid!</ModalHeader>
          <ModalBody>
            You have {modalError} successfully filled out the form and submitted it. Your email ({this.state.email}) is {modalError} valid!
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.closeModal}>Ok, got it!</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.handleInalidSubmit = this.handleInalidSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {email: false};
  }

  handleValidSubmit(event, values) {
    this.setState({email: values.email});
  }

  handleInalidSubmit(event, errors, values) {
    this.setState({email: values.email, error: true});
  }

  closeModal() {
    this.setState({email: false, error: false});
  }
}
