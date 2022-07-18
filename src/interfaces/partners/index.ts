export interface IPartnerCreate{
    name:string,
    description:string,
    logo:string,
}

export interface IPartnerUpdate{
    id:string,
    name:string,
    description:string,
    logo:string,
    active:boolean
}