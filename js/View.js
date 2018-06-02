class View {
    constructor(model) {
        this.LOCAL_STORAGE_STYLE = "com.rst.note.style";
        this.model = model;
        this.editDialog = document.getElementById("editDialog");
        this.errorDialog = document.getElementById("errorDialog");
        this.errorDialogMessage = document.getElementById("errorDialogMessage");
        this.idRow = -1;//there's no way to set an attribute in the dataset of the dialog. Don't wanna use a hidden field in dialog
        this.inputTitle = document.getElementById("inputTitle");
        this.inputDescription = document.getElementById("inputDescription");
        this.inputImportance = document.getElementById("inputImportance");
        this.inputCompletedBy = document.getElementById("inputCompletedBy");
        this.noteItemContainer = document.getElementById("noteItemContainer");
        this.initUI();
        this.setStyle();
    }

    initUI() {
        document.getElementById("inputCompletedBy").valueAsDate = new Date();//today as default
    }

    getIsInsertUpdateModus() {
        return this.isInsertUpdateModus;
    }

    /* handlebars */
    generateNoteItemList(rowJson) {
        this.noteItemContainer.innerHTML = null;
        let source = $("#noteItem-template").html();
        let template = Handlebars.compile(source);
        this.noteItemContainer.innerHTML = template(rowJson);
    }

    showEditDialog(rowJSON) {
        this.idRow = -1;//value for insert

        if (rowJSON != null) {// Update; set the current values
            this.idRow = rowJSON[this.model.LIST_ITEM_ELEMENTS[0]];
            this.inputTitle.value = rowJSON[this.model.LIST_ITEM_ELEMENTS[1]];
            this.inputDescription.value = rowJSON[this.model.LIST_ITEM_ELEMENTS[2]];
            this.inputImportance.value = rowJSON[this.model.LIST_ITEM_ELEMENTS[3]];
            this.inputCompletedBy.value = rowJSON[this.model.LIST_ITEM_ELEMENTS[4]];
        }

        try {
            this.editDialog.showModal();//works only in Chrome
        } catch (e) {
            this.editDialog.open();
        }
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
