import React from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <AvForm>
        <AvField
          name="dateRange"
          label="Date (with relative dates)"
          type="date"
          validate={{ dateRange: { start: { value: -5, units: 'years' }, end: { value: 5, units: 'years' } } }}
        />
        <AvField
          name="dateRangeProp"
          label="Date (with absolute dates)"
          type="text"
          validate={{
            dateRange: { format: 'MM/DD/YYYY', start: { value: '01/01/2010' }, end: { value: '12/31/2020' } },
          }}
          title="Use MM/DD/YYYY"
        />
        <Button color="primary">Submit</Button>
      </AvForm>
    );
  }
}
