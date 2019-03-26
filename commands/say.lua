local vkapi = require "./api/vkapi"

return {
    keywords = {"скажи"};
    process = function(data, args)
        local string = table.concat(args, " ")
        vkapi.message.send(data.peer_id, string)
    end
}