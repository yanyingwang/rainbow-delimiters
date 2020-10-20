# Rainbow Delimiters
A chrome plugin to colorize the matched brackets of source code.


# Usage
racket website:
![racket](https://raw.githubusercontent.com/yanyingwang/rainbow-delimiters/main/screenshot/docs-racket-lang-org.gif)

github website:
![github](https://raw.githubusercontent.com/yanyingwang/rainbow-delimiters/main/screenshot/github-com.gif)


# How to load
Open `chrome://extensions/` and enable the developer mode, and then, click to load the directory of this repo.


# Explaination
this plugin will be automatically enabled for links of website below:
1. `https://docs.racket-lang.org/*`
2. `file:///Applications/Racket v*/*` (<= when you view racket doc with `raco doc` cmd.)
3. `http://github.com/*`

# TODO
- [x] 1. () [] {} using the same depth loop.
- [x] 2. racket-color renamed with racket-depth.
- [x] 3. test it to work with gitlab, stackoverflow.
- [ ] 4. a way to be enabled for an unautomically enabled website.
- [ ] 5. make bracket colors customized.
- [ ] 6. only highlight matched bracket of current hovered bracket instead of showing all the same level depth brackets.