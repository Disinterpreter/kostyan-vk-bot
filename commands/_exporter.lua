local lfs = require "lfs"
local rex = require "rex_pcre"

local path = "./commands/"
local this = "_exporter.lua"

local commands = {}

-- Сборка всех команд
print(" ")
print("Obtaining files ...")
local counter = 0
local fcounter = 0
for file in lfs.dir(path) do
    if lfs.attributes(path..file, "mode") == "file" then
        if file ~= this then
            local files = {}
            for ext in rex.gmatch(file, "(\\.\\S*)") do
                local name = rex.gsub(file, "(\\.\\S*)", "")
                table.insert(files, {name, ext})
            end
            for i, item in ipairs(files) do
                if item[2] == ".lua" then
                    print("... Loading "..file)
                    counter = counter + 1
                    table.insert(commands, require(path..item[1]))
                else
                    print("Warning: Found non-lua file: "..file)
                    fcounter = fcounter + 1
                end
            end
        end
    end
end
print("Loaded "..counter.." commands!")
print("Ignored "..fcounter.." files.")
print(" ")

-- //

return commands