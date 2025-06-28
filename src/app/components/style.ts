import styled from 'styled-components'

export const TableCell = styled.td<{ $width?: string }>`
  padding: 15px;
  border: 1px solid #ddd;
  height: 45px;
  width: ${props => props.$width ?? 'auto'};
`;

export const EditableCell = styled(TableCell)<{ $isEditing: boolean, $width?: string }>`
  cursor: pointer;
  background-color: ${props => props.$isEditing ? '#f9f9f9' : 'transparent'};
    max-width: ${props => props.$width};
    width: ${props => props.$width ?? 'auto'};
    word-wrap: break-word;
`;

export const CenteredCell = styled(TableCell)`
  text-align: center;
  width: 50px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 30px;
  box-sizing: border-box;
  margin: 0;
  vertical-align: middle;
`;

export const CellInput = styled(Input)`
  height: 25px;
`;

export const Error = styled.span`
  color: red;
  font-size: 12
`;
