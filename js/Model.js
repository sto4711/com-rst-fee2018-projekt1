class Model {
    constructor(callbackHandler) {
        this.LIST_ITEM_ELEMENTS = ["id", "title", "description", "importance", "completedBy", "isFinished", "created"];
        this.callbackHandler = callbackHandler;

        this.restClientGET = new ARestClient(this.callbackHandler, "GET");
        this.restClientGET.onSuccess = (json) => { /* override */
            this.rowsJson = json.rows;
            this.callbackHandler.getItemList_JSON_callback(this.rowsJson);
        };

        this.restClientPUT_Row = new ARestClient(this.callbackHandler, "PUT");
        this.restClientPUT_Row.onSuccess = (json) => { /* override */
            this.callbackHandler.putItemListEntry_JSON_callback(json);
        };

        this.restClientPUT_IsFinished = new ARestClient(this.callbackHandler, "PUT");
        this.restClientPUT_IsFinished.onSuccess = () => { /* override */
            this.callbackHandler.putItemListEntryFinished_JSON_callback();
        };

        this.restClientDELETE = new ARestClient(this.callbackHandler, "DELETE");
        this.restClientDELETE.onSuccess = (json) => { /* override */
            this.callbackHandler.deleteItemListEntry_JSON_callback(json);
        };
    }

    getItem(idRow) {
        let row = null;
        for (let i = 0; i < this.rowsJson.length; i++) {
            if (this.rowsJson[i][this.LIST_ITEM_ELEMENTS[0]] === idRow) {
                row = this.rowsJson[i];
                break;
            }
        }
        return row;
    }

    getItemList() {
        this.restClientGET.doRequest(null);
    }

    putItem(id, title, description, importance, completedBy, isFinished) {
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

    deleteItem(idRow) {
        this.restClientDELETE.doRequest({
            "id": idRow
        });
    }

    getSelectedItems(finished) {
        const result = [];
        //performance++
        for (let i = 0; i < this.rowsJson.length; i++) {
            const isFinished = this.rowsJson[i][this.LIST_ITEM_ELEMENTS[5]];
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
            if (row[this.LIST_ITEM_ELEMENTS[0]] === id && row[this.LIST_ITEM_ELEMENTS[5]]) {
                result = true;
                break;
            }
        }
        return result;
    }

    setIsFinished(id, isFinished) {
        for (let i = 0; i < this.rowsJson.length; i++) {
            if (this.rowsJson[i][this.LIST_ITEM_ELEMENTS[0]] === id) {
                this.rowsJson[i][this.LIST_ITEM_ELEMENTS[5]] = isFinished;
                break;
            }
        }

        this.restClientPUT_IsFinished.doRequest({
            "id": id,
            "isFinished": isFinished,
        });
    }

    sortByFinished() {
        this.rowsJson.sort((a, b) => {
            return a[this.LIST_ITEM_ELEMENTS[4]] < b[this.LIST_ITEM_ELEMENTS[4]];
        });
    }

    sortByCreated() {
        this.rowsJson.sort((a, b) => {
            return a[this.LIST_ITEM_ELEMENTS[6]] < b[this.LIST_ITEM_ELEMENTS[6]];
        });
    }

    sortByImportance() {
        this.rowsJson.sort((a, b) => {
            return a[this.LIST_ITEM_ELEMENTS[3]] < b[this.LIST_ITEM_ELEMENTS[3]];
        });
    }


}


