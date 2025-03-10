import './Player.scss';
import { useState, useEffect } from 'react';
import DownloadButton from '../Buttons/DownloadButton.jsx';
import LikeButton from '../Buttons/LikeButton.jsx';
import ShuffleButton from '../Buttons/ShuffleButton.jsx';
import PlayPauseButton from '../Buttons/PlayPauseButton.jsx';
import PreviousButton from '../Buttons/PreviousButton.jsx';
import NextButton from '../Buttons/NextButton.jsx';
import LoopButton from '../Buttons/LoopButton.jsx';
import Timeline from './Timeline.jsx';
import RunningLine from '../RunningLine/RunningLine.jsx';
import { MUSIC, PLAYLISTS } from '../../musicLibrary.js';


export default function Player({audioControls, mini = false}) {
	const trackId = PLAYLISTS[audioControls.playingPlaylist].trackIdList[audioControls.trackIndex];
	const className = mini ? "player-mini" : "player";

	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > (window.innerWidth > 800 ? 450 : 550));
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);


	return(
		<section className={className + (mini ? (" container" +(scrolled ? " active" : "")) : "")}>
			<div
				className={`${className}__cover`}
				style={{backgroundImage: `url(${mini ? MUSIC[trackId].coverImageSmallURL : MUSIC[trackId].coverImageURL})`}}
			></div>

			<div className={`${className}__ui`}>

				<div className={`${className}__ui-title`}>
					<DownloadButton
						audioURL={MUSIC[trackId].audioURL}
					/>
					<LikeButton
						onClick={() => audioControls.handleLike(trackId)}
						liked={MUSIC[trackId].liked}
					/>
					<div className={`${className}__ui-title-name`}>
						<RunningLine className={`${className}__ui-title-name-song h1`}>
							{MUSIC[trackId].title}
						</RunningLine>
						<p className={`${className}__ui-title-name-author ${mini ? "p-small adaptive" : "p"} secondary`}>{MUSIC[trackId].author}</p>
					</div>
				</div>

				<div className={`${className}__ui-control`}>
					<Timeline
						audioControls={audioControls}
					/>
					<div className={`${className}__ui-control-buttons`}>
						<ShuffleButton
							audioControls={audioControls}
						/>
						<PreviousButton
							audioControls={audioControls}
						/>
						<PlayPauseButton
							audioControls={audioControls}
						/>
						<NextButton
							audioControls={audioControls}
						/>
						<LoopButton
							audioControls={audioControls}
						/>
					</div>
				</div>

			</div>

		</section>
	);
}