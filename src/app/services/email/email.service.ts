
import {Email} from "../../entities/email/email";

export class EmailService {
    private emails: Email[] = [];

    public setTo(id: string, emails: string | string[]): this {
        let email = this.getEmail(id);

        email.setTo(emails);

        this.saveEmail(email);

        return this;
    }

    public getEmail(id: string): Email {
        let email = this.emails.find(email => email.id === id);

        if (!email) {
            // get email from database
            let results = {};

            email = this.hydrateEmail(results);
            this.emails.push(email);
        }

        return email;
    }

    public saveEmail(email: Email): void {
        // do work against the database
    }

    private hydrateEmail(item: any): Email {
        let email = new Email();

        email
            .setId(item.id)
            .setTo(item.to)
            .setFrom(item.from);

        return email;
    }
}
