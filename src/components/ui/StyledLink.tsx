'use client';

import React, { PropsWithChildren } from 'react'
import styled from 'styled-components';
import Link from 'next/link';
import { LinkProps } from 'next/link';

export type StyledLinkVariant = 'primary' | 'secondary';

export interface StyledLinkProps extends LinkProps {
    variant?: StyledLinkVariant;
    className?: string;
    marginTop?: string;
    marginBottom?: string;
}

const StyledLinkComponent = styled(Link)<{
    $variant: StyledLinkVariant;
    $marginTop?: string;
    $marginBottom?: string;
}>`
    display: inline-block;
    padding: ${props => props.$variant === 'primary' ? '10px 15px' : '8px 12px'};
    background-color: ${props => 
        props.$variant === 'primary' ? 'var(--color-primary)' : 'var(--color-secondary)'};
    color: var(--color-white);
    text-decoration: none;
    border-radius: 4px;
    margin-top: ${props => props.$marginTop || '0'};
    margin-bottom: ${props => props.$marginBottom || '0'};

    &:hover {
        background-color: ${props => 
            props.$variant === 'primary' ? 'var(--color-primary-dark)' : 'var(--color-secondary-dark)'};
    }
`;

const StyledLink: React.FC<PropsWithChildren<StyledLinkProps>> = ({
    variant = 'primary',
    children,
    marginTop,
    marginBottom,
    ...props
}) => {
    return (
        <StyledLinkComponent
            $variant={variant}
            $marginTop={marginTop}
            $marginBottom={marginBottom}
            {...props}
        >
            {children}
        </StyledLinkComponent>
    );
};

export default StyledLink;
