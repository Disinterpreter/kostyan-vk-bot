local rapidjson = require "rapidjson"
local Bot       = require "api/botapi"

local commands  = require "commands/_exporter"
local config    = rapidjson.load("config.json")

local bot = Bot.new(config.name, config.publicid) -- создание бота

for i, item in ipairs(commands) do
    bot:addAction(item)
end

return bot