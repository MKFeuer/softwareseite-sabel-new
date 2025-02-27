<script>
    import { goto } from "$app/navigation";
    import {
        entriesInTable,
        contactToDelete,
        contactToEdit,
        FORM_VISIBLE,
        refreshTable,
    } from "$lib/entries.svelte"
    import { RestClient } from "$lib/restclient";
    import ReallyDelete from "./ReallyDelete.svelte";

    //Show ID for Development
    const DEBUG = false;

    let name = $state("");
    let programm = $state("");
    let raum = $state("");

    const editContact = (contact) => {
        contactToEdit.id = contact.id;

        name = contact.name;
        programm = contact.programm;
        raum = contact.raum;

        FORM_VISIBLE.state = "edit";
    };

    const saveEntry = async () => {
        const editedContact = {
            id: contactToEdit.id,
            name: name,
            phone: phone,
            email: email,
        };

        const restClient = new RestClient();
        await restClient.updateContact(editedContact);

        await refreshTable();

        FORM_VISIBLE.state = "main";
    };

    const cancelEdit = () => {
        FORM_VISIBLE.state = "main";
    };

    const createEntry = () => {
        goto("/new/");
    };

    const tempSaveContact = (contact) => {
        FORM_VISIBLE.state = "delete";
        contactToDelete.id = contact.id;
        contactToDelete.name = contact.name;
    };

    const cancelDelete = () => {
        FORM_VISIBLE.state = "main";
    };

    const deleteEntry = () => {
        deleteContact(contactToDelete.id);

        FORM_VISIBLE.state = "main";
    };
</script>

<svelte:head>
    <title>Sabel Software</title>
    <meta name="description" content="Kontaktbuch der T4A-GBS-München" />
</svelte:head>
{#if FORM_VISIBLE.state === "main"}
    <div class="content">
        <h2>Kontakte</h2>

        <table>
            <thead>
                <tr>
                    {#if DEBUG}
                        <th>ID</th>
                    {/if}
                    <th>Name</th>
                    <th>Programm</th>
                    <th>Raum</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each entriesInTable as entry}
                    <tr class="contact-row">
                        {#if DEBUG}
                            <td>{entry.id}</td>
                        {/if}
                        <td>{entry.name}</td>
                        <td>{entry.programm}</td>
                        <td>{entry.raum}</td>
                        <td>
                            <button
                                onclick={() => {
                                    editContact(entry);
                                }}>Edit</button
                            >
                            <button
                                onclick={() => {
                                    tempSaveContact(entry);
                                }}>-</button
                            >
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>

        <button onclick={createEntry}>Neuen Programmeintrag erstellen</button>
    </div>
{:else if FORM_VISIBLE.state === "delete"}
    <ReallyDelete />
{:else}
    <div class="content">
        <h2>Kontakt bearbeiten</h2>

        <table>
            <thead>
                <tr> </tr>
            </thead>

            <tbody>
                <tr>
                    <td class="inputDescription">
                        <label for="nameInput">Name</label>
                    </td>
                    <td class="inputValue">
                        <input bind:value={name} id="nameInput" type="text" />
                    </td>
                </tr>

                <tr>
                    <td class="inputDescription">
                        <label for="phoneInput">Telefonnummer</label>
                    </td>
                    <td class="inputValue">
                        <input
                            bind:value={programm}
                            type="tel"
                            id="phoneInput"
                        />
                    </td>
                </tr>

                <tr>
                    <td class="inputDescription">
                        <label for="emailInput">E-Mailadresse</label>
                    </td>
                    <td class="inputValue">
                        <input bind:value={raum} type="text" id="emailInput" />
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="buttons">
            <button onclick={cancelEdit}>Abbrechen</button>
            <button onclick={saveEntry}>Speichern</button>
        </div>
    </div>
{/if}

<style>
    .content {
        background-color: #f8f9fa;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0.2em 0.2em 0.2em rgb(145, 143, 143);
        margin: 10px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }

    .inputDescription {
        width: 20%;
    }

    .inputValue input {
        width: 100%;
    }

    tr button {
        /*
        border-radius: 50%;
        height: 40px;
        width: 40px;*/
        margin: auto;
    }

    tr button:hover {
        background-color: #b6b1b1;
    }

    .contact-row:hover {
        background-color: rgb(233, 230, 230);
    }

    button {
        width: 100%;
        padding: 0.5em;
        border-radius: 5px;
        margin-top: 0.5em;
        display: block;
    }

    button:hover {
        background-color: lightgray;
    }

    .buttons {
        display: flex;
        gap: 0.5em;
    }
</style>
