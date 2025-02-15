const BlockMember = require("../../index")

test("should unblock member by dev option", async () => {
    const session = "838293"
    const serialized = "9493939@c.us"

    const storagePath = ("test/config")
    const { member } = new BlockMember(storagePath)

    const memberUnblockDevService = await member.unblockDev(session, serialized)
    console.log(memberUnblockDevService)

    expect(memberUnblockDevService.success).toBe(true)
})
