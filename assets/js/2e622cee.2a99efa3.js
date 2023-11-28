"use strict";(self.webpackChunkdocs_site=self.webpackChunkdocs_site||[]).push([[393],{1209:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var t=i(5893),s=i(1151);const o={},r="Contributing rules",a={id:"Contributing/ContributingRules",title:"Contributing rules",description:"If you find bug or you have good ideas, please make issue on Github.",source:"@site/../docs/Contributing/ContributingRules.md",sourceDirName:"Contributing",slug:"/Contributing/ContributingRules",permalink:"/react-elegant-ui/Contributing/ContributingRules",draft:!1,unlisted:!1,editUrl:"https://github.com/vitonsky/react-elegant-ui/tree/master/docs/../docs/Contributing/ContributingRules.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Individual contributor license agreement",permalink:"/react-elegant-ui/Contributing/CLA"},next:{title:"About",permalink:"/react-elegant-ui/"}},l={},c=[{value:"PR rules",id:"pr-rules",level:2},{value:"Scope of usage",id:"scope-of-usage",level:3},{value:"Breaking changes",id:"breaking-changes",level:3},{value:"New features",id:"new-features",level:3},{value:"Unify",id:"unify",level:3},{value:"Commit rules",id:"commit-rules",level:2}];function u(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"contributing-rules",children:"Contributing rules"}),"\n",(0,t.jsx)(n.p,{children:"If you find bug or you have good ideas, please make issue on Github."}),"\n",(0,t.jsx)(n.p,{children:"Before do it, you should check exists issues, maybe your idea/bug already exist."}),"\n",(0,t.jsx)(n.h2,{id:"pr-rules",children:"PR rules"}),"\n",(0,t.jsx)(n.p,{children:"You can make pull request (PR), but if your PR have big changes, in first you should discuss it in issues, because maybe we already fix it or planned work on it."}),"\n",(0,t.jsx)(n.p,{children:"Before making PR, check exists PRs, maybe it already resolved."}),"\n",(0,t.jsxs)(n.p,{children:["Before send your changes you must read ",(0,t.jsx)(n.code,{children:"CONTRIBUTING.md"})," in root directory of repository and accept rules."]}),"\n",(0,t.jsx)(n.p,{children:"Common rules:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Write in detail about your work in PR description with examples if it possible"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Your PR should change only one thing and shouldn't affect to other exists library components"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Follow the ",(0,t.jsx)(n.a,{href:"/react-elegant-ui/Component%20development/Introduction",children:"component development rules"})," while write code"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Comment your code. It help for all to understand and maintain your code"}),"\n",(0,t.jsx)(n.p,{children:"This is especially important for hacks and unobvious code"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Use readable names for variables, functions, classes, etc."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Follow the commit rules bellow"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Your changes also must follow next rules"}),"\n",(0,t.jsx)(n.h3,{id:"scope-of-usage",children:"Scope of usage"}),"\n",(0,t.jsx)(n.p,{children:"Your contributions in this repo must be for common usage, for many cases."}),"\n",(0,t.jsx)(n.p,{children:"For example, PR with change color of button will reject, cuz users can change color in their projects, it not required changes on library level."}),"\n",(0,t.jsx)(n.p,{children:"We can't add features for all cases at least because every feature require maintain."}),"\n",(0,t.jsx)(n.p,{children:"If we can't accept your changes due to not common scope, please, don't be upset and make library that have this library as peer dependency and implement your feature there. It will good for all and you can collect features for your scope in your own library."}),"\n",(0,t.jsx)(n.p,{children:"Scoped addons can be useful for you and other people, but not make maintain of this library harder. You can tag us in npm and make issue with description of your addon package and we tell about it."}),"\n",(0,t.jsx)(n.h3,{id:"breaking-changes",children:"Breaking changes"}),"\n",(0,t.jsx)(n.p,{children:"Before write code with breaking changes you must make issue for discuss this."}),"\n",(0,t.jsx)(n.p,{children:"We can accept that changes, but only if you can proof that it useful changes which improve library."}),"\n",(0,t.jsx)(n.p,{children:"If you want make changes that break many things, it's not problem, but please, write detail migration guide before this for we can estimate cost of this changes and find good time for accept."}),"\n",(0,t.jsx)(n.h3,{id:"new-features",children:"New features"}),"\n",(0,t.jsx)(n.p,{children:"When you want to add new features to exists components, you must not change this components."}),"\n",(0,t.jsx)(n.p,{children:"Instead this just add wrapper or alternative implementation of object which implement interface of original."}),"\n",(0,t.jsx)(n.h3,{id:"unify",children:"Unify"}),"\n",(0,t.jsx)(n.p,{children:"If you can't extend exists object and you sure that it can be unify, you can make issue for discuss this changes and if we decide that this changes is required for common usage, then changes will accept and you can implement your feature."}),"\n",(0,t.jsx)(n.p,{children:"When you find problems with unify of interfaces or implementations of components and make issue about it, you very help to unify components."}),"\n",(0,t.jsx)(n.p,{children:"Some components can't be unify for all cases, but we must seek to it and keep balance between unify and size of implementation. Cuz when user can't use implementation for own features, user will make own implementation and this should be easy for him."}),"\n",(0,t.jsx)(n.h2,{id:"commit-rules",children:"Commit rules"}),"\n",(0,t.jsxs)(n.p,{children:["Use ",(0,t.jsx)(n.a,{href:"https://www.conventionalcommits.org/en/v1.0.0/",children:"conventional commits"})," rules."]}),"\n",(0,t.jsx)(n.p,{children:"The commit message should be structured as follows:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"<type>[optional scope]: <description>\n\n[optional body]\n"})}),"\n",(0,t.jsx)(n.p,{children:"Commit types"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"fix"}),"\n",(0,t.jsx)(n.li,{children:"feat"}),"\n",(0,t.jsx)(n.li,{children:"test"}),"\n",(0,t.jsx)(n.li,{children:"refactor"}),"\n",(0,t.jsx)(n.li,{children:"docs"}),"\n",(0,t.jsx)(n.li,{children:"chore"}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>r});var t=i(7294);const s={},o=t.createContext(s);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);