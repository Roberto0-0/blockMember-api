const { groupsavechanges } = require("../../src/services/group/savechanges")
const { groupgetbysession } = require("../../src/services/group/getbysession")
const path = require("node:path")

test("should save group changes", async () => {
    const storage = path.join(__dirname, "..", "config", "storage")
    const session = "8483839"

    const groupgetbysesionservice = new groupgetbysession(storage)
    const { data } = await groupgetbysesionservice.execute(session)

    data.session = "____"
    
    const groupcreateservice = new groupsavechanges(storage)
    const groupcreateresponse = await groupcreateservice.execute(session, data)

    expect(groupcreateresponse.success).tobe(true)
})
