local meme = require "./commands/meme"
local video = require "./commands/video"

return {
    keywords = {"дай", "давай", "где"};
    process = function(data, args, cmd)
        for i, word in ipairs(meme.keywords) do
            if args[1] == word then
                meme.process(data, {cmd})
                return
            end
        end
        for i, word in ipairs(video.keywords) do
            if args[1] == word then
                video.process(data, {cmd})
                return
            end
        end
    end
}