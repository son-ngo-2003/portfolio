import React, { useEffect, useState } from 'react';
import { getLanguageStrEn, Language, languageList } from '@src/types/languages';
import Dropdown from '@src/components/ui/dropdown/dropdown';
import styles from './contentEditor.module.scss';
import MDEditor from '@uiw/react-md-editor';

interface ContentEditorProps {
	content: Record<Language, string>;
	title: Record<Language, string>;
	onChangeContent?: (newContent: Record<Language, string>) => void;
	onChangeTitle?: (newTitle: Record<Language, string>) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ 
	content,
	title,
	onChangeContent,
	onChangeTitle,
}) => {
	const [activeLanguages, setActiveLanguages] = useState<Language[]>([]);
	
	const handleContentChange = (lang: Language, value: string = '') => {
		const newContent = { ...content, [lang]: value };
		onChangeContent?.(newContent);
	};

	const handleTitleChange = (lang: Language, value: string) => {
		const newTitle = { ...title, [lang]: value };
		onChangeTitle?.(newTitle);
	};

	const addLanguage = (lang: Language) => {
		if (!activeLanguages.includes(lang)) {
			onChangeContent?.({ ...content, [lang]: content[lang] || '' });
			onChangeTitle?.({ ...title, [lang]: title[lang] || '' });
		}
	};

	const removeLanguage = (lang: Language) => {
		if (activeLanguages.length > 1) {
			const newContent = { ...content };
			const newTitle = { ...title };
			delete newContent[lang];
			delete newTitle[lang];
			
			onChangeContent?.(newContent);
			onChangeTitle?.(newTitle);
		}
	};

	useEffect(() => {
		const contentLanguages = Object.keys(content).filter(lang => languageList.includes(lang as Language)) as Language[];
		const titleLanguages = Object.keys(title).filter(lang => languageList.includes(lang as Language)) as Language[];
		const _activesLanguages = Array.from(new Set([...contentLanguages, ...titleLanguages]));
		setActiveLanguages(_activesLanguages);
	}, [content, title]);

	const availableLanguages = languageList.filter(lang => !activeLanguages.includes(lang));

	return (
		<div className={styles.contentEditor}>
			<div className={styles.languageSelector}>
				<h4 className='text'>Add Language</h4>
					<Dropdown 
						label={availableLanguages.length > 0 ? "Add Language" : "All languages are already added."} 
						items={availableLanguages.map(lang => ({
							label: lang.toUpperCase(),
							onClick: () => addLanguage(lang)
						}))}
						className={styles.dropdown}
						disabled={availableLanguages.length == 0}
					/>
			</div>

			{activeLanguages.map(lang => (
				<div key={lang} className={styles.languageContent}>
					<div className={styles.languageHeader}>
						<h3 className='text'>{getLanguageStrEn(lang)}</h3>
						{activeLanguages.length > 1 && (
							<button 
								type="button"
								className={`${styles.removeBtn} text`} 
								onClick={() => removeLanguage(lang)}
							>
								Remove
							</button>
						)}
					</div>

					<div className={styles.inputGroup}>
						<label htmlFor={`title-${lang}`} className='text'>Title ({lang.toUpperCase()})</label>
						<input
							id={`title-${lang}`}
							type="text"
							className={`text`}
							value={title[lang] || ''}
							onChange={(e) => handleTitleChange(lang, e.target.value)}
							placeholder={`Title in ${getLanguageStrEn(lang)}`}
						/>
					</div>

					<div className={styles.inputGroup}>
						<label htmlFor={`content-${lang}`} className='text'>Content ({lang.toUpperCase()})</label>

						<MDEditor
							value={content[lang] || ''}
							onChange={(value) => handleContentChange(lang, value)}
							className={`${styles.contentMdEditor}`}
							height={'100%'}
							minHeight={300}
							textareaProps={{
								placeholder: `Content in ${getLanguageStrEn(lang)}`,
								className: `text`,
							}}
							tabSize={4}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default ContentEditor;