class MemberBlockedVerify {
    constructor(groupGetBySession, groupSaveChanges) {
        this._groupGetBySession = groupGetBySession
        this._groupSaveChanges = groupSaveChanges
    }

    async execute(session, serialized) {
        let messageAlert = "⚠️  *ATENÇÃO*! Seu contato foi bloqueado #blockType# de usar os comandos do "
        messageAlert += "bot por #reason#. Entre em contato com um *[@adm]* se tiver dúvidas.\n"
        const group = await this._groupGetBySession.execute(session)
        if (!group.success) return {
            success: false,
            message: group.message
        }

        const { data } = group

        const isBlocked = data.blockedMembers.find(x => x.serialized == serialized)
        if (!isBlocked) return { success: false }
        if (isBlocked.wasAlerted) {
            if (isBlocked.type === "permanent") return { success: true }
            if (isBlocked.timeout <= Date.now()) {
                data.blockedMembers = data.blockedMembers.filter(function(jsonObject) {
                    return jsonObject["serialized"] != isBlocked.serialized;
                });

                await this._groupSaveChanges.execute(session, data)

                return { success: false }
            }

            return { success: true }
        }

        await this._groupSaveChanges.execute(session, data)

        messageAlert = messageAlert.replace("#reason#", isBlocked.reason)
        messageAlert = messageAlert.replace("#blockType#", (isBlocked.type === "permanent") ? "permanentemente" : "temporariamente")

        return {
            success: true,
            message: messageAlert
        }
    }
}

module.exports = { MemberBlockedVerify }
