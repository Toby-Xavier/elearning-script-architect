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
		wrapper: {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: '#3E362E', // Deep warm brown background
			zIndex: 1000,
		},
		container: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			gap: 16,
			padding: 24,
			fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
		},
		spinner: {
			width: 40,
			height: 40,
			borderRadius: '50%',
			border: '3px solid rgba(172, 137, 104, 0.2)', // #AC8968 with transparency
			borderTopColor: '#AC8968', // Soft camel
			animation: 'rotateSpinner 1s linear infinite',
		},
		message: { 
			fontSize: 16,
			color: '#AC8968', // Soft camel text
			fontWeight: 500,
		},
	};

	return (
		<div style={styles.wrapper} role="status" aria-live="polite">
			<style>{keyframes}</style>
			<div style={styles.container}>
				<div style={styles.spinner} aria-hidden="true" />
				<div style={styles.message}>{MESSAGES[index]}</div>
			</div>
		</div>
	);
}

export default LoadingIndicator;