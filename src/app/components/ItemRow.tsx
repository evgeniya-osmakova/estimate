"use client"

import { useAppDispatch } from '@/store/hooks'
import { useToast } from '@/components/providers/ToastProvider'
import React, { useState } from 'react'
import { Field, Fields, FormData } from '@/types'
import { deleteItem, updateItem } from '@/store/itemsSlice'
import {
    CellInput,
    EditableCell,
    CenteredCell,
    Error,
} from './style'
import Button from '@/components/ui/Button'
import { Controller, useForm, FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FORM_SCHEMA } from '@/constants/form'

interface ItemRowProps {
    id: string;
    name: string;
    quantity: number;
    pricePerUnit: number;
}

export const ItemRow: React.FC<ItemRowProps> = ({ id, name, quantity, pricePerUnit }) => {
    const dispatch = useAppDispatch();
    const { showToast } = useToast();
    const [editing, setEditing] = useState<Field | null>(null);
    const [originalValue, setOriginalValue] = React.useState<string>('');

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(FORM_SCHEMA),
        defaultValues: { name: '', quantity: undefined, pricePerUnit: undefined },
        shouldUnregister: true,
    });

    const startEdit = React.useCallback((field: Field) => {
        const orig = field === Fields.NAME
            ? name
            : field === Fields.QUANTITY
                ? String(quantity)
                : String(pricePerUnit);

        reset({ name, quantity, pricePerUnit });
        setOriginalValue(orig);
        setEditing(field);
    }, [name, quantity, pricePerUnit, reset]);

    const cancelEdit = () => setEditing(null);

    const onError = (errs: FieldErrors<FormData>) => {
        if (editing && errs[editing]?.message) {
            showToast(errs[editing]!.message, 'error');
        }
    };

    const onSave = (data: FormData) => {
        if (!editing) {
            return;
        }

        const value =
            editing === Fields.NAME
                ? data.name
                : editing === Fields.QUANTITY
                    ? data.quantity
                    : data.pricePerUnit;

        dispatch(updateItem({ id, field: editing, value }));
        showToast('Changes saved');
        cancelEdit();
    };

    return (
        <tr>
            {([Fields.NAME, Fields.QUANTITY, Fields.PRICE_PER_UNIT]).map(field => {
                let text: string | number = '';
                let width;

                switch (field) {
                    case Fields.NAME:
                        text = name;
                        width = '650px'
                        break;
                    case Fields.QUANTITY:
                        text = quantity;
                        width = '210px'
                        break;
                    case Fields.PRICE_PER_UNIT:
                        text = pricePerUnit + ' $';
                        width = '195px'
                        break;
                    default:
                        break;
                }

                return (
                    <EditableCell
                        key={field}
                        $width={width}
                        $isEditing={editing === field}
                        onClick={() => {
                            if (editing && editing !== field) {
                                handleSubmit(onSave, onError)();
                            }
                            startEdit(field);
                        }}
                    >
                        {editing === field ? (
                            <>
                                <Controller
                                    name={field as keyof FormData}
                                    control={control}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <CellInput
                                            ref={ref}
                                            type={field === Fields.NAME ? 'text' : 'number'}
                                            min={field === Fields.QUANTITY ? 1 : 0}
                                            step={field === Fields.PRICE_PER_UNIT ? 0.01 : undefined}
                                            autoFocus
                                            value={value ?? ''}
                                            onChange={(e) => onChange(e.target.value as any)}
                                            onBlur={(e) => {
                                                const raw = e.target.value;
                                                onBlur();

                                                if (raw === originalValue) {
                                                    cancelEdit();
                                                } else {
                                                    handleSubmit(onSave, onError)();
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleSubmit(onSave)();
                                                } else if (e.key === 'Escape') {
                                                    cancelEdit();
                                                }
                                            }}
                                        />
                                    )}
                                />
                                {errors[field] && (
                                    <Error>{errors[field]?.message}</Error>
                                )}
                            </>
                        ) : (
                            text
                        )}
                    </EditableCell>
                );
            })}

            <CenteredCell>
                <Button
                    variant="danger"
                    onClick={() => {
                        dispatch(deleteItem(id));
                        showToast('Item deleted');
                    }}
                >
                    Delete
                </Button>
            </CenteredCell>
        </tr>
    );
};

ItemRow.displayName = 'ItemRow';
