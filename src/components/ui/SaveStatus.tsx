'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppSelector } from '@/store/hooks';
import { selectIsSaving } from '@/store/saveStatusSlice';

const fadeInOut = keyframes`
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
`;

const SaveStatusContainer = styled.div<{ $visible: boolean }>`
    position: fixed;
    bottom: 20px;
    left: 50%;
    background-color: var(--color-overlay);
    color: var(--color-white);
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    opacity: ${props => props.$visible ? 1 : 0};
    transition: opacity 0.3s ease-in-out;
    z-index: 1000;
    display: flex;
    align-items: center;
`;

const DotAnimation = styled.span`
    display: inline-block;
    margin-left: 4px;

    &::after {
        content: '...';
        animation: ${fadeInOut} 1.5s infinite;
    }
`;

const SaveStatus: React.FC = () => {
    const isSaving = useAppSelector(selectIsSaving);

    return (
        <SaveStatusContainer $visible={isSaving}>
            <span>Saving</span>
            <DotAnimation />
        </SaveStatusContainer>
    );
};

export default SaveStatus;
