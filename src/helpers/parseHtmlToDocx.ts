import { Paragraph, TextRun, IRunOptions } from 'docx'

// Parse a small set of HTML tags into docx paragraphs
export function parseHtmlToDocx(html: string) {
	const parser = new DOMParser()
	const doc = parser.parseFromString(html, 'text/html')

	const paragraphs: Paragraph[] = []

	// Go through all top-level childNodes of <body>
	doc.body.childNodes.forEach(node => {
		const nodeName = node.nodeName.toLowerCase()

		// <h1> => bold + 16pt
		if (nodeName === 'h1') {
			paragraphs.push(
				new Paragraph({
					children: parseChildNodes(node, { bold: true, size: 32 }),
				})
			)
		}
		// <p> => normal + 14pt
		else if (nodeName === 'p') {
			paragraphs.push(
				new Paragraph({
					children: parseChildNodes(node, { size: 28 }),
				})
			)
		}
		// If there's any other top-level tag, you can decide how to handle it:
		// e.g., parseChildNodes with default style or ignore
		else {
			paragraphs.push(
				new Paragraph({
					children: parseChildNodes(node, { size: 28 }),
				})
			)
		}
	})

	return paragraphs
}

// Recursively parse child nodes (text, <i>, etc.)
function parseChildNodes(
	parentNode: ChildNode,
	baseStyle: IRunOptions
): TextRun[] {
	const runs: TextRun[] = []

	parentNode.childNodes.forEach(child => {
		// nodeName might be uppercase in some browsers, so convert to lowercase
		const nodeName = child.nodeName.toLowerCase()

		// Text
		if (child.nodeType === Node.TEXT_NODE) {
			runs.push(
				new TextRun({
					text: child.textContent ?? '',
					...baseStyle,
				})
			)
		}
		// <i> => apply italics
		else if (nodeName === 'i' || nodeName === 'em') {
			runs.push(...parseChildNodes(child, { ...baseStyle, italics: true }))
		}
		// <b> or <strong> => apply bold
		else if (nodeName === 'b' || nodeName === 'strong') {
			runs.push(...parseChildNodes(child, { ...baseStyle, bold: true }))
		}
		// Other tags => parse recursively with the same style
		else {
			runs.push(...parseChildNodes(child, baseStyle))
		}
	})

	return runs
}
