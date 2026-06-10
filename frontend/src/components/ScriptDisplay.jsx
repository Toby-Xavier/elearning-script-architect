import React from 'react';

function ScriptDisplay({ result }) {
	const styles = {
		container: {
			animation: 'fadeIn 0.3s ease-out'
		},
		header: {
			marginBottom: '24px'
		},
		title: {
			fontSize: '1.25rem',
			fontWeight: '600',
			color: '#111827',
			marginBottom: '8px'
		},
		content: {
			background: '#fafbfc',
			borderRadius: '16px',
			padding: '28px',
			border: '1px solid #f0f2f5',
			fontFamily: "'Inter', sans-serif",
			fontSize: '0.95rem',
			lineHeight: '1.55',
			color: '#374151',
			whiteSpace: 'pre-wrap',
			maxHeight: '600px',
			overflowY: 'auto'
		},
		concept: {
			padding: '6px 0',
			marginBottom: 8,
			borderBottom: '1px solid rgba(15,23,42,0.04)'
		},
		conceptLast: {
			padding: '6px 0',
			marginBottom: 6
		},
		meta: {
			display: 'flex',
			alignItems: 'center',
			gap: '12px',
			marginTop: '16px',
			paddingTop: '16px',
			borderTop: '1px solid #f0f2f5'
		},
		badge: {
			background: '#f3f4f6',
			color: '#4b5563',
			padding: '4px 12px',
			borderRadius: '20px',
			fontSize: '0.75rem',
			fontWeight: '500'
		},
		downloadBtn: {
			background: 'transparent',
			border: '1px solid #e5e7eb',
			padding: '6px 16px',
			borderRadius: '20px',
			fontSize: '0.8rem',
			cursor: 'pointer',
			color: '#4b5563',
			fontWeight: '500',
			transition: 'all 0.2s ease',
			fontFamily: 'inherit'
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
						return String(text)
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
									<div style={{ fontWeight: 700, marginBottom: 8 }}>Module {m.module_number}: {m.title}</div>
									{concepts.map((c, i) => (
										<div key={i} style={i === concepts.length - 1 ? styles.conceptLast : styles.concept}>
											<div style={{ whiteSpace: 'pre-wrap' }}>{c}</div>
										</div>
									))}
								</div>
							);
						});
					}

					// Fallback: pretty-print JSON
					return <pre style={{ margin: 0 }}>{JSON.stringify(result, null, 2)}</pre>;
				})()}
			</div>
			<div style={styles.meta}>
				<span style={styles.badge}>AI Generated</span>
				<button 
					style={styles.downloadBtn}
					onClick={handleDownload}
					onMouseEnter={(e) => {
						e.target.style.background = '#f9fafb';
						e.target.style.borderColor = '#d1d5db';
					}}
					onMouseLeave={(e) => {
						e.target.style.background = 'transparent';
						e.target.style.borderColor = '#e5e7eb';
					}}
				>
					Download script ↓
				</button>
			</div>
		</div>
	);
}

export default ScriptDisplay;