import React, { useState } from 'react';

function ScriptDisplay({ result }) {
	const [copiedIndex, setCopiedIndex] = useState(null);

	const styles = {
		container: { maxWidth: 900, margin: '16px auto', padding: 12, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' },
		header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
		title: { fontSize: 20, fontWeight: 700, color: '#111827' },
		button: { padding: '8px 12px', borderRadius: 8, border: 'none', background: '#111827', color: '#fff', cursor: 'pointer', fontWeight: 600 },
		grid: { display: 'grid', gridTemplateColumns: '1fr', gap: 12 },
		card: { padding: 12, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', background: '#fff', border: '1px solid #e5e7eb' },
		cardHeading: { fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#0f172a' },
		scriptBox: { maxHeight: 250, overflowY: 'auto', padding: 10, borderRadius: 6, background: '#f9fafb', border: '1px solid #e5e7eb', whiteSpace: 'pre-wrap', fontSize: 14, color: '#111827' },
		cardFooter: { display: 'flex', justifyContent: 'flex-end', marginTop: 8 },
		copyButton: { padding: '6px 10px', borderRadius: 6, border: 'none', background: '#067dff', color: '#fff', cursor: 'pointer', fontWeight: 600, transition: 'transform 160ms ease, background 160ms ease' },
		copyWrap: { position: 'relative', display: 'inline-flex', alignItems: 'center' },
		copyBadge: { position: 'absolute', right: '100%', marginRight: 8, top: '50%', transform: 'translateY(-50%) translateY(-6px)', background: '#10b981', color: '#fff', padding: '6px 8px', borderRadius: 6, fontSize: 13, fontWeight: 700, opacity: 0, pointerEvents: 'none', transition: 'opacity 220ms ease, transform 220ms ease' },
		disabled: { opacity: 0.6, cursor: 'not-allowed' },
	};

	function handleCopy(script, idx) {
		if (!script) return;
		const tryClipboard = async () => {
			try {
				if (navigator.clipboard && navigator.clipboard.writeText) {
					await navigator.clipboard.writeText(script);
				} else {
					// Fallback
					const ta = document.createElement('textarea');
					ta.value = script;
					document.body.appendChild(ta);
					ta.select();
					document.execCommand('copy');
					document.body.removeChild(ta);
				}

				setCopiedIndex(idx);
				setTimeout(() => setCopiedIndex(null), 1800);
			} catch (err) {
				// ignore clipboard errors silently
				console.error('Copy failed', err);
			}
		};

		tryClipboard();
	}

	function handleDownloadAll() {
		if (!result) return;
		const parts = [];
		parts.push(result.course_title ? `Course Title: ${result.course_title}` : 'Course Title:');
		parts.push('');

		(result.modules || []).forEach((m) => {
			parts.push(`Module ${m.module_number} - ${m.title}`);
			parts.push('');
			parts.push(m.script || '');
			parts.push('\n---\n');
		});

		const blob = new Blob([parts.join('\n')], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		const safeTitle = (result.course_title || 'course').replace(/[^a-z0-9\- _]/gi, '_');
		a.href = url;
		a.download = `${safeTitle}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	if (!result) {
		return (
			<div style={styles.container}>
				<div style={styles.header}>
					<div style={styles.title}>No script available</div>
				</div>
			</div>
		);
	}

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<div style={styles.title}>{result.course_title || 'Untitled Course'}</div>
				<div>
					<button onClick={handleDownloadAll} style={styles.button} aria-label="Download all as text">Download all as .txt</button>
				</div>
			</div>

			<div style={styles.grid}>
				{(result.modules || []).map((m, idx) => (
					<div key={m.module_number ?? idx} style={styles.card}>
						<div style={styles.cardHeading}>Module {m.module_number}: {m.title}</div>
						<div style={styles.scriptBox}>
							{m.script || ''}
						</div>
						<div style={styles.cardFooter}>
							<div style={styles.copyWrap}>
								<span
									style={copiedIndex === idx ? { ...styles.copyBadge, opacity: 1, transform: 'translateY(-50%) translateY(0)' } : styles.copyBadge}
								>
									Copied
								</span>
								<button
									onClick={() => handleCopy(m.script || '', idx)}
									style={copiedIndex === idx ? { ...styles.copyButton, transform: 'scale(1.03)', background: '#0ea5a4' } : styles.copyButton}
									aria-label={`Copy module ${m.module_number} script`}
								>
									{copiedIndex === idx ? 'Copied' : 'Copy module'}
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ScriptDisplay;

