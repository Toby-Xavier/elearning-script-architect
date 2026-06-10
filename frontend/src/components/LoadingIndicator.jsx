import React, { useEffect, useState } from 'react';

const MESSAGES = [
	'Analysing learning objectives...',
	'Building course structure...',
	'Writing module scripts...',
	'Generating knowledge checks...',
];

function LoadingIndicator() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setIndex((i) => (i + 1) % MESSAGES.length);
		}, 4000);
		return () => clearInterval(id);
	}, []);

	// Inline keyframes: inject into a style tag for the component only.
	const keyframes = `@keyframes rotateSpinner { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;

	const styles = {
		container: {
			display: 'flex',
			alignItems: 'center',
			gap: 12,
			padding: 12,
			fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
			color: '#ffffff', // White text for contrast on dark background
		},
		spinner: {
			width: 20,
			height: 20,
			borderRadius: '50%',
			border: '3px solid rgba(255, 255, 255, 0.2)', // Light transparent border
			borderTopColor: '#AC8968', // Soft camel from the palette
			animation: 'rotateSpinner 1s linear infinite',
		},
		message: { 
			fontSize: 14,
			color: '#ffffff',
		},
	};

	return (
		<div style={styles.container} role="status" aria-live="polite">
			<style>{keyframes}</style>
			<div style={styles.spinner} aria-hidden="true" />
			<div style={styles.message}>{MESSAGES[index]}</div>
		</div>
	);
}

export default LoadingIndicator;