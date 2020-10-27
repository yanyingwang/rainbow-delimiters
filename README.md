# Rainbow Delimiters
<strong>A web browser plugin to colorize the matched brackets of source code on HTML pages</strong>, it is especially useful for source code of a Lisp-family dialect Lang.

Because of its trying to be analogous of Emacs's [rainbow-delimiters-mode](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwil_rqGhdTsAhVBBKYKHZTSAtAQFjACegQIBRAC&url=https%3A%2F%2Fwww.emacswiki.org%2Femacs%2FRainbowDelimiters&usg=AOvVaw3znaXBk8GEjEjPYg0t1VIZ) in some way, this package is straightly named "Rainbow Delimiters".

This add-ons could also be very useful as well as when you are going through code files of one repo from a website like github.com and checking a piece of source code of someone's answer from stackoverflow.com.

# Install
1. Chorme: Open `chrome://extensions/` and enable the developer mode, and then, click to load the directory of this repo.
2. Firefox: Directly click [this link](https://addons.mozilla.org/zh-CN/firefox/addon/rainbow-delimiters) and install it.


# appearance when this plugin was administered:
![github-com-racket-lang](https://raw.githubusercontent.com/yanyingwang/rainbow-delimiters/main/screenshot/github-com.gif)


# Explaination
Currently, this plugin will only be automatically enabled for links of websites below:
1. `https://docs.racket-lang.org/*`
2. `file:///Applications/Racket v*/*` (<= when you view racket doc with `raco doc` cmd.)
3. `http://github.com/*`
4. `https://stackoverflow.com/*`


# TODO
- [x] 1. () [] {} using the same depth loop.
- [x] 2. racket-color renamed with racket-depth.
- [x] 3. test it to work with gitlab, stackoverflow.
- [ ] 4. a way to be enabled for an unautomically enabled website.
- [ ] 5. make bracket colors customized.
- [ ] 6. only highlight matched bracket of current hovered bracket instead of showing all the same level depth brackets.
- [ ] 7. support https://*.wikipedia.org/** pre div


# dev build for publishing to a browser plugin
~~~shell
zip -r -FS ../rainbow-delimiters.zip * --exclude '*.git*' '.*' '*__MACOSX/*' 'images-back*'  'LICENSE' 'screenshot/*' '*.DS_Store'
tar -czvf rainbow-delimiters.tar.gz rainbow-delimiters
~~~
