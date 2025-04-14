const BlockMember = require("../../index")

test("should create group", async () => {
    const session = "838293"

    const groupProps = {
        session,
        name: "group name"
    }

    const storagePath = ("test/config/storage/")
    const { group } = new BlockMember(storagePath)

    const groupCreateService = group.create(groupProps)
    await group.saveChanges(session, groupCreateService.data)

    expect(groupCreateService.data.name).toBe(groupProps.name)
})
