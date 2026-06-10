import React, { useState, useEffect } from 'react';

function ScriptForm({ onSubmit, isLoading }) {
	const [formData, setFormData] = useState({
		title: '',
		objectives: '',
		additionalInfo: '',
		audienceLevel: 'Beginner',
		numModules: 3
	});

	const [focusedField, setFocusedField] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	// Inject global animations once
	useEffect(() => {
		const style = document.createElement('style');
		style.textContent = `
			@keyframes floatIn {
				from {
					opacity: 0;
					transform: translateY(20px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}
			
			.form-group {
				animation: floatIn 0.5s ease-out forwards;
				opacity: 0;
			}
			
			.form-group:nth-child(1) { animation-delay: 0.05s; }
			.form-group:nth-child(2) { animation-delay: 0.1s; }
			.form-group:nth-child(3) { animation-delay: 0.15s; }
			.form-group:nth-child(4) { animation-delay: 0.2s; }
			.form-group:nth-child(5) { animation-delay: 0.25s; }
			.form-group:nth-child(6) { animation-delay: 0.3s; }
			
			input, textarea, select {
				transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
			}

			/* placeholder colour for inputs/textareas */
			input::placeholder, textarea::placeholder {
				color: rgba(62,54,46,0.45);
			}
		`;
		document.head.appendChild(style);
		return () => document.head.removeChild(style);
	}, []);

	const styles = {
		wrapper: {
			minHeight: '100vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '24px 40px',
			background: '#3E362E', // Deep warm brown
		},
		container: {
			maxWidth: '900px',
			width: '100%',
			margin: '0 auto',
			paddingInline: '16px',
		},
		header: {
			textAlign: 'center',
			marginBottom: '40px',
			animation: 'floatIn 0.6s ease-out',
		},
		title: {
			fontSize: '2.25rem',
			lineHeight: '1.15',
			fontWeight: '800',
			color: '#ffffff',
			marginBottom: '12px',
			letterSpacing: '-0.02em',
			whiteSpace: 'normal',
			overflow: 'visible',
			wordBreak: 'break-word',
		},
		subtitle: {
			color: 'rgba(255,255,255,0.85)',
			fontSize: '1.125rem',
			lineHeight: '1.6',
			maxWidth: '480px',
			margin: '0 auto',
		},
		card: {
			background: '#93785B', // Warm taupe
			borderRadius: '32px',
			padding: '32px 44px 32px 32px',
			boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(172, 137, 104, 0.2)',
		},
		form: {
			display: 'flex',
			flexDirection: 'column',
			gap: '28px',
		},
		field: {
			display: 'flex',
			flexDirection: 'column',
			gap: '8px',
		},
		label: {
			fontWeight: '600',
			color: '#ffffff',
			fontSize: '0.875rem',
			marginBottom: '4px',
			display: 'flex',
			alignItems: 'center',
			gap: '8px',
			flexWrap: 'wrap',
		},
		requiredStar: {
			color: '#865D36', // Rich chestnut
			fontSize: '0.75rem',
		},
		input: {
			width: '100%',
			boxSizing: 'border-box',
			padding: '14px 18px',
			border: '2px solid #A69080',
			borderRadius: '16px',
			fontSize: '0.95rem',
			transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
			fontFamily: 'inherit',
			outline: 'none',
			background: '#ffffff',
			color: '#3E362E',
			boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
		},
		select: {
			width: '100%',
			boxSizing: 'border-box',
			padding: '14px 18px',
			border: '2px solid #A69080',
			borderRadius: '16px',
			fontSize: '0.95rem',
			transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
			fontFamily: 'inherit',
			outline: 'none',
			background: '#ffffff',
			color: '#3E362E',
			cursor: 'pointer',
			boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
		},
		button: {
			background: 'linear-gradient(135deg, #865D36 0%, #3E362E 100%)',
			color: '#ffffff',
			padding: '16px 32px',
			border: 'none',
			borderRadius: '40px',
			fontSize: '1rem',
			fontWeight: '600',
			cursor: isLoading ? 'not-allowed' : 'pointer',
			opacity: isLoading ? 0.7 : 1,
			transition: 'all 0.3s ease',
			marginTop: '16px',
			fontFamily: 'inherit',
			boxShadow: '0 4px 15px rgba(134, 93, 54, 0.3)',
			position: 'relative',
			overflow: 'hidden',
		},
		row: {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr',
			gap: '20px',
		},
		inlineHint: {
			fontSize: '0.75rem',
			color: '#ffffff',
			fontWeight: 'normal',
			opacity: 1,
		},
	};

	// Focus and hover styles
	const getInputStyle = (fieldName) => ({
		...styles.input,
		borderColor: focusedField === fieldName ? '#865D36' : '#A69080',
		boxShadow: focusedField === fieldName 
			? '0 0 0 3px rgba(134, 93, 54, 0.15)' 
			: '0 1px 2px rgba(0, 0, 0, 0.05)',
	});

	const getSelectStyle = () => ({
		...styles.select,
		borderColor: focusedField === 'audienceLevel' ? '#865D36' : '#A69080',
		boxShadow: focusedField === 'audienceLevel' 
			? '0 0 0 3px rgba(134, 93, 54, 0.15)' 
			: '0 1px 2px rgba(0, 0, 0, 0.05)',
	});

	return (
		<div style={styles.wrapper}>
			<div style={styles.container}>
				<div style={styles.header}>
					<h1 style={styles.title}>CreateScript</h1>
					<p style={styles.subtitle}>Turn your ideas into structured eLearning scripts</p>
				</div>

				<div style={styles.card}>
					<form onSubmit={handleSubmit} style={styles.form}>
						<div style={styles.field} className="form-group">
							<label style={styles.label}>
								<span>Course title</span>
								<span style={styles.requiredStar}>*</span>
							</label>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleChange}
								onFocus={() => setFocusedField('title')}
								onBlur={() => setFocusedField(null)}
								placeholder="e.g., Mastering Public Speaking"
								required
								style={getInputStyle('title')}
							/>
						</div>

						<div style={styles.field} className="form-group">
							<label style={styles.label}>
								<span>Learning objectives</span>
								<span style={styles.requiredStar}>*</span>
								<span style={styles.inlineHint}>(Enter one learning objective per line for best results)</span>
							</label>
							<textarea
								name="objectives"
								rows={4}
								value={formData.objectives}
								onChange={handleChange}
								onFocus={() => setFocusedField('objectives')}
								onBlur={() => setFocusedField(null)}
								placeholder="One objective per line&#10;Example:&#10;Understand the fundamentals of public speaking&#10;Apply vocal techniques to engage audiences&#10;Structure compelling presentations"
								required
								style={getInputStyle('objectives')}
							/>
						</div>

						<div style={styles.row} className="form-group">
							<div style={styles.field}>
								<label style={styles.label}>Audience level</label>
								<select
									name="audienceLevel"
									value={formData.audienceLevel}
									onChange={handleChange}
									onFocus={() => setFocusedField('audienceLevel')}
									onBlur={() => setFocusedField(null)}
									style={getSelectStyle()}
								>
									<option value="Beginner">Beginner</option>
									<option value="Intermediate">Intermediate</option>
									<option value="Advanced">Advanced</option>
								</select>
							</div>

							<div style={styles.field}>
								<label style={styles.label}>
									<span>Number of modules</span>
									<span style={styles.inlineHint}>(Between 1-12 modules)</span>
								</label>
								<input
									type="number"
									name="numModules"
									value={formData.numModules}
									onChange={handleChange}
									onFocus={() => setFocusedField('numModules')}
									onBlur={() => setFocusedField(null)}
									min="1"
									max="12"
									required
									style={getInputStyle('numModules')}
								/>
							</div>
						</div>

						<div style={styles.field} className="form-group">
							<label style={styles.label}>
								<span>Additional context</span>
								<span style={styles.inlineHint}>(Help us tailor your content better)</span>
							</label>
							<textarea
								name="additionalInfo"
								rows={3}
								value={formData.additionalInfo}
								onChange={handleChange}
								onFocus={() => setFocusedField('additionalInfo')}
								onBlur={() => setFocusedField(null)}
								placeholder="Any specific requirements, audience insights, or constraints you'd like us to consider..."
								style={getInputStyle('additionalInfo')}
							/>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							style={styles.button}
							onMouseEnter={(e) => {
								if (!isLoading) {
									e.currentTarget.style.transform = 'translateY(-2px)';
									e.currentTarget.style.boxShadow = '0 8px 25px rgba(134, 93, 54, 0.4)';
								}
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = '0 4px 15px rgba(134, 93, 54, 0.3)';
							}}
						>
							{isLoading ? 'Crafting your script...' : 'Generate Script'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ScriptForm;