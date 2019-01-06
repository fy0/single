import baseMarked from 'marked'
import Prism from 'prismjs'
// import "prismjs/themes/prism-okaidia.css" ..备选1
import 'prismjs/themes/prism-tomorrow.css'
// import './assets/css/prism-atom-dark.css'

import 'prismjs/components/prism-autohotkey.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-batch.js'
import 'prismjs/components/prism-c.js'
import 'prismjs/components/prism-clike.js'
import 'prismjs/components/prism-cpp.js'
import 'prismjs/components/prism-csharp.js'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-css-extras.js'
import 'prismjs/components/prism-git.js'
import 'prismjs/components/prism-glsl.js'
import 'prismjs/components/prism-go.js'
import 'prismjs/components/prism-ini.js'
import 'prismjs/components/prism-java.js'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/components/prism-lua.js'
import 'prismjs/components/prism-markdown.js'
import 'prismjs/components/prism-python.js'
import 'prismjs/components/prism-ruby.js'
import 'prismjs/components/prism-sql.js'
import 'prismjs/components/prism-nginx.js'

// prism 默认包含高亮：
// ["extend", "insertBefore", "DFS", "markup", "xml", "html", "mathml", "svg", "css", "clike", "javascript", "js"]

let renderer = new baseMarked.Renderer()

renderer.code = function (code, lang, escaped) {
    if (lang === 'rb') lang = 'ruby'
    if (lang === 'py') lang = 'python'
    if (lang === 'js') lang = 'javascript'

    if (this.options.highlight) {
        var out = this.options.highlight(code, lang)
        // 这里存在问题，对部分简单代码来说 out === code 是完全可能的
        // 但是 escape 之后代价就是例如空格转换成%20，用户看来是成了乱码
        // if (out != null && out !== code) {
        if (out != null) {
            escaped = true
            code = out
        }
    }

    if (!escaped) {
        let langText = this.options.langPrefix + escape(lang, true)
        return `<pre class="${langText}"><code class="${langText}">` +
        code + '\n</code></pre>\n'
    }

    let langText = this.options.langPrefix + escape(lang, true)
    return `<pre class="${langText}"><code class="${langText}">` +
        (escaped ? code : escape(code, true)) +
        '\n</code></pre>\n'
}

// 这是为了在 renderer 中获取 parser 实例继而获得当前 token 所做的 hack
baseMarked.Parser.parse = function (src, options) {
    let parser = new baseMarked.Parser(options)
    parser.renderer.headingCount = undefined
    parser.renderer._parser = parser
    return parser.parse(src)
}

let myOpt = {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    sanitize: true,
    smartLists: true,
    smartypants: true,
    headerIds: true,
    headerPrefix: 'til-', // topic index link
    langPrefix: 'language-',
    highlight: function (code, lang) {
        if (lang) {
            let stdlang = lang.toLowerCase()
            if (Prism.languages[stdlang]) {
                return Prism.highlight(code, Prism.languages[stdlang])
            }
        }
    }
}

export function marked (text, options, callback) {
    // 文章编辑页面的simplemde会覆盖掉marked的设置
    baseMarked.setOptions(myOpt)
    let html = baseMarked(text, options, callback)
    return html
}
