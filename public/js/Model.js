class Model {
    constructor(callbackHandler) {
        this.LIST_ITEM_ELEMENTS = ["_id", "title", "description", "importance", "completedBy", "isFinished", "created"];
        this.itemListJson = null;
        this.currentItemJson = null;
        this.restClientGET_AllItems = new ARestClient(callbackHandler, "GET", "");
        this.restClientGET_AllItems.onSuccess = (json) => { /* override */
            this.itemListJson = json;
            callbackHandler.getItemList_JSON_callback(this.itemListJson);
        };
        this.restClientGET_EmptyItem = new ARestClient(callbackHandler, "GET", "");
        this.restClientGET_EmptyItem.onSuccess = (json) => { /* override */
            callbackHandler.getEmptyItem_JSON_callback(json);
        };

        this.restClientPOST_Item = new ARestClient(callbackHandler, "POST", ""); //Insert
        this.restClientPOST_Item.onSuccess = (json) => { /* override */
            callbackHandler.postItemListEntry_JSON_callback(json);
        };

        this.restClientPUT_Item = new ARestClient(callbackHandler, "PUT", ""); //Merge, update all fields
        this.restClientPUT_Item.onSuccess = (json) => { /* override */
            callbackHandler.putItemListEntry_JSON_callback(json);
        };


        this.restClientPATCH_Item_IsFinished = new ARestClient(callbackHandler, "PATCH", "/isfinished"); //update isfinished only
        this.restClientPATCH_Item_IsFinished.onSuccess = () => { /* override */
            callbackHandler.patchItemListEntryFinished_JSON_callback();
        };

        this.restClientDELETE_Item = new ARestClient(callbackHandler, "DELETE", "");
        this.restClientDELETE_Item.onSuccess = (json) => { /* override */
            callbackHandler.deleteItemListEntry_JSON_callback(json);
        };
    }

    getItem(_id) {
        let item = null;
        for (let i = 0; i < this.itemListJson.length; i++) {
            if (this.itemListJson[i][this.LIST_ITEM_ELEMENTS[0]] === _id) {
                item = this.itemListJson[i];
                break;
            }
        }
        return item;
    }

    getEmptyItem() {
        this.restClientGET_EmptyItem.doRequest(null, "empty=1");
    }

    setCurrentItem(item) {
        this.currentItemJson = item;
    }

    getItemList() {
        this.restClientGET_AllItems.doRequest(null, null);
    }

    updateCurrentItem(title, description, importance, completedBy) {
        this.currentItemJson[this.LIST_ITEM_ELEMENTS[1]] = title;
        this.currentItemJson[this.LIST_ITEM_ELEMENTS[2]] = description;
        this.currentItemJson[this.LIST_ITEM_ELEMENTS[3]] = importance;
        this.currentItemJson[this.LIST_ITEM_ELEMENTS[4]] = completedBy;
    }

    postPutItem() {
        if (this.currentItemJson[this.LIST_ITEM_ELEMENTS[0]] === undefined) {
            this.restClientPOST_Item.doRequest(this.currentItemJson, null);
        } else {
            this.restClientPUT_Item.doRequest(this.currentItemJson, null);
        }
    }

    deleteItem(_id) {
        let json = {};
        json[this.LIST_ITEM_ELEMENTS[0]] = _id;
        this.restClientDELETE_Item.doRequest(json, null);
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

    isFinished(_id) {
        let result = false;
        for (let i = 0; i < this.itemListJson.length; i++) {
            const item = this.itemListJson[i];
            if (item[this.LIST_ITEM_ELEMENTS[0]] === _id && item[this.LIST_ITEM_ELEMENTS[5]]) {
                result = true;
                break;
            }
        }
        return result;
    }

    setIsFinished(_id, isFinished) {
        let json = {};
        json[this.LIST_ITEM_ELEMENTS[0]] = _id;
        json.value = isFinished;

        for (let i = 0; i < this.itemListJson.length; i++) {
            const item = this.itemListJson[i];
            if (item[this.LIST_ITEM_ELEMENTS[0]] === _id) {
                item[this.LIST_ITEM_ELEMENTS[5]] = isFinished;
                break;
            }
        }
        this.restClientPATCH_Item_IsFinished.doRequest(json, null);
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
        this.itemListJson.sort((a, b) => {
            const x = a[this.LIST_ITEM_ELEMENTS[3]];
            const y = b[this.LIST_ITEM_ELEMENTS[3]];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
    }
}
