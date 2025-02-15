class Group {
    constructor(session, serialized, name) {
        this.session = session
        this.serialized = serialized
        this.name = name
        this.blockedMembers = []
    }
}

module.exports = { Group }
