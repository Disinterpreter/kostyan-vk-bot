local vkapi = require "./api/vkapi"

return {
    keywords = {"повтори", "повторяй"};
    process = function(data, args)
        local string = ""
        if args[1] then
            string = table.concat(args, " ")
        end
        vkapi.message.send(data.peer_id, string, data.attachments)
    end
}