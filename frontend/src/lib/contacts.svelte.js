import { RestClient } from "./restclient";

export let contactsInTable = $state([]);

//GUI-Variablen

export let FORM_VISIBLE = $state({ state: "main" });
/*
    main: table
    edit: edit a kontakt
    delete: delete a kontakt

*/
export let contactToEdit = $state({})
export let contactToDelete = $state({
    id: "",
    name: "",
});

export const refreshTable = async () => {
    const restClient = new RestClient();

    const allContacts = await restClient.getAllContacts();
    // Clear existing Array
    contactsInTable.length = 0;

    allContacts.forEach(contact => {
        contactsInTable.push(contact);
    });

};