
import {isArray} from "rxjs/util/isArray";

export class Email {
    public id: string;
    public to: string;
    public from: string;

    constructor() {
        this.id = Math.random().toString().slice(2, 11);
    }

    public setId(id: string): this {
        this.id = id;
        return this;
    }

    public setTo(emails: string | string[]): this {
        this.to = isArray(emails) ? emails.join(',') : emails;
        return this;
    }

    public setFrom(email: string): this {
        this.from = email;
        return this;
    }
}
