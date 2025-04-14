const BlockMember = require("../../index")

test("should verify if member is blocked", async () => {
    const session = "838293"
    const serialized = "29392030@c.us"

    const storagePath = ("test/config/storage/")
    const { member } = new BlockMember(storagePath)

    const memberBlockedVerifyService = await member.blockedVerify(session, serialized)
    console.log(memberBlockedVerifyService)

    expect(memberBlockedVerifyService.success).toBe(true)
})
