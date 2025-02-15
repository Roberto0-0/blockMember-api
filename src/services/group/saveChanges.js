const { writeFileSync } = require("node:fs")

class GroupSaveChanges {
    constructor(storage) {
        this._storage = storage
    }

    async execute(session, data) {
        const _storage = `${this._storage}/${session}.json`
        writeFileSync(_storage, JSON.stringify(data, null, 2))

        return { success: true }
    }
}

module.exports = { GroupSaveChanges }
