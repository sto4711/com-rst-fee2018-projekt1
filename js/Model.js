class Model {
    constructor(callbackHandler) {
        this.LIST_ITEM_ELEMENTS = ["id", "title", "description", "importance", "completedBy", "isFinished", "created"];
        this.itemListJson = null;
        this.currentItemJson = null;
        this.restClientGET = new ARestClient(callbackHandler, "GET");
        this.restClientGET.onSuccess = (json) => { /* override */
            this.itemListJson = json.rows;
            callbackHandler.getItemList_JSON_callback(this.itemListJson);
        };
        this.restClientGET_EmptyItem = new ARestClient(callbackHandler, "GET");
        this.restClientGET_EmptyItem.onSuccess = (json) => { /* override */
            callbackHandler.getEmptyItem_JSON_callback(json);
        };
        this.restClientPUT_Item = new ARestClient(callbackHandler, "PUT");
        this.restClientPUT_Item.onSuccess = (json) => { /* override */
            callbackHandler.putItemListEntry_JSON_callback(json);
        };
        this.restClientPUT_IsFinished = new ARestClient(callbackHandler, "PUT");
        this.restClientPUT_IsFinished.onSuccess = () => { /* override */
            callbackHandler.putItemListEntryFinished_JSON_callback();
        };
        this.restClientDELETE = new ARestClient(callbackHandler, "DELETE");
        this.restClientDELETE.onSuccess = (json) => { /* override */
            callbackHandler.deleteItemListEntry_JSON_callback(json);
        };
    }

    getItem(idItem) {
        let item = null;
        for (let i = 0; i < this.itemListJson.length; i++) {
            if (this.itemListJson[i][this.LIST_ITEM_ELEMENTS[0]] === idItem) {
                item = this.itemListJson[i];
                break;
            }
        }
        return item;
    }

    getEmptyItem() {
        this.restClientGET_EmptyItem.doRequest({
            "emptyItem": "1"
        });
    }

    setCurrentItem(item) {
        this.currentItemJson = item;
    }

    updateCurrentItem(title, description, importance, completedBy) {
        this.currentItemJson[this.LIST_ITEM_ELEMENTS[1]] = title;
        this.currentItemJson[this.LIST_ITEM_ELEMENTS[2]] = description;
        this.currentItemJson[this.LIST_ITEM_ELEMENTS[3]] = importance;
        this.currentItemJson[this.LIST_ITEM_ELEMENTS[4]] = completedBy;
    }

    getItemList() {
        this.restClientGET.doRequest(null);
    }

    putItem() {
        this.restClientPUT_Item.doRequest(this.currentItemJson);
    }

    deleteItem(idItem) {
        this.restClientDELETE.doRequest({
            "id": idItem
        });
    }

    getSelectedItems(finished) {
        const result = [];
        //performance++
        for (let i = 0; i < this.itemListJson.length; i++) {
            const isFinished = this.itemListJson[i][this.LIST_ITEM_ELEMENTS[5]];
            if (Boolean(isFinished === finished) || !finished) {
                result.push(this.itemListJson[i]);
            }
        }
        return result;
    }

    isFinished(id) {
        let result = false;
        for (let i = 0; i < this.itemListJson.length; i++) {
            const item = this.itemListJson[i];
            if (item[this.LIST_ITEM_ELEMENTS[0]] === id && item[this.LIST_ITEM_ELEMENTS[5]]) {
                result = true;
                break;
            }
        }
        return result;
    }

    setIsFinished(id, isFinished) {
        for (let i = 0; i < this.itemListJson.length; i++) {
            const item = this.itemListJson[i];
            if (item[this.LIST_ITEM_ELEMENTS[0]] === id) {
                item[this.LIST_ITEM_ELEMENTS[5]] = isFinished;
                break;
            }
        }

        this.restClientPUT_IsFinished.doRequest({
            "id": id,
            "isFinished": isFinished,
        });
    }

    sortByFinished() {
        this.itemListJson.sort((a, b) => {
            const x = a[this.LIST_ITEM_ELEMENTS[4]];
            const y = b[this.LIST_ITEM_ELEMENTS[4]];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    }

    sortByCreated() {
        this.itemListJson.sort((a, b) => {
            const x = a[this.LIST_ITEM_ELEMENTS[6]];
            const y = b[this.LIST_ITEM_ELEMENTS[6]];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    }

    sortByImportance() {
        this.itemListJson=         this.itemListJson.sort((a, b) => {
            const x = a[this.LIST_ITEM_ELEMENTS[3]];
            const y = b[this.LIST_ITEM_ELEMENTS[3]];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    }


}


