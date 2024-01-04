// Monarch syntax highlighting for the my-dsl language.
export default {
    keywords: [
        'Boolean','CM','Forward','KM','List','MM','Number','Rotate','Say','Throw','Void','Wait','and','break','else','false','for','if','not','null','or','return','true','while'
    ],
    operators: [
        '*','+',',','-','/',';','<','=','==','>'
    ],
    symbols: /\(|\)|\*|\+|,|-|\/|;|<|=|==|>|\[|\]|\{|\}/,

    tokenizer: {
        initial: [
            { regex: /(\^?(([a-z]|[A-Z])|_)((([a-z]|[A-Z])|_)|[0-9])*)/, action: { cases: { '@keywords': {"token":"keyword"}, '@default': {"token":"string"} }} },
            { regex: /[0-9]+/, action: {"token":"number"} },
            { regex: /("((\\([\s\S]))|((?!(((\\|")|\n)|\r))[\s\S]*?))*(("|\n)|\r))/, action: {"token":"string"} },
            { include: '@whitespace' },
            { regex: /@symbols/, action: { cases: { '@operators': {"token":"operator"}, '@default': {"token":""} }} },
        ],
        whitespace: [
            { regex: /\/\*/, action: {"token":"comment","next":"@comment"} },
            { regex: /(\/\/((?!(\n|\r))[\s\S]*?)(\r?\n)?)/, action: {"token":"comment"} },
            { regex: /((( |	)|\r)|\n)+/, action: {"token":"white"} },
            { regex: /([\s\S])/, action: {"token":"white"} },
        ],
        comment: [
            { regex: /[^/\*]+/, action: {"token":"comment"} },
            { regex: /\*\//, action: {"token":"comment","next":"@pop"} },
            { regex: /[/\*]/, action: {"token":"comment"} },
        ],
    }
};
