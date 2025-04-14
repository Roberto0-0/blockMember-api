const { GroupGetBySession } = require("../services/group/getBySession")
const { GroupSaveChanges } = require("../services/group/saveChanges")
const { MemberBlock } = require("../services/member/block")
const { MemberUnblock } = require("../services/member/unblock")
const { MemberBlockedVerify } = require("../services/member/blockedVerify")
const { MemberBlockSettings } = require("../services/member/blockDev")
const { MemberUnblockSettings } = require("../services/member/unblockDev")
const path = require("node:path")

class MemberController {
    constructor(storagePath) {
        this.storage = path.join(process.cwd(), `${storagePath}/blockMember_storage`)
    }

    async block(session, blockProps) {
        const groupGetBySession = new GroupGetBySession(this.storage)
        const groupSaveChanges = new GroupSaveChanges(this.storage)

        const service = new MemberBlock(groupGetBySession, groupSaveChanges)
        return await service.execute(session, blockProps)
    }

    async unblock(session, unBlockProps) {
        const groupGetBySession = new GroupGetBySession(this.storage)
        const groupSaveChanges = new GroupSaveChanges(this.storage)

        const service = new MemberUnblock(groupGetBySession, groupSaveChanges)
        return await service.execute(session, unBlockProps)
    }

    async blockedVerify(session, serialized) {
        const groupGetBySession = new GroupGetBySession(this.storage)
        const groupSaveChanges = new GroupSaveChanges(this.storage)

        const service = new MemberBlockedVerify(groupGetBySession, groupSaveChanges)
        return await service.execute(session, serialized)
    }

    async blockDev(session, blockDevProps) {
        const groupGetBySession = new GroupGetBySession(this.storage)
        const groupSaveChanges = new GroupSaveChanges(this.storage)

        const service = new MemberBlockSettings(groupGetBySession, groupSaveChanges)
        return await service.execute(session, blockDevProps)
    }

    async unblockDev(session, serialized) {
        const groupGetBySession = new GroupGetBySession(this.storage)
        const groupSaveChanges = new GroupSaveChanges(this.storage)

        const service = new MemberUnblockSettings(groupGetBySession, groupSaveChanges)
        return await service.execute(session, serialized)
    }
}

module.exports = { MemberController } 
