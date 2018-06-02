class Controller {
    constructor() {
        this.model = new Model(this);
        this.view = new View(this.model);
        this.registerEventListener();
        this.getItemList_JSON_call();
    }

    registerEventListener() {
        /* bubbling */
        document.getElementById("noteItemContainer").addEventListener("click", (event) => {
            const action = event.target.dataset.com_rst_note_action;
            if(action != null && action==="DELETE")   {
                this.model.deleteItem(parseInt(event.target.dataset.com_rst_note_idRow));
            }
            else if(action != null &&action==="UPDATE")   {
                this.view.showEditDialog(this.model.getItem(parseInt(event.target.dataset.com_rst_note_idRow)));
            }
            else if(action != null &&action==="FINISH")   {
                const idRow = parseInt(event.target.dataset.com_rst_note_idRow);
                const isFinished = this.model.isFinished(idRow);
                this.model.setIsFinished(idRow, !isFinished);
                this.view.setStyleToggleIsFinished(event.target, !isFinished);
            }
        });

        document.getElementById("addRecordButton").addEventListener("click", () => {
            this.view.showEditDialog(null);
        });

        document.getElementById("editDialogCancelButton").addEventListener("click", () => {
            this.view.closeEditDialog();
        });

        document.getElementById("errorDialogSubmitButton").addEventListener("click", () => {
            this.view.closeErrorDialog();
        });

        document.getElementById("changeStyleButton").addEventListener("click", () => {
            this.view.toggleStyle();
            this.view.setStyle();

        });

        document.getElementById("finishedCheckbox").addEventListener("click", () => {
            this.reloadItemList();
        });

        document.getElementById("radioByFinished").addEventListener("click", () => {
            this.model.sortByFinished();
            this.reloadItemList();
        });

        document.getElementById("radioByCreated").addEventListener("click", () => {
            this.model.sortByCreated();
            this.reloadItemList();
        });

        document.getElementById("radioByImportance").addEventListener("click", () => {
            this.model.sortByImportance();
            this.reloadItemList();
        });

        document.getElementById("editDialog").addEventListener("submit", () => {
            this.editDialogOkPressed();
        });
    }

    reloadItemList() {
        const checked = document.getElementById("finishedCheckbox").checked;
        this.view.generateNoteItemList(this.model.getSelectedItems(checked));
    }

    getItemList_JSON_call() {
        this.model.getItemList();
    }

    getItemList_JSON_callback(tableJson) {
        this.reloadItemList();
    }

    putItemListEntry_JSON_callback() {
        this.getItemList_JSON_call();
    }

    putItemListEntryFinished_JSON_callback() {
    //
    }

    deleteItemListEntry_JSON_callback() {
        this.getItemList_JSON_call();
    }

    ajaxError_callback(jqXHR, textStatus, errorThrown) {
        this.view.showErrorDialog("There's an issue with the backend. Please try again later");
        /*
        throw {
            name: "AjaxException",
            message: textStatus,
            toString: function () {
                return textStatus + " -> " + jqXHR.responseText;
            }
        };
        */
    }

    editDialogOkPressed(event) {
        this.view.closeEditDialog();
        const id = this.view.idRow;//in case of an insert this will be -1. Logic will be handled in backend
        const title = this.view.inputTitle.value;
        const description = this.view.inputDescription.value;
        const importance = this.view.inputImportance.value;
        const completedBy = this.view.inputCompletedBy.value;
        const isFinished = false;
        this.model.putItem(id, title, description, importance, completedBy, isFinished);
    }

}

