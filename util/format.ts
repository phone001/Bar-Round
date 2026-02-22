export const numberFormatter = (value: number) => {
    if(isNaN(value)) return value;
    return new Intl.NumberFormat('ko-KR').format(value);
}
