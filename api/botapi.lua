local utf8 = require "lua-utf8"
--local rex  = require "rex_pcre"

local Bot = { }

function Bot.new(callname, link) -- конструктор бота
    local obj = {}
    obj.buffer = {}
    obj.fastres = {}
    obj.ready = true
    obj.storage = {}
    obj.callname = utf8.lower(callname)
    obj.dog = "["..link.."|"..obj.callname.."]"

    setmetatable(obj, {__index = Bot}) 
    return obj
end

function Bot:addAction(obj) -- регистрация хендлера
    for i, keyword in ipairs(obj.keywords) do
        self.buffer[keyword] = obj
    end
end

function Bot:onMessage(data) -- обработчик входящих сообщений

    print("GOT "..data.object.peer_id.." "..data.object.text)
    print(" ")
    if data.type ~= "message_new" then return end
    data.object.text = utf8.lower(data.object.text) -- преобразование всей строки в нижний регистр

    -- Поиск обращения к боту    
    local cmd = ""
    local args = ""
    local force = false

    local words = {}
    for word in string.gmatch(data.object.text, "%S+") do 
        table.insert(words, word) 
    end

    if self.fastres[data.object.peer_id] then
        print("ENTER FASTRES")
        cmd = words[1]
        args = words
        table.remove(args, 1)
        if cmd == self.callname or cmd == self.dog then
            cmd = words[1]
            table.remove(args, 1)
        end
        if not cmd then
            cmd = ""
            print("fastres continued")
        else
            self.fastres[data.object.peer_id] = false
        end
        force = true
        print("OUT FASTRES")
    end

    if not force then
        print("ENTER VALIDATION")
        if words[1] ~= self.callname and words[1] ~= self.dog then -- проверка на обращение к боту
            self.ready = true
            return
        end
        
        if #words > 1 then -- пропускается, если команд и аргументов нет
            cmd = words[2]
            if #words > 2 then
                args = words
                table.remove(args, 1)
                table.remove(args, 1)
            end
        else
            print("fastressed")
            self.fastres[data.object.peer_id] = true
        end
        print("OUT VALIDATION")
    end

    print("PASSED")
    -- //

    local action = self.buffer[cmd]
    if action then
        if action.process then
            print("PROCESSED")
            action.process(data.object, args, cmd)
            print(" ")
        end
    end

end

return Bot

--[[ Старый метод
function Bot:addAction(obj)
    table.insert(self.buffer, {obj, obj.keywords})
end
--]]

    --[[ Старый метод
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
    --]]