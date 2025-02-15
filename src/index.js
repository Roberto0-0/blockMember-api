const groupController = require("./controllers/groupController")
const memberController = require("./controllers/memberController")

class BlockSystem {
    async createGroup(session, request) {
        return await groupController.create(session, request)
    }

    async getBySessionGroup(session) {
        return await groupController.getBySession(session)
    }

    async getAllGroup() {
        const { data } = await groupController.getAll()
        return data
    }

    async deleteGroup(session) {
        return await groupController.delete(session)
    }

    async block(session, serialized, name, request) {
        const group = await this.getBySessionGroup(session)
        if (!group.success) {
            await this.createGroup(session, { serialized, name })

            const response = await memberController.block(session, request)
            return response.message
        }

        const response = await memberController.block(session, request)
        return response.message
    }

    async unblock(session, request) {
        const response = await memberController.unblock(session, request)
        if (!response.success) return response.message
        return response.message
    }

    async verify(session, serialized) {
        return await memberController.blockedVerify(session, serialized)
    }

    async blockSettings(session, request) {
        const response = await memberController.blockSettings(session, request)
        return response.message
    }

    async unblockSettings(session, request) {
        const response = await memberController.unblockSettings(session, request)
        return response.message
    }
}

module.exports = new BlockSystem
