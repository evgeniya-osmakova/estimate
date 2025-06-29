import { CenteredCell, TableCell, Error, CellInput } from './style'
import Button from '@/components/ui/Button'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { addItem } from '@/store/itemsSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/store/hooks'
import { useToast } from '@/components/providers/ToastProvider'
import React from 'react'
import { FORM_SCHEMA } from '@/constants/form'
import { FormData } from '@/types'

export const NewItemRow: React.FC = () => {
    const dispatch = useAppDispatch();
    const { showToast } = useToast();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(FORM_SCHEMA),
        defaultValues: { name: '', quantity: 1, pricePerUnit: 0 },
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        dispatch(
            addItem({ name: data.name, quantity: data.quantity, pricePerUnit: data.pricePerUnit })
        );
        showToast('Item was added');
        reset();
    };

    const onError: SubmitErrorHandler<FormData> = () => {
        showToast('Invalid input. Please check the fields for errors.', 'error');
    }

    return (
        <tfoot>
            <tr>
                <TableCell $width="650px">
                    <CellInput {...register('name')} placeholder="Name" />
                    {errors.name && (
                        <Error>
                            {errors.name.message}
                        </Error>
                    )}
                </TableCell>

                <TableCell $width="210px">
                    <CellInput
                        type="number"
                        {...register('quantity', { valueAsNumber: true })}
                        min={1}
                        placeholder="Qty"
                    />

                    {errors.quantity && (
                        <Error>
                            {errors.quantity.message}
                        </Error>
                    )}
                </TableCell>

                <TableCell $width="195px">
                    <CellInput
                        type="number"
                        {...register('pricePerUnit', { valueAsNumber: true })}
                        min={0}
                        step={0.01}
                        placeholder="Price"
                    />

                    {errors.pricePerUnit && (
                        <Error>
                            {errors.pricePerUnit.message}
                        </Error>
                    )}
                </TableCell>

                <CenteredCell>
                    <Button
                        disabled={isSubmitting || Object.keys(errors).length > 0}
                        onClick={handleSubmit(onSubmit, onError)}
                    >
                        Add
                    </Button>
                </CenteredCell>
            </tr>
        </tfoot>
    );
};
