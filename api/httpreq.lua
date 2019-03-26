
local httpc     = require("httpclient").new()
local rapidjson = require "rapidjson"

req = {}

req.GET = function(url) 
    return httpc:get(url).body
end

req.POST = function(url, postarr) 

    local value = {}
    for k,v in pairs(postarr) do
        table.insert(value, k.."="..v)
    end
    local output = table.concat(value,"&")
    local res = httpc:post(url, output)
    return res.body
end

req.GETJSON = function(url)
    local jsonstr = httpc:get(url).body

    local json = rapidjson.decode(jsonstr)
    if (json == nil) then return "bad response" end
    return json
end


req.POSTJSON = function(url)
    local value = {}
    for k,v in pairs(postarr) do
        table.insert(value, k.."="..v)
    end
    local output = table.concat(value,"&")
    local res = httpc:post(url, output)
    local json = rapidjson.decode(res.body)
    if (json == nil) then return "bad response" end
    return json
end
--local response = POST("http://46.226.165.173/hook", { ["arg1"] = "value2", ["arg2"] = "value3" })
-- local response = GETJSON("http://fucking-great-advice.ru/api/random")

--print (response.text)
return {
    req = req;
}