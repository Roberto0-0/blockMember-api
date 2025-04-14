class MemberUnblock {
    constructor(groupGetBySession, groupSaveChanges) {
        this._groupGetBySession = groupGetBySession
        this._groupSaveChanges = groupSaveChanges
    }

    async execute(session, unblockProps) {
        const { serialized, blockedBy } = unblockProps

        const group = await this._groupGetBySession.execute(session)
        if (!group.success) return {
            success: false,
            message: "Nenhum contato foi bloqueado ainda."
        }

        const { data } = group

        const isBlocked = data.blockedMembers.find(x => x.serialized === serialized)
        if (!isBlocked) return {
            success: false,
            message: "Este contato não foi bloqueado."
        }

        if (isBlocked.blockedBy !== blockedBy) return {
            success: false,
            message: "Não é possível desbloquear este contato."
        }

        data.blockedMembers = data.blockedMembers.filter(function(jsonObject) {
            return jsonObject["serialized"] != isBlocked.serialized;
        });

        await this._groupSaveChanges.execute(session, data)

        return {
            success: true,
            message: "O contato foi desbloqueado."
        }
    }
}

module.exports = { MemberUnblock } 
