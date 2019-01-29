export class Course{
    id:number;
    name:string;
    description:string;
    cover:string;
    created_at:string;
    updated_at:string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}


