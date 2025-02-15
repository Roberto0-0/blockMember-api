const BlockMember = require("../../index")

test("should get group by session", async () => {
    const session = "838293"
    const storagePath = ("test/config")
    const { group } = new BlockMember(storagePath)

    const groupGetBySessionService = await group.getBySession(session)
    console.log(groupGetBySessionService)

    expect(groupGetBySessionService.success).toBe(true)
})
