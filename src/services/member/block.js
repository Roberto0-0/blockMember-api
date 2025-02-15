const { Member } = require("../../models/Member")

class MemberBlock {
    constructor(groupGetBySession, groupSaveChanges) {
        this._groupGetBySession = groupGetBySession
        this._groupSaveChanges = groupSaveChanges
    }

    async execute(session, request) {
        const { serialized, name, blockedBySerialized } = request

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

        const newMember = new Member(serialized, name, blockedBySerialized)

        data.blockedMembers.push({
            serialized: newMember.serialized,
            name: newMember.name,
            blockedBySerialized: newMember.blockedBySerialized,
            wasAlerted: false,
            blockedAt: new Date()
        })

        await this._groupSaveChanges.execute(session, data)

        return {
            success: true,
            message: "O contato foi bloqueado."
        }
    }
}

module.exports = { MemberBlock }
