const BlockMember = require("../../index")

test("should block contact member", async () => {
    const session = "838293"
    const blockProps = {
        serialized: "29392030@c.us",
        name: "João",
        blockedBy: "93898439@c.us",
        timeout: 60,
        reason: "fala muita merda"
    }

    const storagePath = ("test/config/storage/")
    const { member } = new BlockMember(storagePath)

    const memberBlockService = await member.block(session, blockProps)
    console.log(memberBlockService)

    expect(memberBlockService.success).toBe(true)
})
