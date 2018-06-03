class View {
    constructor(model) {
        this.LOCAL_STORAGE_STYLE = "com.rst.note.style";
        this.model = model;
        this.editDialog = document.getElementById("dialogEdit");
        this.errorDialog = document.getElementById("errorDialog");
        this.errorDialogMessage = document.getElementById("errorDialogMessage");
        this.containerItemList = document.getElementById("containerItemList");
        this.containerInputsDialogEdit = document.getElementById("containerInputsDialogEdit");
        this.templateItemList = Handlebars.compile($("#itemList-template").html());
        this.templateDialogEdit = Handlebars.compile($("#dialogEdit-template").html());
        this.setStyle();
    }

    generateNoteItemList(json) {
        this.containerItemList.innerHTML = this.templateItemList(json);
        /* handlebars */
    }

    showEditDialog(json) {
        document.getElementById("containerInputsDialogEdit").innerHTML = this.templateDialogEdit(json);
        /* handlebars */

        try {
            this.editDialog.showModal();//works only in Chrome
        } catch (e) {
            this.editDialog.open();
        }
    }

    updateModel() {
        this.model.updateCurrentItem(document.getElementById("inputTitle").value
            , document.getElementById("inputDescription").value
            , document.getElementById("inputImportance").value
            , document.getElementById("inputCompletedBy").value);
    }


    showErrorDialog(message) {
        this.errorDialogMessage.innerHTML = message;
        try {
            this.errorDialog.showModal();
        } catch (e) {
            this.errorDialog.open();
        }
    }

    closeEditDialog() {
        this.editDialog.close();
    }

    closeErrorDialog() {
        this.errorDialog.close();
    }

    setStyle() {
        const root = document.querySelector(':root');
        const baseColorStyle1 = window.getComputedStyle(root).getPropertyValue('--baseColorStyle1');
        const baseColorStyle2 = window.getComputedStyle(root).getPropertyValue('--baseColorStyle2');
        const currentStyle = (localStorage.getItem(this.LOCAL_STORAGE_STYLE) == null ? "style1" : localStorage.getItem(this.LOCAL_STORAGE_STYLE));
        root.style.setProperty("--baseColor", (currentStyle === "style1" ? baseColorStyle1 : baseColorStyle2));
    }

    toggleStyle() {
        const currentStyle = localStorage.getItem(this.LOCAL_STORAGE_STYLE);
        localStorage.setItem(this.LOCAL_STORAGE_STYLE, (currentStyle === "style1" ? "style2" : "style1"));
    }

    setStyleToggleIsFinished(togglebutton, isFinished) {
        if (isFinished) {
            togglebutton.style.color = "green";
        } else {
            togglebutton.style.color = "";
        }
    }

}
