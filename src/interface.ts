
export type User = {
    username?:string,
    id?:number,
    email?: string,
    groups: string[],
}

export type UserState = {
    isAuth: boolean,
    user: User
}

export type Car = {
    body_type: string,
    engine: string,
    id: number,
    make: string,
    model: string,
    series: string,
    year: string
}

export type CarState = {
    cars: Car[]
}

export type GlobalState = {
    user: UserState,
    cars: CarState
}

export type PartShape = {
    brand: string,
    cars: Car[],
    category: string,
    description: string,
    id: number,
    image_filename?: string,
    image_url?: string,
    inventory: number,
    name: string,
    part_no: string,
    price: string
}
