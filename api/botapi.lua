local utf8 = require "lua-utf8"
--local rex  = require "rex_pcre"

local Bot = { }

function Bot.new(callname, link) -- конструктор бота
    local obj = {}
    obj.buffer = {}
    obj.ignore_list = {}
    obj.fast_response = {}
    obj.callname = utf8.lower(callname)
    obj.dog = "["..link.."|"..obj.callname.."]"

    setmetatable(obj, {__index = Bot}) 
    return obj
end

function Bot:addAction(obj) -- регистрация хендлера
    table.insert(self.buffer, {obj, obj.keywords})
end

function Bot:onMessage(data) -- обработчик входящих сообщений
    if data.type ~= "message_new" then return end

    print(" ")
    print("GOT "..data.object.text)
    
    data.object.text = utf8.lower(data.object.text) -- преобразование всей строки в нижний регистр

    -- Поиск обращения к боту    
    local cmd = ""
    local args = ""
     
    local words = {}
    for word in utf8.gmatch(data.object.text, "%S+") do table.insert(words, word) end

    if words[1] ~= self.callname and words[1] ~= self.dog then -- проверка на обращение к боту
        return
    end

    print("PASSED")

    if #words > 1 then -- пропускается, если команд и аргументов нет
        cmd = words[2]
        if #words > 2 then
            args = words
            table.remove(args, 1)
            table.remove(args, 1)
        end
    end
    -- //

    for i, item in ipairs(self.buffer) do
        for i, word in ipairs(item[2]) do -- перебор буфера команд бота
            if cmd == word then -- поиск совпадений
                if item[1].process then
                    print("PROCESSING")
                    print(" ")
                    item[1].process(data.object, args, cmd)
                    return
                end
            end
        end
    end

end

return Bot