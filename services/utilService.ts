
export const numberFormat = (value: number) => new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'GBP' }).format(value);
