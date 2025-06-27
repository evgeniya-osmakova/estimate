'use client';

import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  padding: 5px 10px;
  background-color: ${props => 
    props.$variant === 'primary' ? '#4caf50' : '#f44336'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
  margin-left: 0;
  min-width: 100px;

  &:hover {
    background-color: ${props => 
      props.$variant === 'primary' ? '#45a049' : '#d32f2f'};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = ({
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
