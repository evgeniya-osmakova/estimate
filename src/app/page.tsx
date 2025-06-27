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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const FormTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background-color: #45a049;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 8px 12px;
  background-color: #2196f3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-bottom: 20px;

  &:hover {
    background-color: #0b7dda;
  }
`;

export default function Home() {
  return (
    <Container>
      <Title>Редактор сметы</Title>
      <StyledLink href="/about">О проекте</StyledLink>

      <Table>
        <thead>
          <tr>
            <TableHeader>№</TableHeader>
            <TableHeader>Наименование</TableHeader>
            <TableHeader>Количество</TableHeader>
            <TableHeader>Цена за единицу</TableHeader>
            <TableHeader>Сумма</TableHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell>1</TableCell>
            <TableCell>Пример позиции</TableCell>
            <TableCell>2</TableCell>
            <TableCell>1000 ₽</TableCell>
            <TableCell>2000 ₽</TableCell>
          </tr>
          {/* Здесь будут отображаться добавленные позиции */}
        </tbody>
      </Table>

      <Form>
        <FormTitle>Добавление позиции</FormTitle>

        <FormGroup>
          <Label htmlFor="name">Наименование</Label>
          <Input type="text" id="name" name="name" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="quantity">Количество</Label>
          <Input type="number" id="quantity" name="quantity" min="1" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">Цена за единицу</Label>
          <Input type="number" id="price" name="price" min="0" step="0.01" />
        </FormGroup>

        <Button type="submit">Добавить</Button>
      </Form>
    </Container>
  );
}
