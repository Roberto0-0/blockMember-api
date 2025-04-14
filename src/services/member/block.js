const { Member } = require("../../models/Member")

class MemberBlock {
    constructor(groupGetBySession, groupSaveChanges) {
        this._groupGetBySession = groupGetBySession
        this._groupSaveChanges = groupSaveChanges
    }

    async execute(session, blockProps) {
        const {
            serialized,
            name,
            blockedBy,
            timeout,
            reason
        } = blockProps

        const group = await this._groupGetBySession.execute(session)
        if (!group.success) return {
            success: false,
            message: group.message
        }
        const { data } = group

        const memberIsBlocked = data.blockedMembers.find(x => x.serialized == serialized)
        if (memberIsBlocked) return {
            success: false,
            message: "Este contato já está bloqueado."
        }

        const newMember = new Member(serialized, name, blockedBy, { timeout, reason })

        data.blockedMembers.push(newMember)

        await this._groupSaveChanges.execute(session, data)

        return { success: true }
    }
}

module.exports = { MemberBlock }
