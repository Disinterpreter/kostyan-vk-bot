local vkapi = require "./api/vkapi"

local answers = {
    "Лучше некуда"; 
    "Отлично";
    "Збс";
    "Намана!"
}

return {
    keywords = {"как", "дела", "чо"};
    process = function(data, args, cmd)
        if (cmd == "как" and args[1] == "дела") or (cmd == "дела" and args[1] == "как") or (cmd == "чо" and args[1] == "как") then
            math.randomseed(os.time())
            vkapi.message.send(data.peer_id, answers[math.random(#answers)])            
        end
    end
}