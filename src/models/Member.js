class Member {
    constructor(serialized, name, blockedBy, { timeout, reason }) {
        this.serialized = serialized
        this.name = name
        this.blockedBy = blockedBy
        this.type = this.setBlockType(timeout)
        this.timeout = this.setTimeout(timeout)
        this.reason = reason
        this.wasAlerted = false 
        this.blockedAt = Date.now()
    }

    setTimeout(timeout) {
        if (!timeout) return null
        let date = new Date()
        date.setSeconds(date.getSeconds() + Number(timeout * 60))
        return date.getTime()
    }

    setBlockType(timeout) {
        return (timeout) ? "temporary" : "permanent"
    }
}

module.exports = { Member }
