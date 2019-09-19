import React from 'react'
import { render } from '@testing-library/react';
import { AvInput } from '../src';

describe('AvInput', () => {
    test("renders",() => {
        render(<AvInput />)
    })
})