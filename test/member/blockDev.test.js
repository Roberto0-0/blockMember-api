const BlockMember = require("../../index")

test("should block member by dev option", async () => {
    const session = "838293"
    const data = {
        serialized: "9493939@c.us",
        name: "André",
        blockedBySerialized: "84948739@c.us",
        wasAlerted: false
    }

    const storagePath = ("test/config")
    const { member } = new BlockMember(storagePath)

    const memberBlockDevService = await member.blockDev(session, data)
    console.log(memberBlockDevService)

    expect(memberBlockDevService.success).toBe(true)
})
