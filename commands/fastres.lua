local vkapi = require "./api/vkapi"

local hello = {
    "А?";
    "М?";
    "Да да я";
    "Шо надо?";
    "Шо?";
    "Я тут"
}

return {
    keywords = {""};
    process = function(data)
        vkapi.message.send(data.peer_id, hello[math.random(#hello)])
    end
}