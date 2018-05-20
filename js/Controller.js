'usestrict';

class Controller {
    constructor() {
        Logger.debugConsole("constructor");
        this.model = new Model(this);
        this.view = new View(this.model, this);
        this.init();
    }

    init() {
        Logger.debugConsole("init");
        this.view.initUI();
        this.registerEventListener();
        this.getTableJson_call();
    }


    registerEventListener() {
        document.getElementById("searchButton").onclick =  () => {
            this.model.getTableRows();
        }

        document.getElementById("addRecordButton").onclick = () =>{
            this.view.showEditDialog();
        }

        document.getElementById("clearButton").onclick = () => {
            this.view.tableDeleteAllRows();
        }
    }

    registerDeleteEventListener(element) {
        element.onclick = () => {
            this.model.deleteTableRow(View.tableGetSelectedRowIndex(element));
        }
    }

    registerUpdateEventListener(element) {
        element.onclick = () => {
            Logger.debugConsole("update row " + View.tableGetSelectedRowIndex(this));
        }
    }

    getTableJson_call(tableJson) {
        this.model.getTableRows();
    }

    getTableJson_callback(tableJson) {
        this.view.tableDeleteAllRows();
        $.each(tableJson,  (index, rowJson) => {
            this.view.tableAddRow(rowJson);
        });
    }

    putTableRowJson_callback() {
        this.getTableJson_call();
    }

    deleteTableRowJson_callback() {
        this.getTableJson_call();
    }

    editDialogOkPressed() {
        Logger.debugConsole("hallo");

    }

}

let myController;
