local vkapi = require "./api/vkapi"

local videos = {
    -111096931,
    -95254073,
    -102087446,
    -108338390
}

local answers = {
    "Вот же!",
    "Вот он!",
    "Забирай",
    "Бери"
}

return {
    keywords = {"видос", "вебм", "шебм"};
    process = function(data, args)
        local video = vkapi.random.getVideo(videos[math.random(#videos)])
        local msg = ""
        if args[1] == "где" then
            msg = answers[math.random(1,2)]
        else
            msg = answers[math.random(3,4)]
        end
        vkapi.message.send(data.peer_id, msg, video)
    end
}