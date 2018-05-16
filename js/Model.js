'usestrict';
/*
* JSONP vs cross domain requests, must be padded on rest server !!
*/
class Model {
    constructor(controller) {
        this.URL_REST_NOTE = 'http://localhost:8081/com-rst-fee2018-projekt1-rest/note';//constant
        this.TABLE_COL_NAMES = ["id", "content", "status", "synced", "created"];
        this.controller = controller;
        this.rowsJson;
    }

    getTableRows() {
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: this.URL_REST_NOTE + '?corsissue=get=',
            success:  (json) => {
                this.rowsJson = json.rows;
                let jsonStr = JSON.stringify(json);
                localStorage.setItem("rst4711", jsonStr);
                this.controller.getTableJson_callback(json.rows);
            },
            error: (jqXHR, textStatus, errorThrown)=>  {
                this.onAjaxError(jqXHR, textStatus, errorThrown, "GET");
            },
        });
    }

    putTableRow() {
        let myself = this;
        $.ajax({
            type: "PUT",
            dataType: "jsonp",
            url: myself.URL_REST_NOTE + '?corsissue=put',
            success: function (json) {
                myself.controller.putTableRowJson_callback(json);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                myself.onAjaxError(jqXHR, textStatus, errorThrown, "PUT");
            },
        });
    }

    deleteTableRow(rowIndex) {
        let myself = this;
        let id = this.rowsJson[rowIndex - 1]["id"];//header starts with 0
        $.ajax({
            type: "DELETE",
            dataType: "jsonp",
            url: myself.URL_REST_NOTE + '?corsissue=delete&id=' + id,
            success: function (json) {
                myself.controller.deleteTableRowJson_callback(json);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                myself.onAjaxError(jqXHR, textStatus, errorThrown, "DELETE");
            },
        });
    }

    onAjaxError(jqXHR, textStatus, errorThrown, ajaxMethod) {
        console.debug("ajax error " + textStatus);
        throw {
            name: "AjaxException",
            message: textStatus,
            toString: function () {
                return this.name + ": " + this.message;
            }
        };
    }

};

