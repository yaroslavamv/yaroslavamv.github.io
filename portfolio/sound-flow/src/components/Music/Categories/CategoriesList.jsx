import './CategoriesList.scss';
import { useEffect, useRef } from 'react';
import CategoriesItem from './CategoriesItem.jsx';
import { PLAYLISTS } from '../../../musicLibrary.js';

export default function CategoriesList({activePlaylist, setActivePlaylist}) {
	const elemRef = useRef(null);

	// Horizontal scroll with mouse
	useEffect(() => {
		let isDown = false;
		let startX;
		let scrollLeft;

		elemRef.current.addEventListener('mousedown', (event) => {
			isDown = true;
			startX = event.pageX - elemRef.current.offsetLeft;
			scrollLeft = elemRef.current.scrollLeft;
		});

		elemRef.current.addEventListener('mouseup', () => {
			isDown = false;
		});

		elemRef.current.addEventListener('mousemove', (event) => {
			if (!isDown) return;
			event.preventDefault();
			const x = event.pageX - elemRef.current.offsetLeft;
			const walk = (x - startX);
			elemRef.current.scrollLeft = scrollLeft - walk;
		});
	}, []);


	return(
		<div className="music__categories container" ref={elemRef}>
			<ul className="music__categories-list">
				{
					PLAYLISTS.map((playlist, index) => (
						<CategoriesItem
							key={index}
							index={index}
							name={playlist.name}
							activePlaylist={activePlaylist}
							setActivePlaylist={setActivePlaylist}
						/>
					))
				}
			</ul>
		</div>
	);
}