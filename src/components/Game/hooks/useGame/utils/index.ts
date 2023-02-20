import { NumericRange } from '../../../../../@types';

export const convert1DIndexTo2DIndex = (
    index: NumericRange<0, 80>,
): NumericRange<0, 8>[] => {
    const pairIndexNum = index + parseInt(String(index / 9));
    const isOneDigitNum = `${pairIndexNum}`.length === 1;
    const rowIndex = isOneDigitNum
        ? (0 as const)
        : (parseInt(`${pairIndexNum}`[0]) as NumericRange<0, 8>);
    const columnIndex = isOneDigitNum
        ? (pairIndexNum as NumericRange<0, 8>)
        : (parseInt(`${pairIndexNum}`[1]) as NumericRange<0, 8>);

    return [rowIndex, columnIndex];
};

export const convert2DIndexTo1DIndex = (
    rowIndex: number,
    columnIndex: number,
) => {
    return parseInt(`${rowIndex}${columnIndex}`) - rowIndex;
};
