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
        this.TODAY = new Date();
        this.initUI();
        this.setStyle();
    }

    initUI()    {
        document.getElementById("inputCompletedBy").valueAsDate = new Date();
    }

    createNoteItem(rowJson) {
        const idRow = rowJson[this.model.TABLE_COL_NAMES[0]];
        const item = document.createElement("TABLE");
        const buttonDelete = document.createElement("BUTTON");
        const buttonModify = document.createElement("BUTTON");
        const buttonToggleisFinished = document.createElement("BUTTON");
        const isFinished = rowJson[this.model.TABLE_COL_NAMES[5]];
        const buttonDiv = document.createElement("DIV");
        const importanceDiv = document.createElement("DIV");
        const importance = parseInt(rowJson[this.model.TABLE_COL_NAMES[3]]);
        const title = document.createElement("H2");
        let row = item.insertRow(-1);

        for (let i = 0; i < importance; i++) {
            const flash = document.createElement("I");
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
        const row = this.table.insertRow(-1);
        row.insertCell(-1).appendChild(this.createNoteItem(rowJson));
    }

    deleteAllTableRows() {
        for (let i = 0; i < this.table.rows.length;) {
            this.table.deleteRow(i);//poor performance
        }
    }

    showEditDialog(isInsertUpdate, rowJSON) {
        if(isInsertUpdate)  {// Insert
            /* don't clean the input values */
        }else   { // Update, set the values
            this.inputTitle.value = rowJSON[this.model.TABLE_COL_NAMES[1]];
            this.inputDescription.value = rowJSON[this.model.TABLE_COL_NAMES[2]];
            this.inputImportance.value = rowJSON[this.model.TABLE_COL_NAMES[3]];
            this.inputCompletedBy.value = rowJSON[this.model.TABLE_COL_NAMES[4]];

//            this.TABLE_COL_NAMES = ["id", "title", "description", "importance", "completedBy", "isFinished", "created"];


            // this.inputDescription = document.getElementById("inputDescription");
            // this.inputImportance = document.getElementById("inputImportance");
            // this.inputCompletedBy = document.getElementById("inputCompletedBy");






        }


        try {
            this.editDialog.showModal();//works only in Chrome
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
        const root = document.querySelector(':root');
        const baseColorStyle1 = window.getComputedStyle(root).getPropertyValue('--baseColorStyle1');
        const baseColorStyle2 = window.getComputedStyle(root).getPropertyValue('--baseColorStyle2');
        const currentStyle = (localStorage.getItem(this.LOCAL_STORAGE_STYLE)==null? "style1": localStorage.getItem(this.LOCAL_STORAGE_STYLE));
        root.style.setProperty("--baseColor", (currentStyle === "style1" ? baseColorStyle1 : baseColorStyle2));
    }

    toggleStyle() {
        const currentStyle = localStorage.getItem(this.LOCAL_STORAGE_STYLE);
        localStorage.setItem(this.LOCAL_STORAGE_STYLE,  (currentStyle === "style1" ? "style2" : "style1"));
    }

    setStyleToggleIsFinished(togglebutton, isFinished) {
        if(isFinished)    {
            togglebutton.style.color = "green";
        }else   {
            togglebutton.style.color = "";
        }
    }

}
