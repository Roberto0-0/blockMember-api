const { unlinkSync } = require("node:fs")

class GroupDelete {
    constructor(storage, groupGetBySession) {
        this._storage = storage
        this._groupGetBySession = groupGetBySession
    }

    async execute(session) {
        const group = await this._groupGetBySession.execute(session)
        if (!group.success) return {
            success: false,
            message: group.message 
        }

        const _storage = `${this._storage}/${session}.json`
        unlinkSync(_storage)

        return {
            success: true,
            message: "O grupo foi deletado com sucesso."
        }
    }
}

module.exports = { GroupDelete }
