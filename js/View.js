'usestrict';

class View {
    constructor(model,controller) {
        this.model = model;
        this.controller = controller;
        this.table = document.getElementById("noteTable");
    }

    initUI() {
        //demo handlebars
        try {
            let tmpHtml = document.getElementById("myTemplate").innerHTML;
            let template = Handlebars.compile(tmpHtml);
            document.getElementById("handlebarsDiv").innerHTML += template({name: "use handlebars, put vs CORS)"});
        }
        catch (e) {
            Logger.debugConsole(e.toString());
        }
        this.tableInit();
    }


    createButton(caption) {
        let button = document.createElement("BUTTON");
        button.appendChild(document.createTextNode(caption));
        return button;
    }

    tableInit() {
        let header = this.table.createTHead();
        let row = header.insertRow(0);
        this.model.TABLE_COL_NAMES.forEach(function (colName) {
            row.insertCell(-1).innerHTML = colName;
        });
    }


    tableAddRow(rowJson) {
        let row = this.table.insertRow(-1);
        for (let cellIndex = 0; cellIndex < this.model.TABLE_COL_NAMES.length; cellIndex++) {
            let colName = this.model.TABLE_COL_NAMES[cellIndex];
            row.insertCell(-1).innerHTML = eval("rowJson." + colName);
        }

        let buttonDelete  = this.createButton("delete");
        this.controller.registerDeleteEventListener(buttonDelete);
        row.insertCell(-1).appendChild(buttonDelete);

        let buttonModify = this.createButton("modify");
        this.controller.registerUpdateEventListener(buttonModify);
        row.insertCell(-1).appendChild(buttonModify);
    }

    tableDeleteAllRows() {
        let table = this.table;
        for(let i = 1  /* keep header */; i < table.rows.length;) {
            table.deleteRow(i);//poor performance
        }
    }

    tableDeleteRow(index) {
        this.table.deleteRow(index);
    }

    static table_getSelectedRowIndex(element) {
        return element.closest('tr').rowIndex;
    }


}

