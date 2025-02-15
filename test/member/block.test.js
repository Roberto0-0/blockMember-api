const BlockMember = require("../../index")

test("should block contact member", async () => {
    const session = "838293"
    const data = {
        serialized: "9493939@c.us",
        name: "Maria",
        blockedBySerialized: "93898439@c.us"
    }

    const storagePath = ("test/config")
    const { member } = new BlockMember(storagePath)

    const memberBlockService = await member.block(session, data)
    console.log(memberBlockService)

    expect(memberBlockService.success).toBe(true)
})
