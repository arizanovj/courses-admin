
import { Direction } from "./keyset-pagination.component";

export class KeysetPaginatedList {
    public IDs: Object;
    public direction: Direction;
    readonly NUM_OF_ITEMS = 10;
    readonly LAST_ID = 0;
    readonly DIRECTION = Direction.Up;

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
