class Group {
    constructor(session, serialized, name) {
        this.session = session
        this.serialized = serialized 
        this.name = name
        this.blockedMembers = []
        this.createdAt = Date.now()
    }
}

module.exports = { Group }
