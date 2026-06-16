import React from 'react';

function ScriptDisplay({ result }) {
	const styles = {
		container: {
			animation: 'fadeIn 0.3s ease-out',
			background: '#1f232c',
			borderRadius: '32px',
			padding: '28px',
		},
		header: {
			marginBottom: '24px',
		},
		title: {
			fontSize: '1.25rem',
			fontWeight: '600',
			color: '#ac8968',
			marginBottom: '8px',
		},
		content: {
			background: '#13161c',
			borderRadius: '16px',
			padding: '28px',
			border: '1px solid #2a2f3a',
			fontFamily: "'Inter', sans-serif",
			fontSize: '0.95rem',
			lineHeight: '1.55',
			color: '#e5e7eb',
			whiteSpace: 'pre-wrap',
			maxHeight: '600px',
			overflowY: 'auto',
		},
		concept: {
			padding: '6px 0',
			marginBottom: 8,
			borderBottom: '1px solid #2a2f3a',
		},
		conceptLast: {
			padding: '6px 0',
			marginBottom: 6,
		},
		meta: {
			display: 'flex',
			alignItems: 'center',
			gap: '12px',
			marginTop: '16px',
			paddingTop: '16px',
			borderTop: '1px solid #2a2f3a',
		},
		badge: {
			background: 'rgba(172, 137, 104, 0.15)',
			color: '#ac8968',
			padding: '4px 12px',
			borderRadius: '20px',
			fontSize: '0.75rem',
			fontWeight: '500',
		},
		downloadBtn: {
			background: 'transparent',
			border: '1px solid #ac8968',
			padding: '6px 16px',
			borderRadius: '20px',
			fontSize: '0.8rem',
			cursor: 'pointer',
			color: '#ac8968',
			fontWeight: '500',
			transition: 'all 0.2s ease',
			fontFamily: 'inherit',
		}
	};

	const handleDownload = () => {
		const content = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'elearning-script.txt';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	// Helper to remove # symbols from text
	const removeHashSymbols = (text) => {
		if (!text) return '';
		// Remove # at the beginning of lines and replace with bullet or just remove
		return String(text).replace(/^#+\s*/gm, '• ');
	};

	// Add fadeIn animation
	const animationStyle = document.createElement('style');
	animationStyle.textContent = `
		@keyframes fadeIn {
			from { opacity: 0; transform: translateY(10px); }
			to { opacity: 1; transform: translateY(0); }
		}
	`;
	document.head.appendChild(animationStyle);

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<h3 style={styles.title}>Your generated script</h3>
			</div>
			<div style={styles.content}>
				{(() => {
					// Helper to split text into concept blocks by blank lines
					const splitIntoConcepts = (text) => {
						if (!text) return [];
						// Remove # symbols before splitting
						const cleanedText = removeHashSymbols(text);
						return cleanedText
							.split(/\n\s*\n+/g)
							.map(s => s.trim())
							.filter(Boolean);
					};

					if (typeof result === 'string') {
						const concepts = splitIntoConcepts(result);
						return concepts.map((c, i) => (
							<div key={i} style={i === concepts.length - 1 ? styles.conceptLast : styles.concept}>
								<div style={{ whiteSpace: 'pre-wrap' }}>{c}</div>
							</div>
						));
					}

					// If result looks like an object with modules, render each module and its concepts
					if (result && typeof result === 'object' && Array.isArray(result.modules)) {
						return result.modules.map((m, mi) => {
							const concepts = splitIntoConcepts(m.script || '');
							return (
								<div key={mi} style={{ marginBottom: 12 }}>
									<div style={{ fontWeight: 700, marginBottom: 8, color: '#ac8968' }}>Module {m.module_number}: {m.title}</div>
									{concepts.map((c, i) => (
										<div key={i} style={i === concepts.length - 1 ? styles.conceptLast : styles.concept}>
											<div style={{ whiteSpace: 'pre-wrap' }}>{c}</div>
										</div>
									))}
								</div>
							);
						});
					}

					// Fallback: pretty-print JSON with # removed
					const jsonString = JSON.stringify(result, null, 2);
					const cleanedJson = removeHashSymbols(jsonString);
					return <pre style={{ margin: 0 }}>{cleanedJson}</pre>;
				})()}
			</div>
			<div style={styles.meta}>
				<span style={styles.badge}>AI Generated</span>
				<button 
					style={styles.downloadBtn}
					onClick={handleDownload}
					onMouseEnter={(e) => {
						e.target.style.background = 'rgba(172, 137, 104, 0.1)';
						e.target.style.borderColor = '#ac8968';
					}}
					onMouseLeave={(e) => {
						e.target.style.background = 'transparent';
						e.target.style.borderColor = '#ac8968';
					}}
				>
					Download script
				</button>
			</div>
		</div>
	);
}

export default ScriptDisplay;