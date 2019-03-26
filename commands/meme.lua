local vkapi = require "./api/vkapi"

local groups = {
    -40232010,
    -92876084,
    -150550417,
    -73598440,
    -155464693,
    -148583957,
    -139441547,
    -93082454,
    -164517505
}

local answers = {
    "Вот же!",
    "Вот он!",
    "Забирай",
    "Бери"
}

return {
    keywords = {"мем", "мемас", "мемес", "мемчик", "юмор"};
    process = function(data, args)
        local post = vkapi.random.getPost(groups[math.random(#groups)])
        local msg = ""
        if args[1] == "где" then
            msg = answers[math.random(1,2)]
        else
            msg = answers[math.random(3,4)]
        end
        vkapi.message.send(data.peer_id, msg, post)
    end
}