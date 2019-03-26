local vkapi = require "./api/vkapi"

return {
    keywords = {"папей", "попей"};
    process = function(data, args)
        if args[1] == "гавна" or args[1] == "гавнины" then
            vkapi.message.send(data.peer_id, "", "photo-179956136_456239023")
        end
    end
}