const BlockMember = require("../../index")

test("should get all groups", async () => {
    const storagePath = ("test/config")
    const { group } = new BlockMember(storagePath)

    const groupGetAllService = await group.getAll()
    console.log(groupGetAllService)

    expect(groupGetAllService.success).toBe(true)
})
