class Controller {
    constructor() {
        this.model = new Model(this);//callbackhandler
        this.view = new View(this.model);
        this.registerEventListener();
        this.getItemList_JSON_call();
    }

    registerEventListener() {
        document.getElementById("buttonAddItem").addEventListener("click", () => {
            this.model.getEmptyItem();
        });

        document.getElementById("containerItemList").addEventListener("click", (event) => { /* bubbling */
            const action = event.target.dataset.com_rst_note_action;
            if(action != null && action==="DELETE")   {
                this.model.deleteItem(parseInt(event.target.dataset.com_rst_note_idRow));
            }
            else if(action != null &&action==="UPDATE")   {
                const item =  this.model.getItem(parseInt(event.target.dataset.com_rst_note_idRow));
                this.model.setCurrentItem(item);
                this.view.showEditDialog(item);
            }
            else if(action != null &&action==="FINISH")   {
                const idRow = parseInt(event.target.dataset.com_rst_note_idRow);
                const isFinished = this.model.isFinished(idRow);
                this.model.setIsFinished(idRow, !isFinished);
                this.view.setStyleToggleIsFinished(event.target, !isFinished);
            }
        });

        document.getElementById("buttonDialogEditCancel").addEventListener("click", (event) => {
            event.preventDefault();//prevent fire onbeforeunload
            this.view.closeEditDialog();
        });

        document.getElementById("buttonDialogErrorCancel").addEventListener("click", () => {
            this.view.closeErrorDialog();
        });

        document.getElementById("buttonChangeStyle").addEventListener("click", () => {
            this.view.toggleStyle();
            this.view.setStyle();

        });

        document.getElementById("checkboxFinished").addEventListener("click", () => {
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

        document.getElementById("dialogEdit").addEventListener("submit", (event) => {
            this.editDialogOkPressed(event);
        });
    }

    reloadItemList() {
        const checked = document.getElementById("checkboxFinished").checked;
        this.view.generateNoteItemList(this.model.getSelectedItems(checked));
    }

    getItemList_JSON_call() {
        this.model.getItemList();
    }

    getItemList_JSON_callback() {
        this.reloadItemList();
    }

    getEmptyItem_JSON_callback(item) {
        this.model.setCurrentItem(item);
        this.view.showEditDialog(item);
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
        event.preventDefault();//prevent fire onbeforeunload
        this.view.updateModel();
        this.view.closeEditDialog();
        this.model.putItem();
    }

}

