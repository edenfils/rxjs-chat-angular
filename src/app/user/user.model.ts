import { uuid } from '../util/uuid';
// tslint:disable-next-line: jsdoc-format

/**
 * A User represents an agent that sends messages
*/


export class User {
    id: string;

    constructor(public name: string, public avatarSrc: string) {
        this.id = uuid();
    }
}