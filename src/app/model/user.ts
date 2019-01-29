export class User{
    id:number;
    email: string;
    first_name:string;
    last_name:string;
    is_admin: boolean;
    created_at:string;
    updated_at:string;
    password?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}


