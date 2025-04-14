class MemberUnblockSettings {
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

        const isBlocked = data.blockedMembers.find(x => x.serialized == serialized)
        if (!isBlocked) return {
            success: false,
            message: "Este contato não foi bloqueado."
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

module.exports = { MemberUnblockSettings }
