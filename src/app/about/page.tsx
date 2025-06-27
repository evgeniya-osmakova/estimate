'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 20px;
  
  &:hover {
    background-color: #45a049;
  }
`;

export default function About() {
  return (
    <Container>
      <Title>О проекте</Title>

      <Content>
        <Paragraph>
          Данное приложение представляет собой редактор смет, который позволяет создавать и редактировать сметы для различных проектов.
        </Paragraph>

        <Paragraph>
          С помощью этого инструмента вы можете добавлять позиции в смету, указывая их наименование, количество и цену за единицу.
          Система автоматически рассчитает общую стоимость каждой позиции и всей сметы в целом.
        </Paragraph>
      </Content>

      <StyledLink href="/">Вернуться на главную</StyledLink>
    </Container>
  );
}
