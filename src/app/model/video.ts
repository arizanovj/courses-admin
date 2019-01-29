export class Video{
    id:number;
    name:string;
    description:string;
    src: string;
    course_id: number;
    cover:string;
    offline: boolean;
    created_at:string;
    updated_at:string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}


