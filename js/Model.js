'usestrict';


class RestCallerGET extends ARestCaller {
    /*  must be be overridden */
    getAjaxType() {
        return "GET";
    }
}

class Model {
    constructor(controller) {
        this.URL_REST_NOTE = 'http://localhost:8081/com-rst-fee2018-projekt1-rest/note';
        this.TABLE_COL_NAMES = ["id", "title", "description", "importance", "completedBy", "isFinished", "created"];
        this.controller = controller;
        this.rowsJson;
        this.restCallerGET = new RestCallerGET();
        this.restCallerGET.onSuccess = function (json) { /* override */
            Logger.debugConsole("RestCallerGET-onSuccess()");
        };
    }

    getTableRows() {
        //this.restCaller.doRestCall(dataJson);
        $.ajax({
            type: "GET",
            dataType: "json",
            url: this.URL_REST_NOTE,
            success: (json) => {
                this.rowsJson = json.rows;
                let jsonStr = JSON.stringify(json);
                localStorage.setItem("rst4711", jsonStr);
                this.controller.getTableJson_callback(json.rows);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                this.onAjaxError(jqXHR, textStatus, errorThrown, "GET");
            },
        });
    }

    getSelectedRows(finished) {
        let result = [];
        //performance++
        for (let i = 0; i < this.rowsJson.length; i++) {
            let row = this.rowsJson[i];
            if (row[this.TABLE_COL_NAMES[5]] == finished || !finished) {
                result.push(row);
            }
        }
        return result;
    }

    isFinished(id) {
        let result = false;
        for (let i = 0; i < this.rowsJson.length; i++) {
            let row = this.rowsJson[i];
            if (row[this.TABLE_COL_NAMES[0]] == id && row[this.TABLE_COL_NAMES[5]]) {
                result = true;
                break;
            }
        }
        return result;
    }

    setIsFinished(id, isFinished) {
        let row
        for (let i = 0; i < this.rowsJson.length; i++) {
            if (this.rowsJson[i][this.TABLE_COL_NAMES[0]] == id) {
                this.rowsJson[i][this.TABLE_COL_NAMES[5]] = isFinished;
                break;
            }
        }
        this.putTableRowIsFinished(id, isFinished);
    }

    sortByFinished() {
        this.rowsJson.sort((a, b) => {
            return a[this.TABLE_COL_NAMES[4]] < b[this.TABLE_COL_NAMES[4]];
        });
    }

    sortByCreated() {
        this.rowsJson.sort((a, b) => {
            return a[this.TABLE_COL_NAMES[6]] < b[this.TABLE_COL_NAMES[6]];
        });
    }

    sortByImportance() {
        this.rowsJson.sort((a, b) => {
            return a[this.TABLE_COL_NAMES[3]] < b[this.TABLE_COL_NAMES[3]];
        });
    }

    putTableRowIsFinished(id, isFinished) {
        $.ajax({
            type: "PUT",
            dataType: "json",
            url: this.URL_REST_NOTE,
            data: {
                "id": id,
                "isFinished": isFinished,
            },
            success: (json) => {
                this.controller.putTableRowIsFinishedJson_callback();
            },
            error: (jqXHR, textStatus, errorThrown) => {
                this.onAjaxError(jqXHR, textStatus, errorThrown, "PUT");
            },
        });
    }

    putTableRow(id, title, description, importance, completedBy, isFinished) {
        $.ajax({
            type: "PUT",
            dataType: "json",
            url: this.URL_REST_NOTE,
            data: {
                "id": id,
                "title": title,
                "description": description,
                "importance": importance,
                "completedBy": completedBy,
                "isFinished": isFinished,
            },
            success: (json) => {
                this.controller.putTableRowJson_callback(json);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                this.onAjaxError(jqXHR, textStatus, errorThrown, "PUT");
            },
        });
    }

    deleteTableRow(idRow) {
        $.ajax({
            type: "DELETE",
            url: this.URL_REST_NOTE,
            data: {
                "id": idRow
            },
            url: this.URL_REST_NOTE,
            success: (json) => {
                this.controller.deleteTableRowJson_callback(json);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                this.onAjaxError(jqXHR, textStatus, errorThrown, "DELETE");
            },
        });
    }

    onAjaxError(jqXHR, textStatus, errorThrown, ajaxMethod) {
        console.debug("ajax error " + textStatus);
        this.controller.view.showErrorDialog("There's an issue with the backend, please contact IT");
        /*
        throw {
            name: "AjaxException",
            message: textStatus,
            toString: function () {
                return this.name + ": " + this.message;
            }
        };
        */
    }


};

