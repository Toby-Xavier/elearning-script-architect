import React, { useState } from 'react';

function ScriptForm({ onSubmit, isLoading = false }) {
	const [topic, setTopic] = useState('');
	const [objectivesText, setObjectivesText] = useState('');
	const [level, setLevel] = useState('Beginner');
	const [numModules, setNumModules] = useState(1);

	const styles = {
		form: {
			maxWidth: 640,
			margin: '0 auto',
			padding: 16,
			borderRadius: 8,
			background: '#fff',
			boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
			fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
		},
		field: { display: 'flex', flexDirection: 'column', marginBottom: 12 },
		label: { marginBottom: 6, fontSize: 14, fontWeight: 600, color: '#111827' },
		input: { padding: '8px 10px', fontSize: 14, borderRadius: 6, border: '1px solid #d1d5db' },
		textarea: { padding: 10, fontSize: 14, borderRadius: 6, border: '1px solid #d1d5db', resize: 'vertical' },
		select: { padding: 8, fontSize: 14, borderRadius: 6, border: '1px solid #d1d5db' },
		number: { width: 120, padding: 8, fontSize: 14, borderRadius: 6, border: '1px solid #d1d5db' },
		button: {
			marginTop: 8,
			padding: '10px 14px',
			background: '#111827',
			color: '#fff',
			border: 'none',
			borderRadius: 8,
			cursor: 'pointer',
			fontWeight: 600,
		},
		buttonDisabled: {
			background: '#9ca3af',
			cursor: 'not-allowed',
		},
		hint: { marginTop: 4, fontSize: 12, color: '#6b7280' },
	};

	function handleSubmit(e) {
		e.preventDefault();
		if (typeof onSubmit !== 'function') return;

		const data = {
			topic: topic.trim(),
			// Split objectives by line, trim and drop empty lines
			objectives: objectivesText
				.split('\n')
				.map((s) => s.trim())
				.filter(Boolean),
			level,
			numModules: Number(numModules) || 1,
		};

		onSubmit(data);
	}

	return (
		<form onSubmit={handleSubmit} style={styles.form} aria-label="Script generation form">
			<div style={styles.field}>
				<label htmlFor="topic" style={styles.label}>Course Topic</label>
				<input
					id="topic"
					name="topic"
					type="text"
					value={topic}
					onChange={(e) => setTopic(e.target.value)}
					style={styles.input}
					required
				/>
			</div>

			<div style={styles.field}>
				<label htmlFor="objectives" style={styles.label}>Learning Objectives (one per line)</label>
				<textarea
					id="objectives"
					name="objectives"
					rows={4}
					value={objectivesText}
					onChange={(e) => setObjectivesText(e.target.value)}
					style={styles.textarea}
					placeholder="e.g. Understand X\nBe able to do Y"
				/>
				<div style={styles.hint}>Put each objective on its own line; empty lines are ignored.</div>
			</div>

			<div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
				<div style={{ ...styles.field, flex: 1 }}>
					<label htmlFor="level" style={styles.label}>Level</label>
					<select id="level" name="level" value={level} onChange={(e) => setLevel(e.target.value)} style={styles.select}>
						<option>Beginner</option>
						<option>Intermediate</option>
						<option>Advanced</option>
					</select>
				</div>

				<div style={{ ...styles.field, width: 160 }}>
					<label htmlFor="numModules" style={styles.label}>Number of Modules</label>
					<input
						id="numModules"
						name="numModules"
						type="number"
						min={1}
						max={8}
						value={numModules}
						onChange={(e) => setNumModules(Math.max(1, Math.min(8, Number(e.target.value || 1))))}
						style={styles.number}
					/>
				</div>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				style={isLoading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
			>
				{isLoading ? 'Generating...' : 'Generate Script'}
			</button>
		</form>
	);
}

export default ScriptForm;

