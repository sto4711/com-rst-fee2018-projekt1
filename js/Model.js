class Model {
    constructor(controller) {
        this.tableColNames = ["id", "content", "status", "synced", "created"];
        this.controller = controller;
    }

    getTableJson() {
        /* JSONP vs cross domain requests, must be padded on rest server !! */
        var self = this;
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: 'http://localhost:8080/com-rst-fee2018-projekt1-rest/note',
            success: function (json) {
                self.controller.getTableJson_callback(json);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.debug("ajax error " + textStatus);
                throw {
                    name: "AjaxException",
                    message: textStatus,
                    toString: function () {
                        return this.name + ": " + this.message;
                    }
                };
            },
        });
    }


};

