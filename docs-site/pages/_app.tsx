import React, {
	createContext,
	ReactNode,
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { NextPage } from 'next';
import App, { AppProps } from 'next/app';
import Header from 'next/head';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { cn } from '@bem-react/classname';

import { cnTheme } from 'react-elegant-ui/theme';
import { theme as darkTheme } from 'react-elegant-ui/theme/presets/dark';
import { theme as defaultTheme } from 'react-elegant-ui/theme/presets/default';

import { UIDContext } from 'react-elegant-ui/hooks/useUniqueId';
// import { Button } from 'react-elegant-ui/components/Button/Button.bundle/desktop';
import { Select } from 'react-elegant-ui/components/Select/Select.bundle/desktop';
import { Spinner } from 'react-elegant-ui/components/Spinner/Spinner.bundle/desktop';

import { classList } from '../lib/DOM';

import { BaseLink } from '../components/Link/Link';
import { Search } from '../components/Search/Search';

import './App.css';

type DocsPage = {
	pages: {
		title: string;
		path: string;
	}[];
};

type AppContextProps = {
	root?: RefObject<HTMLElement>;
};

export const AppContext = createContext<AppContextProps>({});

const cnApp = cn('App');

const themesMap = { light: defaultTheme, dark: darkTheme };

const { publicRuntimeConfig } = getConfig();

const headerLinks: { title: string; url: string }[] = [
	{
		url: '/docs',
		title: 'Docs',
	},
	// {
	// 	url: '#',
	// 	title: 'Examples'
	// },

	...(publicRuntimeConfig.repo
		? [
			{
				url: publicRuntimeConfig.repo,
				title: 'Source',
			},
		  ]
		: []),
];

const Application: NextPage<AppProps<{ nav: number }>, DocsPage> = (props) => {
	const { Component, pageProps } = props;

	const [theme, setTheme] = useState<keyof typeof themesMap>('light');
	const rootRef = useRef<HTMLDivElement>(null);

	const contextValue = useMemo(() => ({ root: rootRef }), []);

	// Init theme
	useEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme !== null && theme in themesMap) {
			setTheme(theme as keyof typeof themesMap);
		}
	}, []);

	const changeTheme = useCallback((value: string | string[] | undefined) => {
		if (typeof value === 'string' && value in themesMap) {
			localStorage.setItem('theme', value);
			setTheme(value as keyof typeof themesMap);
		}
	}, []);

	// Spinner
	const [isLoading, setIsLoading] = useState(false);
	const { events } = useRouter();

	useEffect(() => {
		const on = () => setIsLoading(true);
		const off = () => setIsLoading(false);

		events.on('routeChangeStart', on);
		events.on('routeChangeComplete', off);

		return () => {
			events.off('routeChangeStart', on);
			events.off('routeChangeComplete', off);
		};
	}, [events]);

	return (
		<UIDContext.Provider value={{ id: 'default', counter: 0 }}>
			<Header>
				<link
					rel="shortcut icon"
					type="image/jpg"
					href="/logo-simple.svg"
				/>
			</Header>
			<AppContext.Provider value={contextValue}>
				<div
					className={cnApp(null, [cnTheme(themesMap[theme])])}
					ref={rootRef}
				>
					<div className={cnApp('Header')}>
						<div className={cnApp('Container')}>
							<BaseLink
								href="/"
								className={classList(
									cnApp('Logo'),
									cnApp('HeaderLink'),
								)}
							>
								<img src="/logo-simple.svg" />
							</BaseLink>

							<div className={cnApp('LinkBar')}>
								{headerLinks.reduce(
									(acc, { url, title }, idx, arr) => {
										// Add link
										acc.push(
											<BaseLink
												key={'link-' + idx}
												href={url}
												className={cnApp('HeaderLink')}
											>
												{title}
											</BaseLink>,
										);

										// Insert divider
										if (arr.length - 1 > idx) {
											acc.push(
												<span
													key={'divider-' + idx}
													className={cnApp(
														'InlineDivider',
													)}
												/>,
											);
										}
										return acc;
									},
									[] as ReactNode[],
								)}
							</div>

							<div
								className={cnApp('HeadContainer', {
									position: 'right',
									horizontalIndent: true,
								})}
							>
								<div className={cnApp('ThemePicker')}>
									{'theme: '}
									<span>
										<Select
											options={Object.keys(themesMap).map(
												(key) => ({
													id: key,
													content: key,
												}),
											)}
											value={theme}
											setValue={changeTheme}
										/>
									</span>
								</div>

								<div className={cnApp('Search')}>
									<Search />
								</div>
							</div>
						</div>
					</div>
					<div className={cnApp('Layout')}>
						<div className={cnApp('Container')}>
							<Component {...pageProps} />
						</div>
					</div>
					<Spinner
						view="primitive"
						progress={isLoading}
						className={cnApp('Spinner')}
					/>
				</div>
			</AppContext.Provider>
		</UIDContext.Provider>
	);
};

Application.getInitialProps = async (ctx) => {
	const appProps = await App.getInitialProps(ctx as any);

	// const pages = await Promise.all(
	// 	pageData.map(async ({ path }) => {
	// 		const { title } = await getPageData(path);

	// 		return { title: title ?? path, path };
	// 	}),
	// );

	return { ...appProps, pages: [] };
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default Application;
