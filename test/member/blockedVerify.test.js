const BlockMember = require("../../index")

test("should verify if member is blocked", async () => {
    const session = "838293"
    const serialized = "9493939@c.us"

    const storagePath = ("test/config")
    const { member } = new BlockMember(storagePath)

    const memberBlockedVerifyService = await member.blockedVerify(session, serialized)
    console.log(memberBlockedVerifyService)

    expect(memberBlockedVerifyService.success).toBe(true)
})
