'use client';

import React, { useCallback, useEffect, useRef } from 'react'
import Button from '@/components/ui/Button';
import StyledLink from '@/components/ui/StyledLink';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectItems, selectTotalSum, selectEstimateId, setEstimate } from '@/store/itemsSlice';
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
import { setSaved, setSaving } from '@/store/saveStatusSlice'

export default function Home() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectItems);
    const totalSum = useAppSelector(selectTotalSum);
    const estimateId = useAppSelector(selectEstimateId);
    const { showToast } = useToast();

    const isFirstRender = useRef(true);

    useEffect(() => {
        try {
            const serializedState = localStorage.getItem('estimateData');
            if (serializedState) {
                const estimate = JSON.parse(serializedState);
                dispatch(setEstimate(estimate));
            }
        } catch (err) {
            showToast(`Error loading state from localStorage: ${err}`, 'error');
        }
    }, [dispatch]);

    useEffect(() => {
        if (items.length === 0) {
            return;
        }

        if (isFirstRender.current) {
            isFirstRender.current = false;

            return;
        }

        try {
            const estimate = {
                id: estimateId,
                items,
                totalSum,
            };
            localStorage.setItem('estimateData', JSON.stringify(estimate));
            dispatch(setSaving());
            setTimeout(() => {
                dispatch(setSaved());
            }, 300);
        } catch (err) {
            showToast(`Error saving state to localStorage: ${err}`, 'error');
        }
    }, [items, estimateId, totalSum]);

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
