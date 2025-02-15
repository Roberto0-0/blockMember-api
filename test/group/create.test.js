const BlockMember = require("../../index")

test("should create group", async () => {
    const session = "838293"

    const data = {
        session,
        serialized: "30939302939",
        name: "group name"
    }

    const storagePath = ("test/config")
    const { group } = new BlockMember(storagePath)

    const groupCreateService = await group.create(session, data)
    console.log(groupCreateService)

    expect(groupCreateService.success).toBe(true)
})
