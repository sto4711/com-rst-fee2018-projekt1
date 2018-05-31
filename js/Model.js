class Model {
    constructor(callbackHandler) {
        this.TABLE_COL_NAMES = ["id", "title", "description", "importance", "completedBy", "isFinished", "created"];
        this.callbackHandler = callbackHandler;

        this.restClientGET = new ARestClient(this.callbackHandler, "GET");
        this.restClientGET.onSuccess = (json) => { /* override */
            this.rowsJson = json.rows;
            this.callbackHandler.getTable_JSON_callback(this.rowsJson);
        };

        this.restClientPUT_Row = new ARestClient(this.callbackHandler, "PUT");
        this.restClientPUT_Row.onSuccess = (json) => { /* override */
            this.callbackHandler.putTableRow_JSON_callback(json);
        };

        this.restClientPUT_IsFinished = new ARestClient(this.callbackHandler, "PUT");
        this.restClientPUT_IsFinished.onSuccess = () => { /* override */
            this.callbackHandler.putTableRowIsFinished_JSON_callback();
        };

        this.restClientDELETE = new ARestClient(this.callbackHandler, "DELETE");
        this.restClientDELETE.onSuccess = (json) => { /* override */
            this.callbackHandler.deleteTableRow_JSON_callback(json);
        };
    }

    getTableRow(idRow) {
        let row = null;
        for (let i = 0; i < this.rowsJson.length; i++) {
            if (this.rowsJson[i][this.TABLE_COL_NAMES[0]] ===idRow) {
                row = this.rowsJson[i];
            }
        }
        return row;
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

    deleteTableRow(idRow) {
        this.restClientDELETE.doRequest({
            "id": idRow
        });
    }

    getSelectedRows(finished) {
        const result = [];
        //performance++
        for (let i = 0; i < this.rowsJson.length; i++) {
            const isFinished = this.rowsJson[i][this.TABLE_COL_NAMES[5]];
            if (Boolean(isFinished === finished) || !finished) {
                result.push(this.rowsJson[i]);
            }
        }
        return result;
    }

    isFinished(id) {
        let result = false;
        for (let i = 0; i < this.rowsJson.length; i++) {
            const row = this.rowsJson[i];
            if (row[this.TABLE_COL_NAMES[0]] === id && row[this.TABLE_COL_NAMES[5]]) {
                result = true;
                break;
            }
        }
        return result;
    }

    setIsFinished(id, isFinished) {
        for (let i = 0; i < this.rowsJson.length; i++) {
            if (this.rowsJson[i][this.TABLE_COL_NAMES[0]] === id) {
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


}


