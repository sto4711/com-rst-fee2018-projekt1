class Controller {
    constructor() {
        this.model = new Model(this);
        this.view = new View(this.model, this);
        this.view.initUI();
        this.registerEventListener();
        this.model.getTableJson();
    }

    registerEventListener() {
        var model = this.model;
        var view = this.view;

        document.getElementById("searchButton").onclick = function () {
            model.getTableJson();
        }

        document.getElementById("addRecordButton").onclick = function () {
            var rowJson = {
                "synced": true,
                "created": "Sun May 06 17:57:02 CEST 2018",
                "id": 2000,
                "content": "blabla 4711",
                "status": "open"
            };
            view.table_addRow(rowJson, this);
        }

        document.getElementById("clearButton").onclick = function () {
            view.table_dropAllRows();
        }
    }

    registerDeleteEventListener(element) {
        var view = this.view;
        element.onclick = function () {
            view.table_dropRow(View.table_getSelectedRowIndex(this));
        }
    }

    registerUpdateEventListener(element) {
        var view = this.view;
        element.onclick = function () {
            Logger.debugConsole("update row " + View.table_getSelectedRowIndex(this));
        }
    }

    getTableJson_callback(tableJson) {
        var view = this.view;
        view.table_dropAllRows();
        $.each(tableJson.Grid, function (index, rowJson) {
            view.table_addRow(rowJson);
        });
    }

    tableDeleteRowPressed(index) {
        this.view.table_dropRow(index);
    }


}

