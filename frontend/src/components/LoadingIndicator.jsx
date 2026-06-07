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
			color: '#111827',
		},
		spinner: {
			width: 20,
			height: 20,
			borderRadius: '50%',
			border: '3px solid rgba(0,0,0,0.08)',
			borderTopColor: '#111827',
			animation: 'rotateSpinner 1s linear infinite',
		},
		message: { fontSize: 14 },
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

