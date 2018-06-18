class Controller {
    constructor() {
        this.model = new Model(this);
        this.view = new View(this.model, this);
        this.registerEventListener();
        this.getTable_JSON_call();
    }

    registerOnbeforeunload() {
        window.onbeforeunload = function () {
            return "Are you sure?";
        };
    }

    registerEventListener() {
        this.registerOnbeforeunload();

        document.getElementById("addRecordButton").addEventListener("click", () => {
            window.onbeforeunload = null;
            this.view.showEditDialog(true, null);
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
            this.reloadTable();
        });

        document.getElementById("radioByFinished").addEventListener("click", () => {
            this.model.sortByFinished();
            this.reloadTable();
        });

        document.getElementById("radioByCreated").addEventListener("click", () => {
            this.model.sortByCreated();
            this.reloadTable();
        });

        document.getElementById("radioByImportance").addEventListener("click", () => {
            this.model.sortByImportance();
            this.reloadTable();
        });

        document.getElementById("editDialog").addEventListener("submit", () => {
            this.editDialogOkPressed();
        });
    }

    reloadTable() {
        const checked = document.getElementById("finishedCheckbox").checked;
        this.view.deleteAllTableRows();
        $.each(this.model.getSelectedRows(checked), (index, rowJson) => {
            this.view.addTableRow(rowJson);
        });
    }

    addDeleteEventListener(element) {
        element.addEventListener("click", (event) => {
            //element.removeEventListener("click"); will be handled by bubbling automatically
            this.model.deleteTableRow(event.target.idRow);
        });
    }

    addUpdateEventListener(element) {
        element.addEventListener("click", (event) => {
            this.view.showEditDialog(false, this.model.getTableRow(event.target.idRow));
        });
    }

    addToggleIsFinishedEventListener(element) {
        element.addEventListener("click", () => {
            const isFinished = this.model.isFinished(element.idRow);
            this.model.setIsFinished(element.idRow, !isFinished);
            this.view.setStyleToggleIsFinished(element, !isFinished);
        });
    }

    getTable_JSON_call() {
        this.model.getTableRows();
    }

    getTable_JSON_callback(tableJson) {
        this.view.deleteAllTableRows();
        $.each(tableJson, (index, rowJson) => {
            this.view.addTableRow(rowJson);
        });
    }

    putTableRow_JSON_callback() {
        this.getTable_JSON_call();
    }

    putTableRowIsFinished_JSON_callback() {
    //
    }

    deleteTableRow_JSON_callback() {
        this.getTable_JSON_call();
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

    editDialogOkPressed() {
        this.view.closeEditDialog();
        this.registerOnbeforeunload(); /* hack */
        const id = -1;
        const title = this.view.inputTitle.value;
        const description = this.view.inputDescription.value;
        const importance = this.view.inputImportance.value;
        const completedBy = this.view.inputCompletedBy.value;
        const isFinished = false;
        this.model.putTableRow(id, title, description, importance, completedBy, isFinished);
    }

}

