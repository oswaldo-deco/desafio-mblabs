export const checkEmail = (email:string) => {
    const domain = email.split("@")
    const is_adm = domain[1]==="client.com" ?  true : false

    return is_adm
}