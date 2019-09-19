import React from 'react';
import { Input, Label, FormGroup } from 'reactstrap';


// eslint-disable-next-line react/prop-types
export default ({ label, ...props }) => (
    <FormGroup>
        <Label>{label}</Label>
        <Input {...props} />
    </FormGroup>
)