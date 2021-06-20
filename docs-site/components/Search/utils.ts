export type HighlightPosition = [number, number];

export const cutStringPretty = (text: string) => {
	const matchEndOfSentence = text.match(/(.+(\n{2,}|[.!]))/);
	if (matchEndOfSentence) return matchEndOfSentence[1];

	const matchCutLastWord = text.match(/(.+)\s+[^\s]+$/);
	if (matchCutLastWord) return matchCutLastWord[1];

	return text;
};

export const removeFirstParagraphBefore = (text: string) => {
	const matchOfSentence = text.match(/.+\n{2,}/);
	if (!matchOfSentence) return text;

	const sentenceBefore = matchOfSentence[0];
	const cuttedText = text.slice(sentenceBefore.length);

	// Return original text if text after cutting make useless empty
	if (cuttedText.trim().length === 0) return text;

	return cuttedText;
};

const isBreakedText = (text: string) => !!text.match(/[a-z][\s\n]*$/);

// TODO: Join highlight of words which separated only by spaces
/**
 * Return highlighted text segments with limited length and positions for highlight word in local segments
 */
export const getHighlightedSegments = (
	text: string,
	selections: HighlightPosition[],
	options?: {
		textLenLimit?: number;
		maxDistanceToJoin?: number;
		addonTextLenLimit?: number;
	},
) => {
	const {
		textLenLimit = 500,
		maxDistanceToJoin = 200,
		addonTextLenLimit = 180,
	} = options || {};

	const matchedSegments: {
		text: string;
		highlight: HighlightPosition[];
	}[] = [];

	let segmentIndex = 0;
	let commonLen = 0;

	// Segment data manager
	const pushSegmentData = <
		T extends typeof matchedSegments extends Array<infer X> ? X : never
	>(
			idx: number,
			{ text, highlight }: Partial<T>,
		) => {
		// Create segment
		if (matchedSegments[segmentIndex] === undefined) {
			matchedSegments[segmentIndex] = {
				text: '',
				highlight: [],
			};
		}

		// Add text and count it
		if (text !== undefined) {
			commonLen += text.length;
			matchedSegments[idx].text += text;
		}

		// Add selection
		if (highlight !== undefined) {
			matchedSegments[idx].highlight.push(...highlight);
		}
	};

	// Iterate selections
	for (
		let selectionIndex = 0;
		selectionIndex < selections.length;
		selectionIndex++
	) {
		const pos = selections[selectionIndex];
		const selectionStartPos = pos[0];
		const selectionEndPos = selectionStartPos + pos[1];
		const selectionLen = pos[1];

		// Stop by overflow length
		if (commonLen >= textLenLimit) {
			// Add trailing `...` for break by limit
			const currentSegment = matchedSegments[segmentIndex];
			if (currentSegment && isBreakedText(currentSegment.text)) {
				pushSegmentData(segmentIndex, { text: '...' });
			}

			break;
		}

		// Init segment if need
		if (matchedSegments[segmentIndex] === undefined) {
			let segmentText = '';

			// Get text before for init segment
			const wordsBefore = text.slice(0, selectionStartPos).split(' ');

			// Iterate words from end to start
			for (let i = wordsBefore.length - 1; i >= 0; i--) {
				const word = wordsBefore[i];

				if (segmentText.length + word.length + 1 > addonTextLenLimit) {
					// Break when text to add too large. Even if `segmentText` empty
					break;
				} else {
					// Add word
					segmentText = word + ' ' + segmentText;
				}
			}

			const segmentLen = segmentText.length;

			segmentText = removeFirstParagraphBefore(segmentText);

			// Add `...` before for text which start not from big char
			if (
				segmentText.length > 0 &&
				segmentText.length === segmentLen &&
				!segmentText.match(/^[\s\n]*[A-Z]/)
			) {
				segmentText = '...' + segmentText.trimLeft();
			}

			const initText = segmentText;

			// Update common length
			pushSegmentData(segmentIndex, { text: initText });
		}

		// Add selected text and selection position relative text of segment
		const selectedText = text.slice(selectionStartPos, selectionEndPos);

		const currentSegment = matchedSegments[segmentIndex];
		const selectionStartPosInSegment =
			selectionStartPos -
			(selectionStartPos - currentSegment.text.length);

		pushSegmentData(segmentIndex, {
			text: selectedText,
			highlight: [[selectionStartPosInSegment, selectionLen]],
		});

		// Look ahead to decide should i change segment or not
		let isChangeSegment = false;
		const nextPos = selections[selectionIndex + 1];
		if (nextPos !== undefined) {
			const distanceToNextPos = nextPos[0] - selectionEndPos;
			if (
				distanceToNextPos > 0 &&
				distanceToNextPos > maxDistanceToJoin
			) {
				// Change segment to prevent join
				isChangeSegment = true;
			}
		}

		if (isChangeSegment) {
			// Add text after
			let textAfter = cutStringPretty(
				text.slice(
					selectionEndPos,
					selectionEndPos + addonTextLenLimit,
				),
			).trimEnd();

			if (isBreakedText(textAfter)) {
				textAfter += '...';
			}

			pushSegmentData(segmentIndex, { text: textAfter });
		} else {
			const isLastPart = nextPos === undefined;

			// Add text before next selected part
			let textAfter = text.slice(
				selectionEndPos,
				!isLastPart ? nextPos[0] : selectionEndPos + addonTextLenLimit,
			);

			if (isLastPart && isBreakedText(textAfter)) {
				textAfter += '...';
			}

			pushSegmentData(segmentIndex, { text: textAfter });
		}

		// Change segment
		if (isChangeSegment) {
			segmentIndex++;
		}
	}

	return matchedSegments;
};
