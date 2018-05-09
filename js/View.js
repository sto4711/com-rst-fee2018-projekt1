class View {
    constructor(model,controller) {
        this.model = model;
        this.controller = controller;
        this.table = document.getElementById("noteTable");
    }

    initUI() {
        this.demoHandlebars();
        this.table_init();
    }

    demoHandlebars() {
        try {
            var tmpHtml = document.getElementById("myTemplate").innerHTML;
            var template = Handlebars.compile(tmpHtml);
            var data = template({name: "Handlebars"});
            document.getElementById("handlebarsDiv").innerHTML += data;
            Logger.debugConsole("handlebars DONE");
        }
        catch (e) {
            Logger.debugConsole(e.toString());
        }
    }

    table_init() {
        var header = this.table.createTHead();
        var row = header.insertRow(0);
        this.model.tableColNames.forEach(function (colName) {
            row.insertCell(-1).innerHTML = colName;
        });
    }

    createButton(caption) {
        var button = document.createElement("BUTTON");
        button.appendChild(document.createTextNode(caption));
        return button;
    }

    table_addRow(rowJson) {
        var row = this.table.insertRow(-1);
        for (var cellIndex = 0; cellIndex < this.model.tableColNames.length; cellIndex++) {
            var colName = this.model.tableColNames[cellIndex];
            var cellValue = eval("rowJson." + colName);
            row.insertCell(-1).innerHTML = cellValue;
        }

        var buttonDelete  = this.createButton("delete");
        this.controller.registerDeleteEventListener(buttonDelete);
        row.insertCell(-1).appendChild(buttonDelete);

        var buttonModify = this.createButton("modify");
        this.controller.registerUpdateEventListener(buttonModify);
        row.insertCell(-1).appendChild(buttonModify);
    }

    table_dropAllRows() {
        var table = this.table;
        for(var i = 1  /* keep header */; i < table.rows.length;) {
            table.deleteRow(i);
        }
    }

    table_dropRow(index) {
        this.table.deleteRow(index);
    }

    static table_getSelectedRowIndex(element) {
        return element.closest('tr').rowIndex;
    }


}

