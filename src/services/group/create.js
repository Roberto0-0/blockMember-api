const { Group } = require("../../models/Group")

class GroupCreate {
    execute(groupProps) {
        const { session, serialized, name } = groupProps

        const newGroup = new Group(session, serialized, name)

        return { data: newGroup }
    }
}

module.exports = { GroupCreate }
