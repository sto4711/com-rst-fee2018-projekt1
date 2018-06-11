class Controller {
    constructor() {
        this.model = new Model(this);//callbackhandler
        this.view = new View(this.model);
        this.radioByFinished = $('#radioByFinished')[0];
        this.radioByCreated = $('#radioByCreated')[0];
        this.radioByImportance = $('#radioByImportance')[0];
        this.checkboxFilterFinished = $('#checkboxFilterFinished')[0];
        this.registerEventListener();
        this.getItemList_JSON_call();
    }

    registerEventListener() {
        document.onbeforeunload = function () {
            return 'Are you sure?';
        };

        $('#buttonAddItem')[0].addEventListener("click", () => {
            this.model.getEmptyItem();
        });

        $('#containerItemList')[0].addEventListener("click", (event) => { /* bubbling */
            const action = event.target.dataset.com_rst_note_action;
            if (action != null && action === "DELETE") {
                this.model.deleteItem(parseInt(event.target.dataset.com_rst_note_iditem));
            }
            else if (action != null && action === "UPDATE") {
                const item = this.model.getItem(parseInt(event.target.dataset.com_rst_note_iditem));
                this.model.setCurrentItem(item);
                this.view.showEditDialog(item);
            }
            else if (action != null && action === "FINISH") {
                const idRow = parseInt(event.target.dataset.com_rst_note_iditem);
                const isFinished = this.model.isFinished(idRow);
                this.model.setIsFinished(idRow, !isFinished);
                this.model.setIsFinished(idRow, !isFinished);
            }
        });

        $('#buttonDialogEditCancel')[0].addEventListener("click", (event) => {
            event.preventDefault();//prevent fire onbeforeunload
            this.view.closeEditDialog();
        });

        $('#buttonDialogErrorCancel')[0].addEventListener("click", () => {
            this.view.closeErrorDialog();
        });

        $('#buttonChangeStyle')[0].addEventListener("click", () => {
            this.view.toggleStyle();
            this.view.setStyle();
        });

        this.checkboxFilterFinished.addEventListener("click", () => {
            this.reloadItemList();
        });

        this.radioByFinished.addEventListener("click", () => {
            this.reloadItemList();
        });

        this.radioByCreated.addEventListener("click", () => {
            this.reloadItemList();
        });

        this.radioByImportance.addEventListener("click", () => {
            this.reloadItemList();
        });

        $('#dialogEdit')[0].addEventListener("submit", (event) => {
            this.editDialogOkPressed(event);
        });
    }

    reloadItemList() {
        if (this.radioByFinished.checked) {
            this.model.sortByFinished();
        }
        else if (this.radioByCreated.checked) {
            this.model.sortByCreated();
        }
        else if (this.radioByImportance.checked) {
            this.model.sortByImportance();
        }
        this.view.generateNoteItemList(this.model.getSelectedItems(this.checkboxFilterFinished.checked));
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
        this.view.closeEditDialog();
        this.getItemList_JSON_call();
    }

    putItemListEntryFinished_JSON_callback() {
        this.reloadItemList();
    }

    deleteItemListEntry_JSON_callback() {
        this.getItemList_JSON_call();
    }

    ajaxError_callback(jqXHR, textStatus, errorThrown) {
        this.view.showErrorDialog("There's an issue with the backend: " + errorThrown.name + " -> " + errorThrown.message);
        // throw {
        //     name: errorThrown.name,
        //     message: errorThrown.message,
        //     toString: function () {
        //         return errorThrown.name + " -> " + errorThrown.message;
        //     }
        // };
    }

    editDialogOkPressed(event) {
        event.preventDefault();//prevent fire onbeforeunload
        this.view.updateModel();
        this.model.putItem();
    }

}

