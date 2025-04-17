import { useContext, useEffect, useState, useRef } from 'react';
import i18next from 'i18next';

// Components
import ButtonElement, { type ButtonElementAsset } from '../buttonElement/buttonElement';

// CSS
import styles from './functionalButton.module.scss';

// Context
import { ThemeContext } from "@src/contexts/themeContext";

// Icons
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";
import { TiArrowUpThick } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import { RiMenu5Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

// Images
import { flags } from '@src/assets/images';
import { languageList } from '@src/types/languages';
import { appThemeList, getThemeFromLocalStorage } from '@src/types/theme';

// Types
export type ButtonFunctionType = 'light-dark' | 'language' | 'contact' | 'go-top' | 'menu';
type ThemeType = 'light-theme' | 'dark-theme';

interface FunctionalButtonProps {
	functionList?: ButtonFunctionType[];
	sectionsRef?: React.MutableRefObject<Map<string, HTMLElement>>;
	divClassName?: string;
}

const FunctionalButton: React.FC<FunctionalButtonProps> = ({
	functionList = ['light-dark', 'language', 'contact', 'go-top'],
	sectionsRef,
	divClassName = ''
}) => {
	const [isShown, setIsShown] = useState<boolean>(true);
	const [isCombined, setIsCombined] = useState<boolean>(true); // For mobile
	const posY = useRef<number>(window.scrollY);
	const length = functionList.length;

	const { theme, setTheme } = useContext(ThemeContext);
	
	const themeIconList: ButtonElementAsset[] = [
		{ value: <FaSun />, type: "icon" },
		{ value: <FaMoon />, type: "icon" }
	];

	const contactList: ButtonElementAsset[] = [{ value: <IoPerson />, type: "icon" }];
	const goTopList: ButtonElementAsset[] = [{ value: <TiArrowUpThick />, type: "icon" }];
	const flagsList: ButtonElementAsset[] = languageList.map((lang) => ({
		type: "image",
		value: flags[lang].src,
	}));
	
	const menuList: ButtonElementAsset[] = [
		{ value: <RiMenu5Line />, type: "icon" },
		{ value: <IoClose />, type: "icon" },
	];

	function scrollToSection(section: string): void {
		if (!section || !sectionsRef) return;
		
		if (window.location.pathname !== '/') {
			window.location.pathname = '/';
			return;
		}
		
		const node = sectionsRef.current.get(section);
		if (node) {
			node.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'center'
			});
		}
	}

	const handleScroll = (): void => {
		const newPosY = window.scrollY;
		setIsShown(newPosY < posY.current);
		posY.current = newPosY;
		setIsCombined(true);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		
		document.onmousemove = (event: MouseEvent) => {
			const bottomX = window.innerHeight - event.clientY;
			const rightY = window.innerWidth - event.clientX;
			if ((bottomX < 150) && (rightY < 200)) {
				setIsShown(true);
			}
		};
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const choseButton = (func: ButtonFunctionType): JSX.Element => {
		switch (func) {
			case 'language':
				return (
					<ButtonElement 
						listAssets={flagsList}
						setIndex={languageList.findIndex((e) => e === localStorage.getItem('language'))}
						onClick={(selectedIndex: number) => {
							i18next.changeLanguage(languageList[selectedIndex]);
							localStorage.setItem('language', languageList[selectedIndex]);
						}}
					/>
				);
			case 'light-dark':
				return (
					<ButtonElement 
						listAssets={themeIconList}
						setIndex={appThemeList.findIndex((e) => e === getThemeFromLocalStorage())}
						onClick={(selectedIndex: number) => {
							setTheme?.(appThemeList[selectedIndex]);
							localStorage.setItem('theme', appThemeList[selectedIndex]);
						}}
					/>
				);
			case 'contact':
				return (
					<ButtonElement 
						listAssets={contactList}
						onClick={() => {scrollToSection('contact');}}
					/>
				);
			case 'go-top':
				return (
					<ButtonElement 
						listAssets={goTopList}
						onClick={() => {window.scrollTo({top: 0, behavior: "smooth"});}}
					/>
				);
			case 'menu': 
				return (
					<ButtonElement 
						listAssets={menuList}
						setIndex={isCombined ? 0 : 1}
						onClick={() => {setIsCombined(!isCombined);}}
					/>
				);
			default:
				return <></>;
		}
	};

	return (
		<div className={`${styles.fbutton} ${styles[theme]} ${divClassName} ${isShown ? '' : styles.hide}`}>
			<div className={styles.desktop}>
				<div className={`${styles.outside} flex`}>
					{choseButton(functionList[length-1] as ButtonFunctionType)}
				</div>
				<ul className={styles.overlay}>
					{functionList.map((func, index) =>
						(index < length-1) && (
							<li key={index}>{choseButton(func)}</li>
						)
					)}
				</ul>
			</div>

			<div className={`${styles.mobile} ${isCombined ? styles.close : ''}`}>
				<ul className={styles.container}>
					{functionList.map((func, index) =>
						(index < length-1) && (
							<li className={`${styles.outside} flex`} key={index}>{choseButton(func)}</li>
						)
					)}
				</ul>
				<div className={styles.overlay}>
					{choseButton('menu')}
				</div>
			</div>
		</div>
	);
};

export default FunctionalButton;