
import { Direction } from "./keyset-pagination.component";

export class KeysetPaginatedList {
    public IDs: Object;
    public direction: Direction;

    protected setIDs(data) {
        this.IDs = {
            'first': data[0].id,
            'last': data[data.length - 1].id,
        }
    }

    protected getIDs():Object {
        return this.IDs;
    }
    

}
