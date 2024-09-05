export type UeUserType = {
    userId: number;
    email: string;
    administrator: boolean;
    permissionRead: boolean;
    permissionWrite: boolean;
    permissionImport: boolean;
    permission?: string;
    status: 'ACTIVE' | 'INACTIVE' | 'INVITED';
};

export type UeInviteType = Omit<UeUserType, "userId"> & {
    id?: number;
    status: 'CONFIRMED' | 'INVITED' | 'REJECTED';
};

export type UeUserInviteDetail = {
    id: number,
    email: string,
    createdName: string,
    ueName: string
}

export const getPermission = (ueUser: UeUserType) => {
    let perm = ueUser.administrator ? 'ADMIN' : '';
    perm += ueUser.permissionRead ? 'LEITURA' : '';
    perm += ueUser.permissionWrite ? 'ESCRITA' : '';
    perm += ueUser.permissionImport ? 'IMPORTACAO' : '';
    return perm;
}