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

export const ActionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
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
