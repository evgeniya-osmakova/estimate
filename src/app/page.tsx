'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/ui/Button';
import StyledLink from '@/components/ui/StyledLink';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addItem, updateItem, deleteItem, selectItems, selectTotalSum, selectEstimateId } from '@/store/itemsSlice';
import { EstimateItem } from '@/types';
import { useToast } from '@/components/providers/ToastProvider';
import SaveStatus from '@/components/ui/SaveStatus';
import {
  CellInput,
  EditableCell,
  Table,
  TableCell,
  TableHeader,
  Title,
  Container,
  Input,
  CenteredCell,
  TotalSum,
  ActionsContainer,
} from '@/app/style'

export default function Home() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const totalSum = useAppSelector(selectTotalSum);
  const estimateId = useAppSelector(selectEstimateId);
  const { showToast } = useToast();

  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    quantity: z.number().positive({ message: "Quantity must be greater than 0" }),
    price: z.number().positive({ message: "Price must be greater than 0" })
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      quantity: 1,
      price: 0
    }
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).map(error => error.message);
      showToast(`Validation error: ${errorMessages.join(', ')}`, 'error');
    }
  }, [errors, showToast]);

  useEffect(() => {
    showToast("Autosave enabled: All changes are automatically saved", 'success', 5000);
  }, [showToast]);

  const watchedValues = watch();

  const [editingCell, setEditingCell] = useState<{
    itemId: string | null;
    field: string | null;
  }>({
    itemId: null,
    field: null
  });

  const [editValue, setEditValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editingCell.itemId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  const handleCellClick = (itemId: string, field: 'name' | 'quantity' | 'pricePerUnit', value: string | number) => {
    setEditingCell({ itemId, field });
    setEditValue(String(value));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditSave = () => {
    if (editingCell.itemId !== null && editingCell.field !== null) {
      const value = editingCell.field === 'name'
        ? editValue
        : parseFloat(editValue) || 0;

      dispatch(updateItem({
        id: editingCell.itemId,
        field: editingCell.field,
        value
      }));

      showToast("Changes saved automatically", 'success');

      setEditingCell({ itemId: null, field: null });
      setEditValue('');
    }
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      setEditingCell({ itemId: null, field: null });
      setEditValue('');
    }
  };

  const handleBlur = () => {
    handleEditSave();
  };

  const handleNewItemKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputs = document.querySelectorAll('tfoot input');
      const currentIndex = Array.from(inputs).indexOf(e.target as HTMLInputElement);

      if (currentIndex < inputs.length - 1) {
        (inputs[currentIndex + 1] as HTMLInputElement).focus();
      } else {
        document.getElementById('add-item-button')?.click();
      }
    }
  };

  const onSubmit = (data: FormData) => {
    dispatch(addItem({
      name: data.name,
      quantity: data.quantity,
      pricePerUnit: data.price
    }));

    showToast("Changes saved automatically", 'success');

    reset({
      name: '',
      quantity: 1,
      price: 0
    });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteItem(id));
    showToast("Changes saved automatically", 'success');
  };

  const handleDownloadJSON = () => {
    const estimate = {
      id: estimateId,
      items: items,
      totalSum: totalSum
    };

    const jsonString = JSON.stringify(estimate, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `estimate-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("Estimate downloaded", 'success');
  };

  const tableHeaders = ['Name', 'Quantity', 'Price per unit', 'Actions'];

  return (
    <Container>
      <Title>Estimate Editor</Title>
      <StyledLink href="/about" variant="secondary" marginBottom="20px">About</StyledLink>

      <Table>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <TableHeader key={index}>
                {header}
              </TableHeader>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <EditableCell
                  $width="700px"
                $isEditing={editingCell.itemId === item.id && editingCell.field === 'name'}
                onClick={() => handleCellClick(item.id, 'name', item.name)}
              >
                {editingCell.itemId === item.id && editingCell.field === 'name' ? (
                  <CellInput
                    ref={inputRef}
                    type="text"
                    value={editValue}
                    onChange={handleEditChange}
                    onBlur={handleBlur}
                    onKeyDown={handleEditKeyPress}
                  />
                ) : (
                  item.name
                )}
              </EditableCell>

              <EditableCell
                  $width="100px"
                $isEditing={editingCell.itemId === item.id && editingCell.field === 'quantity'}
                onClick={() => handleCellClick(item.id, 'quantity', item.quantity)}
              >
                {editingCell.itemId === item.id && editingCell.field === 'quantity' ? (
                  <CellInput
                    ref={inputRef}
                    type="number"
                    min="1"
                    value={editValue}
                    onChange={handleEditChange}
                    onBlur={handleBlur}
                    onKeyDown={handleEditKeyPress}
                  />
                ) : (
                  item.quantity
                )}
              </EditableCell>

              <EditableCell
                  $width="200px"
                $isEditing={editingCell.itemId === item.id && editingCell.field === 'pricePerUnit'}
                onClick={() => handleCellClick(item.id, 'pricePerUnit', item.pricePerUnit)}
              >
                {editingCell.itemId === item.id && editingCell.field === 'pricePerUnit' ? (
                  <CellInput
                    ref={inputRef}
                    type="number"
                    min="0"
                    step="0.01"
                    value={editValue}
                    onChange={handleEditChange}
                    onBlur={handleBlur}
                    onKeyDown={handleEditKeyPress}
                  />
                ) : (
                  `${item.pricePerUnit} $`
                )}
              </EditableCell>

              <CenteredCell>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </CenteredCell>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <TableCell $width="700px">
              <div style={{ position: 'relative' }}>
                <Input
                  type="text"
                  placeholder="Name"
                  {...register('name')}
                  onKeyDown={handleNewItemKeyPress}
                />
                {errors.name && (
                  <div style={{ color: 'red', fontSize: '12px', position: 'absolute' }}>
                    {errors.name.message}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell  $width="100px">
              <div style={{ position: 'relative' }}>
                <Input
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  {...register('quantity', { valueAsNumber: true })}
                  onKeyDown={handleNewItemKeyPress}
                />
                {errors.quantity && (
                  <div style={{ color: 'red', fontSize: '12px', position: 'absolute' }}>
                    {errors.quantity.message}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell $width="195px">
              <div style={{ position: 'relative' }}>
                <Input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Price"
                  {...register('price', { valueAsNumber: true })}
                  onKeyDown={handleNewItemKeyPress}
                />
                {errors.price && (
                  <div style={{ color: 'red', fontSize: '12px', position: 'absolute' }}>
                    {errors.price.message}
                  </div>
                )}
              </div>
            </TableCell>
            <CenteredCell>
              <Button
                id="add-item-button"
                onClick={hookFormSubmit(onSubmit)}
              >
                Add
              </Button>
            </CenteredCell>
          </tr>
        </tfoot>
      </Table>

      <ActionsContainer>
        <Button onClick={handleDownloadJSON}>Download JSON</Button>
        <TotalSum>Total: {totalSum} $</TotalSum>
      </ActionsContainer>
      <SaveStatus />
    </Container>
  );
}
