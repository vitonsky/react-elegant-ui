import Component from './[...slug]';

import { getStaticProps as getStaticPropsOrigin } from './[...slug]';

export const getStaticProps: typeof getStaticPropsOrigin = () =>
	getStaticPropsOrigin({ params: { slug: ['index'] } });

export default Component;
