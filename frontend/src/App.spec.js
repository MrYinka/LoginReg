//Functional Testing Coming up!

import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';

import Routes from "./Routes";


test('Home Page with Default Messages', () => {
    const { getByText, getByLabelText } = render(<Routes/>);

    getByText("Social Profile");
    getByText("Simple Login/Register Application with PERN");

});
