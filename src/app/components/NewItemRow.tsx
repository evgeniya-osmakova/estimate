import { CenteredCell, TableCell, Error } from './style'
import Button from '@/components/ui/Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { addItem } from '@/store/itemsSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/store/hooks'
import { useToast } from '@/components/providers/ToastProvider'
import { z } from 'zod'
import React from 'react'

const FORM_SCHEMA = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  quantity: z.number().positive({ message: "Quantity must be greater than 0" }),
  pricePerUnit: z.number().positive({ message: "Price must be greater than 0" })
});
type FormData = z.infer<typeof FORM_SCHEMA>;

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

  const onSubmit: SubmitHandler<FormData> = data => {
    dispatch(
      addItem({ name: data.name, quantity: data.quantity, pricePerUnit: data.pricePerUnit })
    );
    showToast('Item added');
    reset();
  };

  return (
    <tfoot>
      <tr>
        <TableCell $width="700px">
          <input {...register('name')} placeholder="Name" />
          {errors.name && (
            <Error>
              {errors.name.message}
            </Error>
          )}
        </TableCell>

        <TableCell $width="100px">
          <input
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
          <input
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
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Add
          </Button>
        </CenteredCell>
      </tr>
    </tfoot>
  );
};
