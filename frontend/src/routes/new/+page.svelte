<script>
    import { goto } from "$app/navigation";
    import { refreshTable } from "$lib/contacts.svelte";
    import { RestClient } from "$lib/restclient";
    let name = $state("");
    let programm = $state("");
    let raum = $state("");

    const saveEntry = async () => {
        const newContactWithoutID = {
            name: name,
            programm: programm,
            raum: raum,
        };
        const restClient = new RestClient();
        await restClient.createContact(newContactWithoutID);

        //Liste aktualisieren
        await refreshTable();

        goto("/");
    };

    const cancel = () => {
        goto("/");
    };
</script>

<svelte:head>
    <title>T3A-Kontakte | New</title>
</svelte:head>
<div class="content">
    <h2>Neuen Kontakt erstellen</h2>
    <div class="content-flex">
        <div class="input">
            <label for="nameInput">Name</label>
            <input bind:value={name} id="nameInput" type="text" />
        </div>
        <div class="input">
            <label for="phoneInput">Programm</label>
            <input bind:value={programm} type="tel" id="text" />
        </div>

        <div class="input">
            <label for="emailInput">Raum</label>
            <input bind:value={raum} type="email" id="text" />
        </div>
    </div>

    <div class="buttons">
        <button onclick={cancel}>Abbrechen</button>
        <button onclick={saveEntry}>Speichern</button>
    </div>
</div>

<style>
    .content {
        background-color: #f8f9fa;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0.2em 0.2em 0.2em rgb(145, 143, 143);
        margin: 10px;
    }
    @media (min-width: 40em) {
        .content-flex {
            display: flex;
            flex-wrap: wrap;
        }

        .input {
            width: 50%;
        }
    }

    .input {
        padding: 0.5em;
    }

    .input input {
        box-sizing: border-box;
        width: 100%;
        padding: 0.3em;
        text-align: left;
    }

    .input label {
        display: block;
        padding: 0.3em;
    }

    .buttons {
        display: flex;
        gap: 0.5em;
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
</style>
