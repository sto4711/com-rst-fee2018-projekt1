'usestrict';

class View {
    constructor(model,controller) {
        this.model = model;
        this.controller = controller;
        this.table = document.getElementById("noteTable");
        this.editDialog = document.getElementById("editDialog");
        this.inputTitle = document.getElementById("inputTitle");
        this.inputDescription = document.getElementById("inputDescription");
        this.inputImportance = document.getElementById("inputImportance");
        this.inputCompletedDate = document.getElementById("inputCompletedDate");
    }

    initUI() {
        //demo handlebars
        try {
            let tmpHtml = document.getElementById("myTemplate").innerHTML;
            let template = Handlebars.compile(tmpHtml);
            document.getElementById("handlebarsDiv").innerHTML += template({name: "rst 06.2018 CAS FEE Project 1 "});
        }
        catch (e) {
            Logger.debugConsole(e.toString());
        }

        this.editDialog.addEventListener("close", function(e) {
            Logger.debugConsole("dialog closed");
        }, false);

        this.inputCompletedDate.oninvalid = function(event) {
            event.target.setCustomValidity('blabla');
        }


    }


    createButton(caption) {
        let button = document.createElement("BUTTON");
        button.appendChild(document.createTextNode(caption));
        return button;
    }

    tableAddHeader() {
        let header = this.table.createTHead();
        let row = header.insertRow(0);
        this.model.TABLE_COL_NAMES.forEach(function (colName) {
            row.insertCell(-1).innerHTML = colName;
        });
    }

    createNoteItem(rowJson) {
        let item = document.createElement("TABLE");
        let buttonDelete  = this.createButton("-");
        let buttonModify = this.createButton("m");
        let row = item.insertRow(-1);
        let buttonDiv = document.createElement("DIV");

        this.controller.registerDeleteEventListener(buttonDelete);
        this.controller.registerUpdateEventListener(buttonModify);
        buttonDelete.className  = 'buttonImage';
        buttonModify.className  = 'buttonImage';
        item.className  = 'tableItem';
        row.insertCell(-1).innerHTML = "wann";
        row.insertCell(-1).innerHTML = "note title";
        row.insertCell(-1).innerHTML = "importance";
        row = item.insertRow(-1);
        row.insertCell(-1).innerHTML = "finished";
        row.insertCell(-1).innerHTML = "liste";
        buttonDiv.appendChild(buttonDelete);
        buttonDiv.appendChild(buttonModify);
        row.insertCell(-1).appendChild(buttonDiv);
        return item;
    }

    tableAddRow(rowJson) {
        let row = this.table.insertRow(-1);
        row.insertCell(-1).appendChild(this.createNoteItem());
    }

    tableDeleteAllRows() {
        for(let i = 0; i < this.table.rows.length;) {
            this.table.deleteRow(i);//poor performance
        }
    }

    tableDeleteRow(index) {
        this.table.deleteRow(index);
    }

    showEditDialog(index) {
        this.editDialog.showModal();
    }

    closeEditDialog(index) {
        this.editDialog.close();
    }

    static tableGetSelectedRowIndex(element) {
        return element.closest('tr').rowIndex;
    }






}

