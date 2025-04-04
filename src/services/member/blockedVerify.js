class MemberBlockedVerify {
    constructor(groupGetBySession, groupSaveChanges) {
        this._groupGetBySession = groupGetBySession
        this._groupSaveChanges = groupSaveChanges
    }

    async execute(session, serialized) {
        const group = await this._groupGetBySession.execute(session)
        if (!group.success) return {
            success: false,
            message: group.message
        }

        const { data } = group

        const memberIsBlocked = data.blockedMembers.find(x => x.serialized == serialized)
        if (!memberIsBlocked) return { success: false }
        if (memberIsBlocked.wasAlerted) return { success: true }

        memberIsBlocked.wasAlerted = true

        await this._groupSaveChanges.execute(session, data)

        return {
            success: true,
            message: "⚠️  *ATENÇÃO*! Seu contato foi bloqueado de usar os comandos do bot por violação das regras. Entre em contato com um *[@adm]* se tiver dúvidas.\n"
        }
    }
}

module.exports = { MemberBlockedVerify }
