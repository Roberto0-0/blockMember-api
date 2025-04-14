class Group {
    constructor(session, name) {
        this.session = session
        this.name = name
        this.blockedMembers = []
        this.createdAt = Date.now()
    }
}

module.exports = { Group }
