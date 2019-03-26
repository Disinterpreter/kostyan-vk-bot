-- Methods
local messages = {}
      messages.send = "https://api.vk.com/method/messages.send"
      
local wall = {}
      wall.get = "https://api.vk.com/method/wall.get"

local photos = {}
      photos.get = "https://api.vk.com/method/photos.get"

local video = {}
      video.get = "https://api.vk.com/method/video.get"

-- //

local httpc     = require("httpclient").new()
local rapidjson = require "rapidjson"

local config        = rapidjson.load("./api/config.json")
local vk_config     = "access_token="..config.vk.."&v="..config.version.."&"
local vkuser_config = "access_token="..config.vkuser.."&v="..config.version.."&"

-- Messages
local message = {}

message.send = function(peer_id, message, attachments)
    local body = vk_config.."peer_id="..peer_id.."&random_id="..math.random(99999).."&message="..message

    if attachments then
        if type(attachments) == "table" then
            body = body.."&attachment="
            for i, item in ipairs(attachments) do
                body = body..item.type..item[item.type].owner_id.."_"..item[item.type].id..","
            end
        elseif type(attachments) == "string" then
            body = body.."&attachment="..attachments
        end
    end

    local res = httpc:post(messages.send, body)
    
    print(" ")
    print("Sending message:")
    print(peer_id.." -> "..message.." : code "..res.code)
end

message.sendSticker = function(peer_id, sticker_id)
    local body = vk_config.."peer_id="..peer_id.."&random_id="..math.random(99999).."&sticker_id="..sticker_id

    local res = httpc:post(messages.send, body)

    print(" ")
    print("Sending sticker:")
    print(peer_id.." -> "..sticker_id.." : code "..res.code)
end
-- //

-- Random getters
local random = {}

random.getPost = function(owner_id)
    local offset = math.random(1, 15000)
    local body = vkuser_config.."count=1&offset="..offset.."&owner_id="..owner_id

    local res = httpc:post(wall.get, body)
    local data = rapidjson.decode(res.body).response

    if #data.items == 0 then
        offset = math.random(data.count)
        body = vkuser_config.."count=1&offset="..offset.."&owner_id="..owner_id
        
        res = httpc:post(wall.get, body)
        data = rapidjson.decode(res.body).response
    end

    local post = "wall"..data.items[1].from_id.."_"..data.items[1].id
    return post
end

random.getPhoto = function(owner_id, album)
    local offset = math.random(65535)
    local body = vkuser_config.."count=1&offset="..offset.."&owner_id="..owner_id

    local res = httpc:post(photos.get, body)
    local data = rapidjson.decode(res.body).response

    if #data.items == 0 then
        offset = math.random(data.count)
        body = vkuser_config.."count=1&offset="..offset.."&owner_id="..owner_id

        res = httpc:post(wall.get, body)
        data = rapidjson.decode(res.body).response
    end

    local photo = "photo"..data.items[1].owner_id.."_"..data.items[1].id
    local text = data.items[1].text
    return photo, text
end

random.getVideo = function(owner_id)
    local offset = math.random(9999)
    local body = vkuser_config.."count=1&offset="..offset.."&owner_id="..owner_id

    local res = httpc:post(video.get, body)
    local data = rapidjson.decode(res.body).response

    if #data.items == 0 then
        offset = math.random(data.count)
        body = vkuser_config.."count=1&offset="..offset.."&owner_id="..owner_id

        res = httpc:post(video.get, body)
        data = rapidjson.decode(res.body).response
    end

    local video = "video"..data.items[1].owner_id.."_"..data.items[1].id
    return video
end
-- //

return {
    message = message;
    random = random
}