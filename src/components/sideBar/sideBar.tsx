import React, { useEffect, useState, useRef, useContext, RefObject, Ref } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

// CSS
import styles from './sideBar.module.scss';

// Context
import { ThemeContext } from "@src/contexts/themeContext";

// Icons
import { RiMenu2Fill } from "react-icons/ri";
import { MdMenuOpen } from "react-icons/md";

// Images
import { avatarImage } from "@src/assets/images";
import { AppRoutesRef } from '@src/App';

interface SideBarProps {
	appRoutesRef?: RefObject<AppRoutesRef>,
}

const SideBar: React.FC<SideBarProps> = ({
	appRoutesRef
}) => {
	const { theme } = useContext(ThemeContext);
	const { t } = useTranslation("global");
	const [isShow, setIsShow] = useState<boolean>(false);

	const [currentSection, setCurrentSection] = useState<string | null>('home');
	const sectionsPos = useRef<{section: string, posY: number}[] | null>(null);

	function scrollToSection(section: string | null, isImmediate: boolean = false): void {
		if (!section) return;

		const node = appRoutesRef?.current?.sectionsRef?.get(section);
		if (node) {
			node.scrollIntoView({
				// behavior: 'smooth',
				block: 'start',
				inline: 'center',
				behavior: isImmediate ? 'instant' : 'smooth',
			});
		}
	}

	const handleScroll = (): void => {
		if (!sectionsPos.current) return;
		
		const offset = 0; //window.innerHeight * 0.1;
		const currentPosY = window.scrollY;

		for (let i = 0; i < sectionsPos.current.length; i++) {
			const { posY, section } = sectionsPos.current[i];
			const nextSectionPos = sectionsPos.current[i + 1]?.posY || Infinity;

			if (currentPosY >= posY - offset && (!nextSectionPos || currentPosY < nextSectionPos - offset)) {
				setCurrentSection(section);
				break;
			}
		}

	};

	useEffect(() => {
		const currentPath = window.location.pathname;

		if (currentPath === '/') {
			sectionsPos.current = [];
			const bodyRect = document.body.getBoundingClientRect();

			appRoutesRef?.current?.sectionsRef?.forEach((value, key) => {
				const rect = value.getBoundingClientRect();
				sectionsPos.current?.push({section: key, posY: rect.y - bodyRect.y});
			});
			
			window.addEventListener("scroll", handleScroll);
			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		}
	}, [appRoutesRef?.current?.sectionsRef]);

	useEffect(() => {
		const scrollToSectionFromHash = async () => {
			const section = window.location.hash.replace('#', '');
			console.log(section);
			//way for the UI to be updated
			await new Promise(resolve => setTimeout(resolve, 1000));
			scrollToSection(section);

			//delete the hash from the URL
			window.history.replaceState({}, '', window.location.pathname);
		}

		if (window.location.hash) { 
			scrollToSectionFromHash();
		}
	}, []);

	const getNavItem = (section: string, insideText: string): JSX.Element => (
		<li key={section}>
			<button 
				className={`text ${currentSection === section ? styles.underline : ''}`}
				onClick={() => { scrollToSection(section); }}
			>
				{insideText}
			</button>
		</li>
	);

	return (
		<>
			<div className={`${styles[theme]} ${styles.sideBar} ${isShow ? styles.open : ''}`}> 
				<div data-aos="flip-left">
					<img className="horizontal-center" alt="Avatar" src={avatarImage.src} />
				</div>
				<h2 className='text' data-aos="fade-up" data-aos-delay="100">{t("sidebar.introduction.name")}</h2>
				<p className='text' data-aos="fade-up" data-aos-delay="200">{t("sidebar.introduction.intro1")}</p>
				<p className='text' data-aos="fade-up" data-aos-delay="300">{t("sidebar.introduction.intro2")}</p>

				<ul className="text" data-aos="zoom-in" data-aos-delay="400">
					{getNavItem("home", t("sidebar.navigation.home"))}
					{getNavItem("about", t("sidebar.navigation.about"))}
					{getNavItem("services", t("sidebar.navigation.services"))}
					{getNavItem("skills", t("sidebar.navigation.skills"))}
					{getNavItem("education", t("sidebar.navigation.education"))}
					{getNavItem("projects", t("sidebar.navigation.projects"))}
					{getNavItem("activities", t("sidebar.navigation.activities"))}
					{getNavItem("contact", t("sidebar.navigation.contact"))}
				</ul>

				<button 
					className={`${styles.openButton} flex text`}
					onClick={() => { setIsShow(!isShow); }}
				>
					<i className={`${isShow ? styles.show : styles.hide}`}><MdMenuOpen /></i>
					<i className={`${!isShow ? styles.show : styles.hide}`}><RiMenu2Fill /></i>
				</button>
			</div>

			<div 
				className={`${styles.overlay}`}
				onClick={() => { setIsShow(!isShow); }}
			></div>
		</>
	);
};

export default SideBar;