import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import { Form, Button } from 'reactstrap';
import { AvForm } from '../src';

jest.mock('reactstrap');

describe('AvForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('should render "Form" by default', () => {
    render(<AvForm />);

    expect(Form).toHaveBeenCalledTimes(1);
  });

  test('should allow the tag to be overriden', () => {
    render(<AvForm tag={Button} />);

    expect(Button).toHaveBeenCalledTimes(1);
  });

  test('should add onKeyDown event handler when the tag is not a form', async () => {
    const onSubmit = jest.fn();

    const { getByText } = render(
      <AvForm tag="div" onKeyDown={() => {}} onSubmit={onSubmit}>
        Hello
        <button type="submit">Submit</button>
      </AvForm>
    );

    fireEvent.keyDown(getByText('Submit'), {
      keyCode: 13
    });

    await wait(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  test('should add the no validate attribute to prevent browser validation', () => {
    const { getByTestId } = render(<AvForm tag="div" data-testid="form-container" />);

    const form = getByTestId('form-container');

    expect(form.getAttribute('novalidate')).toBe('');
  });
});
