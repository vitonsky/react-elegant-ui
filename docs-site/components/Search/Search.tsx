import {
	FC,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import lunr from 'lunr';

import { useDelayCallback } from 'react-elegant-ui/hooks/useDelayCallback';
import { applyMaxHeight } from 'react-elegant-ui/hooks/behavior/usePopper/modifiers/applyMaxHeight';
import { applyMinWidth } from 'react-elegant-ui/hooks/behavior/usePopper/modifiers/applyMinWidth';
import { useImmutableCallback } from 'react-elegant-ui/hooks/useImmutableCallback';
import { Textinput } from 'react-elegant-ui/components/Textinput/Textinput.bundle/desktop';
import { Popup } from '../Popup/Popup';

import { Link } from '../Link/Link';
import { Divider } from '../Divider/Divider';

import { AppContext } from '../../pages/_app';

import { HighlightPosition, getHighlightedSegments } from './utils';
import style from './Search.module.css';

const searchIndexPath = '/static/searchData/index.json';

type SearchResult = {
	url: string;
	title: string;
	/**
	 * Found segments with relevant text and positions of important words
	 */
	segments: {
		text: string;
		highlight: HighlightPosition[];
	}[];
};

type SearchProps = {
	debounceDelay?: number;
};

export const Search: FC<SearchProps> = ({ debounceDelay = 300 }) => {
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState<string | undefined>('');
	const [searchResult, setSearchResult] = useState<SearchResult[] | null>(
		null,
	);

	const [searchResultOpened, setSearchResultOpened] = useState(false);

	// Init search
	const index = useRef<null | lunr.Index>(null);
	const indexFetch = useRef<null | Promise<void>>(null);

	const updateSearch = useImmutableCallback(async () => {
		const idx = index.current;

		if (idx === null) {
			throw new Error('Empty index');
		} else if (search === undefined) {
			throw new Error('Empty text for search');
		}

		// Search
		let searchResult: lunr.Index.Result[];

		try {
			searchResult = idx.search(search);
		} catch (error) {
			// Ignore query errors
			if (error instanceof lunr.QueryParseError) {
				return;
			} else {
				throw error;
			}
		}

		// Get items data
		const foundItems: SearchResult[] = await Promise.all(
			searchResult.map(({ ref, matchData }) =>
				// Fetch page data
				fetch(encodeURI(ref))
					.then((rsp) => rsp.json())
					// Collect segments with matched words
					.then(({ title, text, url }) => {
						// Collect positions of matched words
						let matchedWordsPositions: HighlightPosition[] = [];
						Object.keys(matchData.metadata).forEach((word) => {
							// NOTE: this object may contain not only matched words, but and any meta data
							const metaObject = (matchData.metadata as any)[
								word
							];

							const positionsInText: HighlightPosition[] =
								metaObject?.text?.position || [];

							// Add positions of found words
							matchedWordsPositions.push(...positionsInText);
						});

						// Sort selections
						// NOTE: probably it unnecessary. It may be removed if affect to performance
						matchedWordsPositions = matchedWordsPositions.sort(
							([from1], [from2]) => from1 - from2,
						);

						const highlightedSegments = getHighlightedSegments(
							text,
							matchedWordsPositions,
						);

						return {
							title,
							url,
							segments: highlightedSegments,
						};
					}),
			),
		);

		setSearchResult(foundItems);
	}, [search, index]);

	const [setCallback] = useDelayCallback();

	useEffect(() => {
		// Close by empty input
		if (search === '') {
			setSearchResultOpened(false);
			return;
		}

		// Debounce handle
		setCallback(async () => {
			// Show result block
			setSearchResultOpened(true);
			setError(null);

			// Fetch index if not loaded
			if (index.current === null) {
				if (indexFetch.current === null) {
					try {
						indexFetch.current = fetch(searchIndexPath)
							.then((rsp) => {
								if (rsp.status !== 200) {
									throw new Error('Status: ' + rsp.status);
								}

								return rsp.json();
							})
							.then((indexObject) => {
								// Set data and clear fetch ref
								index.current = lunr.Index.load(indexObject);
								indexFetch.current = null;
							});

						// Wait loading
						await indexFetch.current;
					} catch (error) {
						indexFetch.current = null;
						setError('Index file is not found');
						return;
					}
				}
			}

			// Update data
			updateSearch();
		}, debounceDelay);
	}, [debounceDelay, search, setCallback, updateSearch]);

	const searchResultContent = useMemo(() => {
		if (error !== null) {
			return <div className={style.SearchResult_view_info}>{error}</div>;
		}

		if (searchResult === null) {
			return (
				<div className={style.SearchResult_view_info}>Search...</div>
			);
		}

		if (searchResult.length === 0) {
			return (
				<div className={style.SearchResult_view_info}>
					Not found. Try to rephrase
				</div>
			);
		}

		const closeByClick = () => setSearchResultOpened(false);

		return (
			<div className={style.SearchResult_view_result}>
				<ul className={style['SearchResult-List']}>
					{searchResult.map(({ url, title, segments }, itemIndex) => {
						// Highlight segments
						const highlightedSegments = segments.map(
							({ text, highlight }) => {
								let highlightedText: ReactNode[] = [];

								if (highlight.length === 0) {
									highlightedText = [text];
								} else {
									// Highlight text
									let textCursor = 0;
									highlight.forEach((pos, idx) => {
										const from = pos[0];
										const to = from + pos[1];

										// Skip positions behind cursor
										if (textCursor > from) return;

										// Skip positions out of text length
										if (text.length - to < 0) return;

										const before = text.slice(
											textCursor,
											from,
										);
										const part = text.slice(from, to);

										// Insert selected text and text before
										highlightedText.push(
											before,
											<span
												className={style.highlight}
												key={idx}
											>
												{part}
											</span>,
										);

										// Update cursor
										textCursor = to;
									});

									// Add end if need
									if (textCursor < text.length) {
										const restText = text.slice(textCursor);
										highlightedText.push(restText);
									}
								}

								return highlightedText;
							},
						);

						return (
							<li
								key={'item-' + itemIndex}
								className={style['SearchResult-Item']}
							>
								<Link
									href={url}
									onClick={closeByClick}
									className={style['SearchResult-ItemTitle']}
								>
									{title}
								</Link>
								{highlightedSegments.length ===
								0 ? undefined : (
										<>
											<Divider />
											<span
												className={
													style['SearchResult-ItemText']
												}
											>
												{highlightedSegments.reduce(
													(acc, item, segmentIndex) => (
														acc.push(
															<div
																key={
																	'segment-' +
																segmentIndex
																}
																className={
																	style[
																		'SearchResult-ItemTextSegment'
																	]
																}
															>
																{item}
															</div>,
														),
														acc
													),
													[],
												)}
											</span>
										</>
									)}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}, [searchResult, error]);

	const inputRef = useRef<HTMLDivElement>(null);
	const { root } = useContext(AppContext);

	// Update position after update content
	const updatePopupRef = useRef<(() => void) | null>(null);
	useEffect(() => {
		const update = updatePopupRef.current;
		if (update !== null) update();
	}, [searchResultContent]);

	return (
		<>
			<Textinput
				placeholder="Search"
				value={search}
				setValue={setSearch}
				onClearClick={() => setSearch('')}
				hasClear
				innerRef={inputRef}
				onClick={() => {
					setSearchResultOpened(!!search);
				}}
				controlProps={{
					autoComplete: 'off',
				}}
			/>
			<Popup
				target="anchor"
				scope={root}
				anchor={inputRef}
				view="default"
				visible={searchResultOpened}
				onClose={() => setSearchResultOpened(false)}
				modifiers={[applyMaxHeight, applyMinWidth]}
				direction={['bottom', 'bottom-end']}
				className={style.SearchResultPopup}
				UNSTABLE_updatePosition={updatePopupRef}
			>
				{searchResultContent}
			</Popup>
		</>
	);
};
