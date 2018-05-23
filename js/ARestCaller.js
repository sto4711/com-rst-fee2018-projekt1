'usestrict';

/*
 Abstract class
 */
class ARestCaller {
    constructor() {
        this.URL_REST_NOTE = 'http://localhost:8081/com-rst-fee2018-projekt1-rest/note';

        /*
        if (this instanceof ARestCaller) {
            throw {
                name: "AjaxException",
                message: "not allowed to instancing a abstract class",
                toString: function () {
                    return "not allowed to instancing a abstract class";
                }
            };
        }
        */
    }

    doRestCall(dataJson) {
        $.ajax({
            type: this.getAjaxType(),
            dataType: "json",
            url: this.URL_REST_NOTE,
            data: dataJson,
            success: (json) => {
                this.onSuccess(json);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                this.onError(jqXHR, textStatus, errorThrown);
            },
        });
    }

    /*  must be be overridden */
    getAjaxType() {
        return "GET";
    }

    /*  must be be overridden */
    onSuccess(dataJson) {
        Logger.debugConsole("ARestCaller.onSuccess() -> must be overridden");
    }

    onError(jqXHR, textStatus, errorThrown) {
        console.debug("ajax error " + textStatus);
        this.view.showErrorDialog("There's an issue with the backend. Please try again later");
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

