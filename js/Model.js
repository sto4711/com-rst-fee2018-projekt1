'usestrict';

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
            dataType: "json",
            url: this.URL_REST_NOTE,
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
        $.ajax({
            type: "PUT",
            dataType: "json",
            url: this.URL_REST_NOTE,
            success: (json) => {
                this.controller.putTableRowJson_callback(json);
            },
            error: (jqXHR, textStatus, errorThrown) =>{
                this.onAjaxError(jqXHR, textStatus, errorThrown, "PUT");
            },
        });
    }

    deleteTableRow(rowIndex) {
        let id = this.rowsJson[rowIndex]["id"];
        Logger.debugConsole("id " + id);

        $.ajax({
            type: "DELETE",
            url: this.URL_REST_NOTE ,
            /* like SOAP into request body */
            data : {"id" : id
            },
            url: this.URL_REST_NOTE,
            success: (json) =>{
                this.controller.deleteTableRowJson_callback(json);
            },
            error: (jqXHR, textStatus, errorThrown)=> {
                this.onAjaxError(jqXHR, textStatus, errorThrown, "DELETE");
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

