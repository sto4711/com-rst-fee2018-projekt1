/* import * as Handlebars from './js/handlebars-v4.0.11.js'; */
class View {
    constructor(model) {
        this.LOCAL_STORAGE_STYLE = "com.rst.note.style";
        this.model = model;
        this.editDialog = $('#dialogEdit')[0]; //real DOM-Object
        this.dialogError = $('#dialogError')[0];
        this.dialogErrorMessage = $('#dialogErrorMessage')[0];
        this.containerItemList = $('#containerItemList')[0];
        this.containerInputsDialogEdit = $('#containerInputsDialogEdit')[0];
        this.templateItemList = Handlebars.compile($("#itemList-template").html());
        this.templateDialogEdit = Handlebars.compile($("#dialogEdit-template").html());
        this.setStyle();
    }

    generateNoteItemList(json) {
        this.containerItemList.innerHTML = this.templateItemList(json);
    }

    showEditDialog(json) {
        this.containerInputsDialogEdit.innerHTML = this.templateDialogEdit(json);

        try {
            this.editDialog.showModal();//works only in Chrome
        } catch (e) {
            this.editDialog.open();
        }
    }

    updateModel() {
        this.model.updateCurrentItem($('#inputTitle').val(), $('#inputDescription').val(), $('#inputImportance').val(), $('#inputCompletedBy').val());
    }

    showErrorDialog(message) {
        this.dialogErrorMessage.innerHTML = message;
        try {
            this.dialogError.showModal();
        } catch (e) {
            this.dialogError.open();
        }
    }

    closeEditDialog() {
        this.editDialog.close();
    }

    closeErrorDialog() {
        this.dialogError.close();
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

}
