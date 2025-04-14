const { Group } = require("../../models/Group")

class GroupCreate {
    execute(groupProps) {
        const { session, name } = groupProps

        const newGroup = new Group(session, name)

        return { data: newGroup }
    }
}

module.exports = { GroupCreate }
