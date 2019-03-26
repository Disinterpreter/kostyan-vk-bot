local vkapi = require "./api/vkapi"

local answers = {
    "Здарова";
    "О, привет!";
    "Привет";
}

return {
    keywords = {"привет", "здарова", "здорова"};
    process = function(data)
        local resp = math.random(1, 2)
        if resp == 1 then
            vkapi.message.send(data.peer_id, answers[math.random(#answers)])
        elseif resp == 2 then
            vkapi.message.sendSticker(data.peer_id, 4380)
        end
    end
}