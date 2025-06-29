import { z } from 'zod'

export const FORM_SCHEMA = z.object({
    name: z.string().min(1, { message: "Name is required" }),

    quantity: z.preprocess(
        (val) => {
            if (typeof val === 'string') {
                const parsed = parseFloat(val);
                return isNaN(parsed) ? undefined : parsed;
            }
            return val;
        },
        z.number({
            required_error: "Quantity is required",
            invalid_type_error: "Quantity must be a number"
        }).positive({ message: "Quantity must be greater than 0" })
    ),

    pricePerUnit: z.preprocess(
        (val) => {
            if (typeof val === 'string') {
                const parsed = parseFloat(val);
                return isNaN(parsed) ? undefined : parsed;
            }
            return val;
        },
        z.number({
            required_error: "Price is required",
            invalid_type_error: "Price must be a number"
        }).positive({ message: "Price must be greater than 0" })
    ),
});
