export const checkId = (repository:any[], id:string) => {
    const item = repository.find(item => item.id === id)

    const exists = item ? true : false

    return exists
}

 