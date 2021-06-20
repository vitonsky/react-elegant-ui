Directory contains sources of docs site for project.

Site use latest version of library and show example of use UI kit.

It also need to make abstraction from git hosting.

This site may use some hacks and bad examples of code, then it is not good example of use library and you should not reference to it in your issues.

## Roadmap

- [ ] Fix anchors. At this time its may repeat ids. Must use hierarchy like `header-subHeader-subHeader2` or short hash of it as prefix
- [ ] Add pages with API for each component
- [ ] Add examples with knobs (or without)

### Low priority

- [ ] Improve accessibility
- [ ] Improve layout for smartphones
- [ ] Keep pages as serialized AST instead raw text to improve performance for big pages
- [ ] Use more performance search engine which can highlight search results better
- [ ] Use design tokens instead values in CSS
- [ ] Replace library for highlight code to more beauty. Good if it can split code to lines with numbers
