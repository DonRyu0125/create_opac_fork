interface Item {
    label: string;
    name: string;
    summary: boolean;
    grid: boolean;
    detail: boolean;
}

interface FieldsJson {
    database: string;
    items: Item[];
}f