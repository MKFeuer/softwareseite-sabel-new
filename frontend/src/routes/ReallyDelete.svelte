<script>
    import { contactToDelete, FORM_VISIBLE, refreshTable } from "$lib/entries.svelte"
    import { RestClient } from "$lib/restclient";
    

    const cancelDelete = () => {
        FORM_VISIBLE.state = "main";

    };

    const deleteEntry = async () => {
        const restClient = new RestClient();
        await restClient.deleteContact(contactToDelete.id);
        
        await refreshTable();

        FORM_VISIBLE.state = "main";
    };
</script>

<div class="content">
    <h2>Kontakt Löschen</h2>
    <p>Wollen sie {contactToDelete.name} wirklich löschen?</p>

    <div class="buttons">
        <button onclick={cancelDelete}>Abbrechen</button>
        <button onclick={deleteEntry}>Löschen</button>
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

    button {
        width: 100%;
        padding: 0.5em;
        border-radius: 5px;
        margin-top: 0.5em;
        display: block;
    }

    .buttons {
        display: flex;
        gap: 0.5em;
    }
</style>
