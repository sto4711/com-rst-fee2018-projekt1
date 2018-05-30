'usestrict';

class View {
    constructor(model, controller) {
        this.LOCAL_STORAGE_STYLE = "com.rst.note.style";
        this.model = model;
        this.controller = controller;
        this.table = document.getElementById("noteTable");
        this.editDialog = document.getElementById("editDialog");
        this.errorDialog = document.getElementById("errorDialog");
        this.errorDialogMessage = document.getElementById("errorDialogMessage");
        this.inputTitle = document.getElementById("inputTitle");
        this.inputDescription = document.getElementById("inputDescription");
        this.inputImportance = document.getElementById("inputImportance");
        this.inputCompletedBy = document.getElementById("inputCompletedBy");
        this.setStyle();
    }

    createNoteItem(rowJson) {
        const idRow = rowJson[this.model.TABLE_COL_NAMES[0]];
        let item = document.createElement("TABLE");
        let buttonDelete = document.createElement("BUTTON");
        let buttonModify = document.createElement("BUTTON");
        let buttonToggleisFinished = document.createElement("BUTTON");
        let isFinished = rowJson[this.model.TABLE_COL_NAMES[5]];
        let buttonDiv = document.createElement("DIV");
        let importanceDiv = document.createElement("DIV");
        let importance = parseInt(rowJson[this.model.TABLE_COL_NAMES[3]]);
        let title = document.createElement("H2");
        let row = item.insertRow(-1);

        for (let i = 0; i < importance; i++) {
            let flash = document.createElement("I");
            flash.className = 'fa fa-flash';
            importanceDiv.appendChild(flash);
        }

        this.controller.addDeleteEventListener(buttonDelete);
        this.controller.addUpdateEventListener(buttonModify);
        item.className = 'tableItem';
        row.insertCell(-1).innerHTML = rowJson[this.model.TABLE_COL_NAMES[4]];//completedBy
        title.innerHTML = rowJson[this.model.TABLE_COL_NAMES[1]];
        row.insertCell(-1).appendChild(title);
        row.insertCell(-1).appendChild(importanceDiv);
        row = item.insertRow(-1);
        row.insertCell(-1).innerHTML = "";
        row.insertCell(-1).innerHTML = rowJson[this.model.TABLE_COL_NAMES[2]];//description
        buttonToggleisFinished.idRow = idRow;
        this.controller.addToggleIsFinishedEventListener(buttonToggleisFinished);
        this.setStyleToggleIsFinished(buttonToggleisFinished, isFinished);
        buttonToggleisFinished.className = "fa fa-check-square-o";
        buttonDelete.className = "fa fa-calendar-minus-o";
        buttonModify.className = "fa fa-edit";
        buttonDelete.idRow = idRow;
        buttonModify.idRow = idRow;
        buttonDiv.appendChild(buttonDelete);
        buttonDiv.appendChild(buttonModify);
        buttonDiv.appendChild(buttonToggleisFinished);
        row.insertCell(-1).appendChild(buttonDiv);
        return item;
    }

    addTableRow(rowJson) {
        let row = this.table.insertRow(-1);
        row.insertCell(-1).appendChild(this.createNoteItem(rowJson));
    }

    deleteAllTableRows() {
        for (let i = 0; i < this.table.rows.length;) {
            this.table.deleteRow(i);//poor performance
        }
    }

    deleteTableRow(index) {
        Logger.debugConsole("index " + index);
        this.table.deleteRow(index);
    }

    showEditDialog() {
        try {
            this.editDialog.showModal();
        }catch (e) {
            this.editDialog.open();
        }
    }

    showErrorDialog(message) {
        this.errorDialogMessage.innerHTML = message;
        try {
            this.errorDialog.showModal();
        }catch (e) {
            this.errorDialog.open();
        }
    }


    closeEditDialog() {
        this.editDialog.close();
    }

    closeErrorDialog() {
        this.errorDialog.close();
    }

    setStyle() {
        let root = document.querySelector(':root');
        let baseColorStyle1 = window.getComputedStyle(root).getPropertyValue('--baseColorStyle1');
        let baseColorStyle2 = window.getComputedStyle(root).getPropertyValue('--baseColorStyle2');
        let currentStyle = (localStorage.getItem(this.LOCAL_STORAGE_STYLE)==null? "style1": localStorage.getItem(this.LOCAL_STORAGE_STYLE));
        root.style.setProperty("--baseColor", (currentStyle == "style1" ? baseColorStyle1 : baseColorStyle2));
    }

    toggleStyle() {
        let currentStyle = localStorage.getItem(this.LOCAL_STORAGE_STYLE);
        localStorage.setItem(this.LOCAL_STORAGE_STYLE,  (currentStyle == "style1" ? "style2" : "style1"));
    }

    setStyleToggleIsFinished(togglebutton, isFinished) {
        if(isFinished)    {
            togglebutton.style.color = "green";
        }else   {
            togglebutton.style.color = "";
        }
    }

}
