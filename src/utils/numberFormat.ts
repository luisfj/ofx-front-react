import { formatValue } from "react-currency-input-field";

export function formatCurrency(value: number | null, showPrefix: boolean = false) {
    return formatValue({
        value: '' + value ?? 0,
        decimalScale: 2,
        decimalSeparator: ',',
        groupSeparator: '.',
        prefix: showPrefix ? 'R$ ' : ''
        // prefix: (value && value < 0 ? '-' : ' '),
        // intlConfig: {
        //     locale: "pt-BR",
        //     currency: "BRL",
        // },
    });
}

export function formatCurrencyIntl(value: number | null, showPrefix: boolean = false) {
    const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value ?? 0)
    return formatted;
}
