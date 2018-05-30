'usestrict';

class Controller {
    constructor() {
        this.model = new Model(this);
        this.view = new View(this.model, this);
        this.registerEventListener();
        this.getTableJson_call();
    }

    registerEventListener() {
        document.getElementById("addRecordButton").addEventListener('click', (event) => {
            this.view.showEditDialog();
        });

        document.getElementById("editDialogCancelButton").addEventListener('click', (event) => {
            this.view.closeEditDialog();
        });

        document.getElementById("errorDialogSubmitButton").addEventListener('click', (event) => {
            this.view.closeErrorDialog();
        });

        document.getElementById("changeStyleButton").addEventListener('click', (event) => {
            this.view.toggleStyle();
            this.view.setStyle();

        });

        document.getElementById("finishedCheckbox").addEventListener('click', (event) => {
            this.reloadTable();
        });

        document.getElementById("radioByFinished").addEventListener('click', (event) => {
            this.model.sortByFinished();
            this.reloadTable();
        });

        document.getElementById("radioByCreated").addEventListener('click', (event) => {
            this.model.sortByCreated();
            this.reloadTable();
        });

        document.getElementById("radioByImportance").addEventListener('click', (event) => {
            this.model.sortByImportance();
            this.reloadTable();
        });
    }

    reloadTable() {
        let checked = document.getElementById("finishedCheckbox").checked;
        this.view.deleteAllTableRows();
        $.each(this.model.getSelectedRows(checked), (index, rowJson) => {
            this.view.addTableRow(rowJson);
        });
    }

    addDeleteEventListener(element) {
        element.addEventListener("click", (event) => {
            //element.removeEventListener("click"); will be handled by bubbling
//            this.model.deleteTableRow(element.idRow);
            this.model.deleteTableRow(event.target.idRow);
        });
    }

    addUpdateEventListener(element) {
        element.addEventListener("click", (event) => {
            Logger.debugConsole("update row " + element.idRow);
        });
    }

    addToggleIsFinishedEventListener(element) {
        element.addEventListener("click", (event) => {
            let isFinished = this.model.isFinished(element.idRow);
            this.model.setIsFinished(element.idRow, !isFinished);
            this.view.setStyleToggleIsFinished(element, !isFinished);
        });
    }

    getTableJson_call(tableJson) {
        this.model.getTableRows();
    }

    getTableJson_callback(tableJson) {
        this.view.deleteAllTableRows();
        $.each(tableJson, (index, rowJson) => {
            this.view.addTableRow(rowJson);
        });
    }

    putTableRowJson_callback() {
        this.getTableJson_call();
    }

    putTableRowIsFinishedJson_callback() {

    }

    deleteTableRowJson_callback() {
        this.getTableJson_call();
    }

    editDialogOkPressed() {
        this.view.closeEditDialog();
        let id = -1;
        let title = this.view.inputTitle.value;
        let description = this.view.inputDescription.value;
        let importance = this.view.inputImportance.value;
        let completedBy = this.view.inputCompletedBy.value;
        let isFinished = false;
        this.model.putTableRow(id, title, description, importance, completedBy, isFinished);
    }

}

