export type UUType = {
    id: number;
    name: string;
    color?: string | null;
}

export type UserBasicType = UUType & {
    email: string;
    nrUes: number;
};

export type UeBasicType = UUType