local vkapi = require "./api/vkapi"
local httpreq = require "./api/httpreq"

return {
    keywords = {"совет"};
    process = function(data)
        local answ = httpreq.req.GETJSON("http://fucking-great-advice.ru/api/random")
        vkapi.message.send(data.peer_id, answ.text)
    end
}