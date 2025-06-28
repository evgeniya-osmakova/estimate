import { useAppDispatch } from '@/store/hooks'
import { useToast } from '@/components/providers/ToastProvider'
import React, { useState } from 'react'
import { Field, Fields } from '@/types'
import { deleteItem, updateItem } from '@/store/itemsSlice'
import {
  CellInput,
  EditableCell,
  CenteredCell,
} from './style'
import Button from '@/components/ui/Button'

interface ItemRowProps {
  id: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
}

export const ItemRow: React.FC<ItemRowProps> = React.memo(({ id, name, quantity, pricePerUnit }) => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [editing, setEditing] = useState<Field | null>(null);
  const [value, setValue] = useState<string>('');

  const startEdit = (field: Field, initial: string) => {
    setEditing(field);
    setValue(initial);
  };
  const cancelEdit = () => setEditing(null);

  const saveEdit = () => {
    if (editing) {
      const parsed = editing === Fields.NAME ? value : parseFloat(value) || 0;
      dispatch(updateItem({ id, field: editing, value: parsed }));
      showToast('Changes saved');
      cancelEdit();
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        saveEdit();
    }

    if (e.key === 'Escape') {
        cancelEdit();
    }
  };

  return (
    <tr>
      {([Fields.NAME, Fields.QUANTITY, Fields.PRICE_PER_UNIT]).map(field => {
        const text =
          field === Fields.NAME
            ? name
            : field === Fields.QUANTITY
              ? quantity
              : pricePerUnit + ' $';
        const width =
          field === Fields.NAME ? '700px' : field === Fields.QUANTITY ? '100px' : '200px';

        return (
          <EditableCell
            key={field}
            $width={width}
            $isEditing={editing === field}
            onClick={() => startEdit(field, String(text))}
          >
            {editing === field ? (
              <CellInput
                type={field === Fields.NAME ? 'text' : 'number'}
                min={field === Fields.QUANTITY ? '1' : '0'}
                step={field === Fields.PRICE_PER_UNIT ? '0.01' : undefined}
                autoFocus
                value={value}
                onChange={e => setValue(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={onKey}
              />
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
});

ItemRow.displayName = 'ItemRow';
