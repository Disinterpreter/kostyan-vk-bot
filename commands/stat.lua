local vkapi = require "./api/vkapi"

-- local answers = {
--     "Здарова";
--     "О, привет!";
--     "Привет";
-- }

return {
    keywords = {"версия", "статка", "здоровье"};
    process = function(data)
        local execcommit = io.popen('git rev-list HEAD | head -n 1')
        local commit = execcommit:read("*a")
        local execdescription = io.popen('git log -1 --pretty=%B')
        local description = execdescription:read("*a")        

        
        execcommit:close()
        execdescription:close()
        local output = "Номер коммита: ".. commit .. "\n" .. "Сообщение: ".. description .. "\n" .. "Детали: https://github.com/Disinterpreter/perl-vk-bot/commit/".. commit 
        -- 
        --print(output)
        vkapi.message.send(data.peer_id, output)
        -- local resp = math.random(1, 2)
        -- if resp == 1 then
        --     vkapi.message.send(data.peer_id, answers[math.random(#answers)])
        -- elseif resp == 2 then
        --     vkapi.message.sendSticker(data.peer_id, 4380)
        -- end
    end
}