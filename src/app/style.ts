import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const TotalSum = styled.div`
  text-align: right;
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
  padding: 10px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 15px;
  border: 1px solid #ddd;
  height: 45px;
`;

export const EditableCell = styled(TableCell)<{ $isEditing: boolean }>`
  cursor: pointer;
  background-color: ${props => props.$isEditing ? '#f9f9f9' : 'transparent'};
`;

export const CenteredCell = styled(TableCell)`
  text-align: center;
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
