/*
 Abstract class
 */
class ARestClient {
    constructor(errorCallbackHandler, requestType = "PLEASE DEFINE AJAX TYPE",path) {
        //this.URL_REST_NOTE = 'http://localhost:8080/com-rst-fee2018-projekt1-rest/note'; /* REST java, Tomcat */
        this.URL_REST_NOTE = "http://localhost:3000/note";  /* REST node.js */
        this.errorCallbackHandler = errorCallbackHandler;
        this.requestType = requestType;
        this.path = (path==null? "": path);
        // if (this instanceof ARestClient) {
        //     throw {
        //         name: "WrongInstanceofException",
        //         message: "not allowed to instancing an abstract class",
        //         toString: function () {
        //             return "not allowed to instancing an abstract class";
        //         }
        //     };
        // }
    }


    doRequest(dataJson, query ) {
        $.ajax({
            type: this.requestType,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: this.URL_REST_NOTE + this.path + (query!=null? "?" + query: ""),
            data: (dataJson!=null? JSON.stringify(dataJson) : null),
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

