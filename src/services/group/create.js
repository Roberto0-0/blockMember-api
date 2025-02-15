const { Group } = require("../../models/Group")

class GroupCreate {
    constructor(groupGetBySession, groupSaveChanges) {
        this._groupGetBySession = groupGetBySession
        this._groupSaveChanges = groupSaveChanges 
    }

    async execute(session, request) {
        const { serialized, name } = request
        const group = await this._groupGetBySession.execute(session)
        if (group.success) return {
            success: false,
            message: "Este grupo já está criado."
        }

        const newGroup = new Group(session, serialized, name)
        await this._groupSaveChanges.execute(session, newGroup)

        return {
            success: true,
            message: "Grupo criado com sucesso.",
            data:  newGroup
        }
    }
}

module.exports = { GroupCreate }
