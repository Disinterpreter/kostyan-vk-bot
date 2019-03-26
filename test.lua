local rapidjson = require('rapidjson')

local value = {
    attribute = 42,
    'foo',
    37,
}

local s = rapidjson.encode(value)
print (s)