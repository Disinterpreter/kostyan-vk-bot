return {
    keywords = {"скажи"};
    process = function(data, arg)
        vkapi.message.send(data.peer_id, arg)
    end
}