
export interface NavRoute {
    route: string;
    text: string;
}

export interface DynamicTableContent {
    headers: ColumnDef[];
    rows: JSX.Element[];
}

export interface ColumnDef {
    key: string,
    label: string;
}

export interface SelectItem {
    value: string;
    label: string;
}