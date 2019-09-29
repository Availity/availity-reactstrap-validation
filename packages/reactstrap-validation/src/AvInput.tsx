import React from 'react';
import { Input, Label, FormGroup } from 'reactstrap';

interface InputAttributes extends React.HTMLAttributes<HTMLInputElement> {
  label?: string;
}

// eslint-disable-next-line react/prop-types
export default ({ label, ...props }:InputAttributes) => (
  <FormGroup>
    <Label>{label} World</Label>
    <Input {...props} />
  </FormGroup>
);
