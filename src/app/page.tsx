'use client';

import React, { useCallback } from 'react'
import Button from '@/components/ui/Button';
import StyledLink from '@/components/ui/StyledLink';
import { useAppSelector } from '@/store/hooks';
import { selectItems, selectTotalSum, selectEstimateId } from '@/store/itemsSlice';
import { useToast } from '@/components/providers/ToastProvider';
import SaveStatus from '@/components/ui/SaveStatus';
import {
  Table,
  TableHeader,
  Title,
  Container,
  TotalSum,
  ActionsContainer,
} from '@/app/style'
import { ItemRow } from '@/app/components/ItemRow'
import { NewItemRow } from '@/app/components/NewItemRow'

export default function Home() {
  const items = useAppSelector(selectItems);
  const totalSum = useAppSelector(selectTotalSum);
  const estimateId = useAppSelector(selectEstimateId);
  const { showToast } = useToast();

  const handleDownload = useCallback(() => {
    const data = {
      id: estimateId,
      items,
      totalSum,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estimate-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Estimate downloaded');
  }, [estimateId, items, totalSum, showToast]);

  return (
    <Container>
      <Title>Estimate Editor</Title>
      <StyledLink href="/about" variant="secondary" marginBottom="20px">
        About
      </StyledLink>

      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Price per unit</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>

        <tbody>
          {items.map(item => (
            <ItemRow
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              pricePerUnit={item.pricePerUnit}
            />
          ))}
        </tbody>

        <NewItemRow />
      </Table>

      <ActionsContainer>
        <Button onClick={handleDownload}>Download JSON</Button>
        <TotalSum>Total: {totalSum} $</TotalSum>
      </ActionsContainer>

      <SaveStatus />
    </Container>
  );
}
