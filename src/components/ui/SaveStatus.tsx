'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { isSaving as globalIsSaving } from '@/store/index';

const fadeInOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const SaveStatusContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
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
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const checkSavingStatus = () => {
      setIsSaving(globalIsSaving);
    };

    checkSavingStatus();
    const intervalId = setInterval(checkSavingStatus, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <SaveStatusContainer $visible={isSaving}>
      <span>Saving</span>
      <DotAnimation />
    </SaveStatusContainer>
  );
};

export default SaveStatus;
