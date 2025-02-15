const { GroupCreate } = require("../services/group/create")
const { GroupGetBySession } = require("../services/group/getBySession")
const { GroupGetAll } = require("../services/group/getAll")
const { GroupSaveChanges } = require("../services/group/saveChanges")
const { GroupDelete } = require("../services/group/delete")
const { existsSync, mkdirSync } = require("node:fs")
const path = require("node:path")

class GroupController {
    constructor(storagePath) {
        this.storage = path.join(process.cwd(), `${storagePath}/blockMember_storage`)
        this._foldeExist()
    }

    async create(session, request) {
        const groupGetBySession = new GroupGetBySession(this.storage)
        const groupSaveChanges = new GroupSaveChanges(this.storage)

        const service = new GroupCreate(groupGetBySession, groupSaveChanges)
        return await service.execute(session, request)
    }

    async getBySession(session) {
        const service = new GroupGetBySession(this.storage)
        return await service.execute(session)
    }

    async getAll() {
        const service = new GroupGetAll(this.storage)
        return await service.execute()
    }

    async saveChanges(session, request) {
        const groupGetBySession = new GroupGetBySession(this.storage)

        const service = new GroupSaveChanges(this.storage, groupGetBySession)
        return await service.execute(session, request)
    }

    async delete(session) {
        const groupGetBySession = new GroupGetBySession(this.storage)

        const service = new GroupDelete(this.storage, groupGetBySession)
        return await service.execute(session)
    }

    _foldeExist() {
        if (!existsSync(this.storage)) mkdirSync(this.storage)
    }
}

module.exports = { GroupController }
