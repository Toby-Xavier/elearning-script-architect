import React, { useState } from 'react';

function ScriptForm({ onSubmit, isLoading }) {
	const [formData, setFormData] = useState({
		title: '',
		objectives: '',
		audienceLevel: 'Beginner',
		numModules: 3
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	const styles = {
		container: {
			width: '100%'
		},
		header: {
			textAlign: 'center',
			marginBottom: '48px'
		},
		logo: {
			display: 'inline-block',
			fontSize: '2.5rem',
			marginBottom: '16px'
		},
		title: {
			fontSize: '2.5rem',
			fontWeight: '700',
			color: '#111827',
			marginBottom: '12px',
			letterSpacing: '-0.02em'
		},
		subtitle: {
			color: '#6b7280',
			fontSize: '1.1rem',
			lineHeight: '1.5',
			maxWidth: '500px',
			margin: '0 auto'
		},
		form: {
			display: 'flex',
			flexDirection: 'column',
			gap: '24px'
		},
		field: {
			display: 'flex',
			flexDirection: 'column',
			gap: '8px'
		},
		label: {
			fontWeight: '600',
			color: '#374151',
			fontSize: '0.9rem',
			marginBottom: '4px'
		},
		input: {
			width: '100%',
			padding: '14px 16px',
			border: '1.5px solid #e9eef3',
			borderRadius: '12px',
			fontSize: '1rem',
			transition: 'all 0.2s ease',
			fontFamily: 'inherit',
			outline: 'none',
			background: '#ffffff',
			color: '#111827'
		},
		select: {
			padding: '14px 16px',
			border: '1.5px solid #e9eef3',
			borderRadius: '12px',
			fontSize: '1rem',
			transition: 'all 0.2s ease',
			fontFamily: 'inherit',
			outline: 'none',
			background: '#ffffff',
			color: '#111827',
			cursor: 'pointer'
		},
		button: {
			background: '#111827',
			color: '#ffffff',
			padding: '14px 28px',
			border: 'none',
			borderRadius: '40px',
			fontSize: '1rem',
			fontWeight: '500',
			cursor: isLoading ? 'not-allowed' : 'pointer',
			opacity: isLoading ? 0.6 : 1,
			transition: 'all 0.2s ease',
			marginTop: '8px',
			fontFamily: 'inherit'
		},
		row: {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr',
			gap: '20px'
		},
		helperText: {
			fontSize: '0.8rem',
			color: '#9ca3af',
			marginTop: '4px'
		}
	};

	// Focus styles via style injection
	const focusStyles = document.createElement('style');
	focusStyles.textContent = `
		input:focus, select:focus, textarea:focus {
			border-color: #111827 !important;
			box-shadow: 0 0 0 3px rgba(17,24,39,0.05) !important;
		}
		input:hover:not(:focus), select:hover:not(:focus), textarea:hover:not(:focus) {
			border-color: #d1d5db !important;
		}
	`;
	document.head.appendChild(focusStyles);

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<h1 style={styles.title}>CreateScript</h1>
				<p style={styles.subtitle}>Create structured eLearning scripts in minutes</p>
			</div>

			<form onSubmit={handleSubmit} style={styles.form}>
				<div style={styles.field}>
					<label style={styles.label}>Course title</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="e.g., Mastering Public Speaking"
						required
						style={styles.input}
					/>
				</div>

				<div style={styles.field}>
					<label style={styles.label}>Learning objective(s)</label>
					<textarea
						name="objectives"
						rows={4}
						value={formData.objectives}
						onChange={handleChange}
						placeholder={`One objective per line\ne.g. Describe X\nApply Y in context`}
						required
						style={styles.input}
					/>
					<div style={styles.helperText}>Enter one learning objective per line.</div>
				</div>

				<div style={styles.row}>
					<div style={styles.field}>
						<label style={styles.label}>Audience level</label>
						<select
							name="audienceLevel"
							value={formData.audienceLevel}
							onChange={handleChange}
							style={styles.select}
						>
							<option value="Beginner">Beginner</option>
							<option value="Intermediate">Intermediate</option>
							<option value="Advanced">Advanced</option>
						</select>
					</div>

					<div style={styles.field}>
						<label style={styles.label}>Number of modules</label>
						<input
							type="number"
							name="numModules"
							value={formData.numModules}
							onChange={handleChange}
							min="1"
							max="12"
							required
							style={styles.input}
						/>
						<div style={styles.helperText}>Between 1-12 modules</div>
					</div>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					style={styles.button}
					onMouseEnter={(e) => {
						e.target.style.background = '#1f2937';
						e.target.style.transform = 'translateY(-1px)';
					}}
					onMouseLeave={(e) => {
						e.target.style.background = '#111827';
						e.target.style.transform = 'translateY(0)';
					}}
				>
					{isLoading ? 'Generating...' : 'Generate script →'}
				</button>
			</form>
		</div>
	);
}

export default ScriptForm;