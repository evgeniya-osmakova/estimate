import styled from 'styled-components'

export const TableCell = styled.td<{ $width?: string }>`
    padding: 15px;
    border: 1px solid var(--color-border);
    height: 45px;
    position: relative;
    width: ${props => props.$width ?? 'auto'};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const EditableCell = styled(TableCell)<{ $isEditing: boolean, $width?: string }>`
    cursor: pointer;
    background-color: ${props => props.$isEditing ? 'var(--color-light-gray)' : 'transparent'};
    max-width: ${props => props.$width};
    width: ${props => props.$width ?? 'auto'};

    &:hover {
        background-color: var(--color-light-gray);
    }
`;

export const CenteredCell = styled(TableCell)`
    text-align: center;
    width: 50px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0 5px;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    height: 30px;
    box-sizing: border-box;
    margin: 0;
    vertical-align: middle;
`;

export const CellInput = styled(Input)`
    height: 25px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const Error = styled.div`
    color: var(--color-error);
    font-size: 12px;
    position: absolute;
`;
