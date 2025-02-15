const BlockMember = require("../../index")

test("should delete a group", async () => {
    const session = "938293"

    const storagePath = ("test/config")
    const { group } = new BlockMember(storagePath)

    const groupDeleteService = await group.delete(session)
    console.log(groupDeleteService)

    expect(groupDeleteService.success).toBe(true)
})
