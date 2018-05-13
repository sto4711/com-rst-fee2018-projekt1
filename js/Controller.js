'usestrict';

class Controller {
    constructor() {
        this.model = new Model(this);
        this.view = new View(this.model, this);
        this.view.initUI();
        this.registerEventListener();
        this.getTableJson_call();
    }

    registerEventListener() {
        let model = this.model;
        let view = this.view;
        //Logger.debugConsole(typeof (this));

        document.getElementById("searchButton").onclick = function () {
            model.getTableRows();
        }

        document.getElementById("addRecordButton").onclick = function () {
            model.putTableRow();
        }

        document.getElementById("clearButton").onclick = function () {
            view.tableDeleteAllRows();
        }
    }

    registerDeleteEventListener(element) {
        let model = this.model;
        element.onclick = function () {
            model.deleteTableRow(View.tableGetSelectedRowIndex(this));
        }
    }

    registerUpdateEventListener(element) {
        let view = this.view;
        element.onclick = function () {
            Logger.debugConsole("update row " + View.tableGetSelectedRowIndex(this));
        }
    }


    getTableJson_call(tableJson) {
        this.model.getTableRows();
    }

    getTableJson_callback(tableJson) {
        let view = this.view;
        view.tableDeleteAllRows();
        $.each(tableJson, function (index, rowJson) {
            view.tableAddRow(rowJson);
        });
    }

    putTableRowJson_callback(tableJson) {
        this.getTableJson_call();
    }

    deleteTableRowJson_callback(tableJson) {
        this.getTableJson_call();
    }


}

