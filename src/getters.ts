import config from "./config"

export interface Item {
    id: number,
    title: string,
    description: string
}

export const GetStock = async (userToken: string): Promise<Item[]> => {
    const token = userToken;
    return fetch(config.apiUrl, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    }).then(res => res.json()).then(res => {
        console.log(res);
        return res
    }).then(res => {
        return res.stock as Item[]
    })
}