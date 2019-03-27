local request   = require "wsapi.request"
local response  = require "wsapi.response"
local rapidjson = require "rapidjson"
local vkbot     = require "bot"
                  require "io"

function server(wsapi_env)
    local headers = { ["Content-type"] = "text/html" }

    local function callback()
        coroutine.yield("ok")

        local req = request.new(wsapi_env)

        local json = req.POST['post_data']
        local data = rapidjson.decode(json)

        print(" ")
        print("REQUEST FROM "..data.object.peer_id.." "..data.object.text)
        print(" ")

        vkbot:onMessage(data)
    end

    return 200, headers, coroutine.wrap(callback)
end

return server