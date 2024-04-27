import mongoose from "mongoose";
mongoose.set("strictQuery", false);

class Database {
    constructor(url, options) {
        this.url = url;
        this.options = options;
    }

    async connect() {
        try {
            const conn = await mongoose.connect(this.url, this.options);
        } catch (e) {
            throw e;
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
        } catch (e) {
            throw e;
        }
    }
}

export default Database