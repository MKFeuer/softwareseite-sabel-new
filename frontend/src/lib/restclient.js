export class RestClient {
    constructor() {
        this.url = 'http://127.0.0.1:3000/entries/'
    }

    //CREATE
    async createContact(contact) {
        await fetch(this.url, {
            method: 'POST',
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
    }

    //READ
    async getAllContacts() {
        const response = await fetch(this.url);
        const allContacts = await response.json();
        return allContacts;
    }

    getSecificContakt(id) {
        return {};
    }

    //UPDATE
    async updateContact(contact) {
        await fetch(`${this.url}${contact.id}`, {
            method: 'PUT',
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
    }

    //DELETE
    async deleteContact(id) {
        await fetch(`${this.url}${id}`, {
            method: 'DELETE'
        });
    }
}