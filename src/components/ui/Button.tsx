'use client';

import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
    padding: 5px 10px;
    background-color: ${props => 
        props.$variant === 'primary' ? 'var(--color-primary)' : 'var(--color-danger)'};
    color: var(--color-white);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: flex-start;
    margin-left: 0;
    min-width: 100px;

    &:hover {
        background-color: ${props => 
            props.$variant === 'primary' ? 'var(--color-primary-dark)' : 'var(--color-danger-dark)'};
    }

    &:disabled {
        background-color: var(--color-disabled);
        cursor: not-allowed;
    }
`;

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    variant = 'primary',
    children,
    ...props
}) => {
    return (
        <StyledButton $variant={variant} {...props}>
            {children}
        </StyledButton>
    );
};

export default Button;
