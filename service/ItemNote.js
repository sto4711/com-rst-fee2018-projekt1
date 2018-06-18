export class ItemNote {
    constructor() {
        this.state = "ACTIVE";
        this.title = null;
        this.description = null;
        this.importance = 3;
        this.created = new Date().toLocaleString();
        this.completedBy = new Date().toJSON().split('T')[0];
        this.isFinished = false;
    }
}