# Estimate Editor

A web application for creating and managing estimates with real-time calculations and autosave functionality.

<img width="1284" alt="Screenshot 2025-06-29 at 20 27 15" src="https://github.com/user-attachments/assets/0fdb93eb-b4cb-4fc6-98ba-98c8858a4e53" />

## [Demo](https://estimate-v3v5.vercel.app/)

## Features

- **Dynamic Estimate Management**: Add, edit, and delete items in your estimate
- **Real-time Calculations**: Automatic calculation of item totals and estimate sum
- **Form Validation**: Comprehensive validation for all input fields
- **Autosave**: All changes are automatically saved to localStorage
- **Responsive Notifications**: Toast notifications for all actions
- **Export Functionality**: Download your estimate as a JSON file
- **Saving Status Indicator**: Visual feedback when your data is being saved

## Technologies Used

- **Frontend**: Next.js 15+, React 19, TypeScript
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Styled Components
- **Persistence**: localStorage for offline data storage

## Getting Started

### Prerequisites

- Node.js 23.11.0 or higher
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/estimate-editor.git
   cd estimate-editor
   ```

2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Creating an Estimate

1. Fill in the item details in the form at the bottom of the table:
   - Name: Enter the item name
   - Quantity: Enter a positive number
   - Price per unit: Enter a positive number

2. Click "Add" to add the item to your estimate.

### Editing an Item

1. Click on any cell in the table to edit its value.
2. Make your changes and press Enter or click outside the cell to save.
3. Press Escape to cancel editing.

### Deleting an Item

Click the "Delete" button next to an item to remove it from the estimate.

### Downloading Your Estimate

Click the "Download JSON" button to download your estimate as a JSON file.

## Project Structure

```
src/
├── app/                  # Next.js app directory
│   ├── about/            # About page
│   ├── api/              # API routes
│   ├── components/       # Page-specific components
│   ├── globals.css       # Global CSS variables
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main page component
├── components/           # Shared components
│   ├── providers/        # Context providers
│   └── ui/               # UI components
├── constants/            # Application constants
├── lib/                  # Styled Components registry
├── store/                # Redux store
│   ├── hooks.ts          # Custom Redux hooks
│   ├── index.ts          # Store configuration
│   ├── itemsSlice.ts     # Items reducer
│   └── saveStatusSlice.ts # Save status reducer
└── types/                # TypeScript type definitions
```

## Data Structure

The application uses the following data structure for estimates:

```typescript
interface EstimateItem {
    id: string;
    name: string;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
}

interface Estimate {
    id: string;
    items: EstimateItem[];
    totalSum: number;
}
```
