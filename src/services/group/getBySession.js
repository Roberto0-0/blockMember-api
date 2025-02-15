const { readFileSync, existsSync } = require("node:fs")

class GroupGetBySession {
    constructor(storage) {
        this._storage = storage
    }

    async execute(session) {
        const _storage = `${this._storage}/${session}.json`

        if(!existsSync(_storage)) return {
            success: false,
            message: "O grupo não foi encontrado."
        }

        const data = readFileSync(_storage, "utf8")
        const content = JSON.parse(data)

        return {
            success: true,
            data: content
        }
    }
}

module.exports = { GroupGetBySession }
