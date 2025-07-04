import { z } from 'zod'
import { FORM_SCHEMA } from '@/constants/form'

export interface EstimateItem {
    id: string;
    name: string;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
}

export interface Estimate {
    id: string;
    items: EstimateItem[];
    totalSum: number;
}

export const Fields = {
    NAME: 'name',
    QUANTITY: 'quantity',
    PRICE_PER_UNIT: 'pricePerUnit',
} as const ;

type FieldKey = keyof typeof Fields;
export type Field = typeof Fields[FieldKey];

export type FormData = z.infer<typeof FORM_SCHEMA>;
