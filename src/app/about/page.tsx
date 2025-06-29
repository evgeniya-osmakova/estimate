'use client';

import React from 'react';
import styled from 'styled-components';
import StyledLink from '@/components/ui/StyledLink';

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

const Content = styled.div`
    margin-bottom: 30px;
    line-height: 1.6;
`;

const Paragraph = styled.p`
    margin-bottom: 15px;
`;


export default function About() {
    return (
        <Container>
            <Title>About</Title>

            <Content>
                <Paragraph>
                    This application is an estimate editor that allows you to create and edit estimates for various projects.
                </Paragraph>

                <Paragraph>
                    With this tool, you can add items to the estimate, specifying their name, quantity, and price per unit.
                    The system will automatically calculate the total cost of each item and the entire estimate.
                </Paragraph>
            </Content>

            <StyledLink href="/" marginTop="20px">Back to Home</StyledLink>
        </Container>
    );
}
