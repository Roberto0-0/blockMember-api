const { GroupController } = require("./src/controllers/groupController");
const { MemberController } = require("./src/controllers/memberController");

class BlockMember {
    constructor(storagePath) {
        this.storage = storagePath
        this.group = new GroupController(this.storage)
        this.member = new MemberController(this.storage)
    }
}

module.exports = BlockMember
