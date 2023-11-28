"use strict";(self.webpackChunkdocs_site=self.webpackChunkdocs_site||[]).push([[387],{2145:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>a});var o=t(5893),s=t(1151);const i={},c="Component anatomy",r={id:"Introduction/ComponentArchitecture",title:"Component anatomy",description:"Component it's essence which implement a some functional of user interface.",source:"@site/../docs/Introduction/ComponentArchitecture.md",sourceDirName:"Introduction",slug:"/Introduction/ComponentArchitecture",permalink:"/react-elegant-ui/Introduction/ComponentArchitecture",draft:!1,unlisted:!1,editUrl:"https://github.com/vitonsky/react-elegant-ui/tree/master/docs/../docs/Introduction/ComponentArchitecture.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"About",permalink:"/react-elegant-ui/"},next:{title:"Component file structure",permalink:"/react-elegant-ui/Introduction/ComponentFileStructure"}},l={},a=[{value:"Structure and bundles",id:"structure-and-bundles",level:2},{value:"Block",id:"block",level:3},{value:"Elements",id:"elements",level:3},{value:"Modifiers",id:"modifiers",level:3},{value:"Design tokens",id:"design-tokens",level:2},{value:"Dependency registries",id:"dependency-registries",level:2},{value:"Assets",id:"assets",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"component-anatomy",children:"Component anatomy"}),"\n",(0,o.jsx)(n.p,{children:"Component it's essence which implement a some functional of user interface."}),"\n",(0,o.jsx)(n.p,{children:"For flexibility purposes components split to many modules and have high abstraction."}),"\n",(0,o.jsx)(n.p,{children:"This architecture allows build components only with necessary features and very easy implement addon features for exists modules or replace modules."}),"\n",(0,o.jsx)(n.p,{children:"Each essence must have interface which it implement. Interface is primary"}),"\n",(0,o.jsx)(n.h2,{id:"structure-and-bundles",children:"Structure and bundles"}),"\n",(0,o.jsxs)(n.p,{children:["Components developed by ",(0,o.jsx)(n.a,{href:"https://en.bem.info/methodology/",children:"BEM methodology"})," and split to Block, Elements and Modifiers.\nTo use component, you have to build it with necessary features (Block, Elements and Modifiers)."]}),"\n",(0,o.jsx)(n.p,{children:'That builds named a "bundles" and by default each component have at least 1 bundle with all features (except some very simply helper components).'}),"\n",(0,o.jsx)(n.p,{children:"You can use it for test components, but for production you should build your own bundles to decrease application bundle size and maybe use your own features."}),"\n",(0,o.jsx)(n.h3,{id:"block",children:"Block"}),"\n",(0,o.jsx)(n.p,{children:"Block it's main part of component which contains a must common logic"}),"\n",(0,o.jsx)(n.h3,{id:"elements",children:"Elements"}),"\n",(0,o.jsx)(n.p,{children:"Elements it's components exists only inside block"}),"\n",(0,o.jsx)(n.h3,{id:"modifiers",children:"Modifiers"}),"\n",(0,o.jsx)(n.p,{children:"Modifiers it's HOCs that define optional functional of block"}),"\n",(0,o.jsx)(n.h2,{id:"design-tokens",children:"Design tokens"}),"\n",(0,o.jsx)(n.p,{children:"Design tokens contains a colors, sizes, typography and other values of component styles."}),"\n",(0,o.jsxs)(n.p,{children:["Component define a ",(0,o.jsx)(n.a,{href:"/react-elegant-ui/Introduction/Tokens",children:"design tokens"})," which compile to CSS properties that is use in styles of component."]}),"\n",(0,o.jsx)(n.p,{children:"This allows flexible redefine token values and reuse common values like project color or font size."}),"\n",(0,o.jsx)(n.p,{children:"When you make your own elements, you can use exists or define new tokens."}),"\n",(0,o.jsx)(n.h2,{id:"dependency-registries",children:"Dependency registries"}),"\n",(0,o.jsx)(n.p,{children:"To decrease code dependency, objects must don't use other objects directly."}),"\n",(0,o.jsx)(n.p,{children:"For example, while make Block extension which add features to basic block, we must make HOC for basic block and wrap basic block instead make component which use basic block inside."}),"\n",(0,o.jsx)(n.p,{children:"This way allow apply this extension to other implementation of basic block."}),"\n",(0,o.jsx)(n.p,{children:"But, when you need component inside other component, you can use dependency registry."}),"\n",(0,o.jsx)(n.p,{children:"You just use provider to get object by name and still can set any object outside of component."}),"\n",(0,o.jsx)(n.h2,{id:"assets",children:"Assets"}),"\n",(0,o.jsxs)(n.p,{children:["Component may contains some resources such as icons, fonts or shared code. It should be place in directories with clear names. For example ",(0,o.jsx)(n.code,{children:"ComponentName.hocs"}),", ",(0,o.jsx)(n.code,{children:"ComponentName.assets"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"Third-party assets must contains license texts and links to sources."})]})}function u(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>c});var o=t(7294);const s={},i=o.createContext(s);function c(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);