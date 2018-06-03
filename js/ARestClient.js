/*
 Abstract class
 */
class ARestClient {
    constructor(errorCallbackHandler, ajaxType = "PLEASE DEFINE AJAX TYPE") {
        this.URL_REST_NOTE = 'http://localhost:8081/com-rst-fee2018-projekt1-rest/note';
        this.errorCallbackHandler = errorCallbackHandler;
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
        console.debug("ARestClient.onSuccess() -> must be overridden");
    }

    onError(jqXHR, textStatus, errorThrown) {
        this.errorCallbackHandler.ajaxError_callback(jqXHR, textStatus, errorThrown);
    }
}

