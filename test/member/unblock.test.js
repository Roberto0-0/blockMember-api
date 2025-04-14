const BlockMember = require("../../index")

test("should unblock contact member", async () => {
    const session = "838293"
    const data = {
        serialized: "9493939@c.us",
        blockedBy: "93898439@c.us"
    }

    const storagePath = ("test/config/storage/")
    const { member } = new BlockMember(storagePath)

    const memberUnblockService = await member.unblock(session, data)
    console.log(memberUnblockService)

    expect(memberUnblockService.success).toBe(true)
})
