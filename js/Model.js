'usestrict';


class Model {
    constructor(controller) {
        this.URL_REST_NOTE = 'http://localhost:8081/com-rst-fee2018-projekt1-rest/note';
        this.TABLE_COL_NAMES = ["id", "title", "description", "importance", "completedBy", "isFinished", "created"];
        this.controller = controller;
        this.rowsJson;
        this.restClientGET = new ARestClient("GET");
        this.restClientGET.onSuccess = (json) => { /* inner class, override */
            this.rowsJson = json.rows;
            this.controller.getTableJson_callback(this.rowsJson);
        };
        this.restClientPUT_Row = new ARestClient("PUT");
        this.restClientPUT_Row.onSuccess = (json) => { /* inner class, override */
            this.controller.putTableRowJson_callback(json);
        };
        this.restClientPUT_IsFinished = new ARestClient("PUT");
        this.restClientPUT_IsFinished.onSuccess = (json) => { /* inner class, override */
            this.controller.putTableRowIsFinishedJson_callback();
        };
    }

    getTableRows() {
        this.restClientGET.doRequest(null);
    }

    putTableRowIsFinished(id, isFinished) {
        this.restClientPUT_IsFinished.doRequest({
            "id": id,
            "isFinished": isFinished,
        });
    }

    putTableRow(id, title, description, importance, completedBy, isFinished) {
        this.restClientPUT_Row.doRequest({
                "id": id,
                "title": title,
                "description": description,
                "importance": importance,
                "completedBy": completedBy,
                "isFinished": isFinished,
            }
        );
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


}
;

