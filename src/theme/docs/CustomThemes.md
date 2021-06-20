## Make custom theme

This guide explain how to make theme for default build tool.

Design system of this library based on [design tokens](https://css-tricks.com/what-are-design-tokens/) and use [themekit](https://github.com/bem/themekit) to build it.

The themekit is just conveniently wrapper over [style-dictionary](https://amzn.github.io/style-dictionary/#/formats) tool and it use to make from design tokens a css files with classes which contains a css variables. You can use any other tool if you wish.

Component directories contains a token files with variables used by component.

Component tokens may use common tokens. Directory `Theme/tokens` contains a common tokens.

The theme it's just config file for build tool (themekit) which define a used tokens and order of it applying.

### Install tool

`npm i -DE @yandex/themekit`

### Make file structure for theme and tokens

- theme
  - default
    - `default.theme.json` - theme config
  - tokens
    - `project.tokens.yml` - redefinition tokens

### Make tool config

Make file `themekit.config.json`

```json
{
	"entry": {
		"default": "./themes/default.theme.json" // name and path to your theme
	},
	"output": {
		"css": {
			"buildPath": "./themes", // output directory
			"transforms": ["name/cti/kebab"],
			"files": [
				{
					"destination": "[entry]/root.css", // path to theme file
					"format": "css/variables", // theme format (1)
					"options": {
						"selector": ".Theme_root_[entry]"
					}
				}
			]
		}
	}
}
```

- (1) More info about format in [style-dictionary docs](https://amzn.github.io/style-dictionary/#/formats)
- For get more info about configuration, see [themekit docs](https://github.com/bem/themekit)

### Configure theme

Make file like `your_theme_name_here.theme.json` in theme directory.

Example of config this

```json
{
	"extends": "react-elegant-ui/theme/themes/default.theme.json",
	"sources": ["./tokens/*.tokens.yml"]
}
```

For get more info about configuration, see [themekit docs](https://github.com/bem/themekit)

### Define tokens

You can use JSON or YML formats.

```yml
button:
  size:
    s:
      fontSize:
        value: 15px
      lineHeight:
        value: 40px
      height:
        value: 40px
```

With collisions, objects will merged and redefine old values.

### Build theme

`npx themekit build`

### Include css files

If you use filters and have several css files for theme, you should make preset.

```TS
import { ThemeWhitepaper } from 'react-elegant-ui/theme';
import './color.css';
import './root.css';

export const theme: ThemeWhitepaper = {
	color: 'default',
	root: 'default',
};
```

If you have only one file then you can just import it.

```TS
import './themes/default/root.css';
```

For more usage examples see [themekit examples](https://github.com/bem/themekit/tree/master/examples).

### Naming of token files

Token files named by pattern `name-type.tokens.yml` where:

- `name` replace to theme name, for example `brand`, `project-light`, etc.
- `type` replaced to `color`, `typography` or `patch`, depending on content

If need - type may be skipped and name as `name.tokens.yml`

Types list

- `color` to theme colors
- `typography` to define font family, font and indent sizes and other
- `transition` contains animations details
- `patch` to redefine component tokens
