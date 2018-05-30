/*
 Abstract class
 */
class ARestClient {
    constructor(ajaxType) {
        this.URL_REST_NOTE = 'http://localhost:8081/com-rst-fee2018-projekt1-rest/note';
        this.ajaxType = ajaxType;
        // if (this instanceof ARestClient) {
        //     throw {
        //         name: "WrongInstanceofException",
        //         message: "not allowed to instancing a abstract class",
        //         toString: function () {
        //             return "not allowed to instancing a abstract class";
        //         }
        //     };
        // }
    }

    doRequest(dataJson) {
        $.ajax({
            type: this.ajaxType,
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
    onSuccess(dataJson) {
        Logger.debugConsole("ARestClient.onSuccess() -> must be overridden");
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
}

