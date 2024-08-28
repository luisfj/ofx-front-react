export type UUType = {
    id: number;
    name: string;
    color?: string | null;
}

export type UserBasicType = UUType & {
    email: string;
    nrUes: number;
};

export type UeBasicType = {
    ueId: number,
    ueName: string,
    createdUserId: number,
    createdEmail: string,
    color?: string | null;
}

export type UeBasicRegisterType = {
    name: string,
    color?: string | null;
}