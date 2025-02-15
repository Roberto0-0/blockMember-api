class Member {
    constructor(serialized, name, blockedBySerialized) {
        this.serialized = serialized
        this.name = name
        this.blockedBySerialized = blockedBySerialized
        this.wasAlerted = false
        this.blockedAt = new Date()
    }
}

module.exports = { Member }
