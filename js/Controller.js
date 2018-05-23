'usestrict';

class Controller {
    constructor() {
        this.model = new Model(this);
        this.view = new View(this.model, this);
        this.registerEventListener();
        this.getTableJson_call();
    }

    registerEventListener() {
        document.getElementById("addRecordButton").onclick = () =>{
            this.view.showEditDialog();
        }
        document.getElementById("editDialogCancelButton").onclick = () =>{
            this.view.closeEditDialog();
        }

        document.getElementById("errorDialogSubmitButton").onclick = () =>{
            this.view.closeErrorDialog();
        }


        document.getElementById("changeStyleButton").onclick = () =>{
            this.view.switchStyle();
        }

        document.getElementById("finishedCheckbox").onclick = () =>{
            this.reloadTable();
        }

        document.getElementById("radioByFinished").onclick = () =>{
            this.model.sortByFinished();
            this.reloadTable();
        }

        document.getElementById("radioByCreated").onclick = () =>{
            this.model.sortByCreated();
            this.reloadTable();
        }

        document.getElementById("radioByImportance").onclick = () =>{
            this.model.sortByImportance();
            this.reloadTable();
        }
    }

    reloadTable()   {
        let checked = document.getElementById("finishedCheckbox").checked;
        this.view.deleteAllTableRows();
        $.each(this.model.getSelectedRows(checked),  (index, rowJson) => {
            this.view.addTableRow(rowJson);
        });
    }

    addDeleteEventListener(element) {
        element.onclick = () => {
            this.model.deleteTableRow(element.idRow);
        }
    }

    addUpdateEventListener(element) {
        element.onclick = () => {
            Logger.debugConsole("update row " + element.idRow);
        }
    }

    addToggleIsFinishedEventListener(element) {
        element.onclick = () => {
            let isFinished = this.model.isFinished(element.idRow);
            this.model.setIsFinished(element.idRow,!isFinished);
            this.view.setStyleToggleIsFinished(element, !isFinished);
        }
    }
    getTableJson_call(tableJson) {
        this.model.getTableRows();
    }

    getTableJson_callback(tableJson) {
        this.view.deleteAllTableRows();
        $.each(tableJson,  (index, rowJson) => {
            this.view.addTableRow(rowJson);
        });
    }

    putTableRowJson_callback() {
        this.getTableJson_call();
    }

    putTableRowIsFinishedJson_callback()  {

    }

    deleteTableRowJson_callback() {
        this.getTableJson_call();
    }

    editDialogOkPressed() {
        this.view.closeEditDialog();
        let id = -1;
        let title =  this.view.inputTitle.value;
        let description = this.view.inputDescription.value;
        let importance = this.view.inputImportance.value;
        let completedBy = this.view.inputCompletedBy.value;
        let isFinished = false;
        this.model.putTableRow(id, title, description, importance, completedBy, isFinished);
    }

}

let myController;
