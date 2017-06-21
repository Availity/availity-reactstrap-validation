import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AvInput from './AvInput';
import AvGroup from './AvGroup';
import AvFeedback from './AvFeedback';
import {Col, FormText, Label} from 'reactstrap';
import {observer} from 'mobx-react';

const colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

export class AvField extends Component {
  static propTypes = Object.assign({}, AvInput.propTypes, {
    label: PropTypes.node,
    labelHidden: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    id: PropTypes.string,
    inputClass: PropTypes.string,
    labelClass: PropTypes.string,
    helpMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    errorMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    labelAttrs: PropTypes.object,
    groupAttrs: PropTypes.object,
    grid: PropTypes.object,
  });

  static contextTypes = {
    FormCtrl: PropTypes.object.isRequired,
  };

  render() {
    let row = false;
    const col = {};
    const labelCol = {};
    const {
      helpMessage,
      label,
      labelHidden,
      inputClass,
      labelClass,
      children,
      id: omit,
      size,
      disabled,
      readOnly,
      grid,
      labelAttrs,
      groupAttrs,
      ...attributes
    } = this.props;
    const id = this.props.id || attributes.name;

    if (grid) {
      colSizes.forEach(colSize => {
        if (grid[colSize]) {
          row = true;
          const sizeNum = parseInt(grid[colSize], 10);
          col[colSize] = sizeNum;
          labelCol[colSize] = 12 - sizeNum;
        }
      });
    }

    const input = (<AvInput
      id={id}
      className={inputClass}
      size={size}
      disabled={disabled}
      readOnly={readOnly}
      {...attributes}
    >
      {children}
    </AvInput>);

    const validation = this.context.FormCtrl.getInputState(this.props.name);

    const feedback = validation.errorMessage ? (<AvFeedback>{validation.errorMessage}</AvFeedback>) : null;
    const help = helpMessage ? (<FormText>{helpMessage}</FormText>) : null;

    return (
      <AvGroup disabled={disabled} row={row} {...groupAttrs}>
        {label && <Label
          for={id}
          className={labelClass}
          hidden={labelHidden}
          size={size}
          {...labelCol}
          {...labelAttrs}
        >
          {label}
        </Label>}
        {row ? <Col {...col}>{input}{feedback}{help}</Col> : input}
        {!row && feedback}
        {!row && help}
      </AvGroup>
    );
  }
}

export default observer(AvField);
