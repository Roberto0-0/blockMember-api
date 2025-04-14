const { Member } = require("../../models/Member")

class MemberBlockSettings {
    constructor(groupGetBySession, groupSaveChanges) {
        this._groupGetBySession = groupGetBySession
        this._groupSaveChanges = groupSaveChanges
    }

    async execute(session, blockDevProps) {
        const { 
            serialized,
            name,
            blockedBy,
            timeout,
            reason,
            wasAlerted,
        } = blockDevProps

        const group = await this._groupGetBySession.execute(session)
        if (!group.success) return {
            success: false,
            message: group.message
        }

        const { data } = group

        const isBlocked = data.blockedMembers.find(x => x.serialized === serialized)
        if (isBlocked) return {
            success: false,
            message: "Este contato já está bloqueado."
        }

        const newMember = new Member(serialized, name, blockedBy, { timeout, reason })

        newMember.wasAlerted = JSON.parse(wasAlerted) 

        data.blockedMembers.push(newMember)

        await this._groupSaveChanges.execute(session, data)

        return {
            success: true,
            message: "O contato foi bloqueado."
        }
    }
}

module.exports = { MemberBlockSettings }

