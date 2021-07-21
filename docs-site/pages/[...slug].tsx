/**
 * This file define pages with static routing
 */

import React, { FC, useMemo } from 'react';
import {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	GetStaticPathsResult,
} from 'next';
import { useRouter } from 'next/router';
import Header from 'next/head';
import getConfig from 'next/config';

import cfg from '../config';
import { indexPage, routes } from '../routes';
import { getAllPagesPaths } from '../pages';

import { getPageData } from '../lib/pages/getPageData';

import { Layout } from '../components/Layout/Layout';
import { NavEntry, Navigation } from '../components/Navigation/Navigation';
import { MarkdownPage } from '../components/MarkdownPage/MarkdownPage';
import { Divider } from '../components/Divider/Divider';

const { publicRuntimeConfig } = getConfig();

type DocPage = {
	title: string | null;
	date?: number;
	text: string;

	// TODO: use nav object instead prop
	navigation: NavEntry[];
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths: GetStaticPathsResult['paths'] = [];

	const docPagesPaths = await getAllPagesPaths();
	docPagesPaths.forEach(({ slug }) => {
		paths.push({ params: { slug } });
	});

	return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps<DocPage> = async (context) => {
	// Check params
	if (context.params === undefined || !Array.isArray(context.params.slug)) {
		throw new Error('Invalid params');
	}

	const slug = context.params.slug;
	const currentUrl = '/' + (slug.length === 0 ? 'index' : slug.join('/'));

	const docPagesPaths = await getAllPagesPaths();

	// Find page path by url
	const page = docPagesPaths.find(({ url }) => url === currentUrl);
	if (page === undefined) {
		throw new Error('Page not found');
	}

	// Parse page file and return data
	const { title, text, date } = await getPageData(page.absolutePath, {
		root: cfg.root,
	});

	return {
		props: {
			title,
			date,
			text,
			navigation: routes,
		},
	};
};

const DocPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
	const { text, date, title, navigation } = props;

	// Due to SSR we have to use router instead `location`
	const router = useRouter();
	const currentPath =
		router.query.slug === undefined
			? '/'
			: '/' +
			  (Array.isArray(router.query.slug)
			  	? router.query.slug.join('/')
			  	: router.query.slug);

	const renderedNav = useMemo(() => {
		let activePage = currentPath;

		// Handle special cases
		if (currentPath === '/' || currentPath === '/docs') {
			activePage = '/' + indexPage;
		}

		return <Navigation active={activePage}>{navigation}</Navigation>;
	}, [navigation, currentPath]);

	const pageTitle = publicRuntimeConfig.title + (title ? ' - ' + title : '');

	return (
		<Layout
			nav={renderedNav}
			// footer={
			// 	<>
			// 		Source on <Link href="#">Github</Link>
			// 	</>
			// }
		>
			<Header>
				<title>{pageTitle}</title>
			</Header>
			<MarkdownPage>{text}</MarkdownPage>

			{date ? (
				<>
					<Divider size="l" />
					<div>{new Date(date).toDateString()}</div>
				</>
			) : undefined}
		</Layout>
	);
};

export default DocPage;
