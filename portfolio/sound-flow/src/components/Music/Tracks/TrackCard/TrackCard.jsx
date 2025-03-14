import './TrackCard.scss';
import DownloadButton from '../../../Buttons/DownloadButton.jsx';
import LikeButton from '../../../Buttons/LikeButton.jsx';
import { MUSIC, PLAYLISTS } from '../../../../musicLibrary.js';
import Equalizer from '../../../Equalizer/Equalizer.jsx';
import { timeFormating } from '../../../../scripts/utils.js';

export default function TrackCard({audioControls, playlistIndex, index}) {
	const trackId = PLAYLISTS[playlistIndex].trackIdList[index];
	const isPlaying = trackId === PLAYLISTS[audioControls.playingPlaylist].trackIdList[audioControls.trackIndex] && audioControls.isPlaying;

	function handlePlayAudio() {
		if (isPlaying) {
			audioControls.handlePlayPause();
		} else {
			audioControls.handlePlayAudio(playlistIndex, index);
		}
	}

	return (
		<li className="track-card">
			<div
				className={"track-card__cover" + (isPlaying ? " is-playing" : "")}
				style={{
					backgroundImage: `url(${MUSIC[trackId].coverImageSmallURL})`,
				}}
			>
				{isPlaying ? <Equalizer size="40px" /> : null}
			</div>
			<div className="track-card__ui">
				<p className="track-card__ui-title p-small">{MUSIC[trackId].title}</p>
				<p className="track-card__ui-subtitle p-tiny secondary">{MUSIC[trackId].author} | {timeFormating(MUSIC[trackId].duration)}</p>
				<div className="track-card__ui-buttons">
					<button className="track-card__ui-button-play button-accent p-small" onClick={handlePlayAudio}>
						{
							isPlaying
							?
							<>
								<svg height="22" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M90 45C90 69.8528 69.8528 90 45 90C20.1472 90 0 69.8528 0 45C0 20.1472 20.1472 0 45 0C69.8528 0 90 20.1472 90 45ZM29.1621 27.4396C29.5851 25.8364 30.8257 24.5707 32.414 24.1489C33.1283 23.952 36.3251 23.952 37.0582 24.1395C38.6748 24.5614 39.9248 25.8176 40.3477 27.4396C40.5639 28.2458 40.5639 61.753 40.3477 62.5593C39.9248 64.1812 38.6748 65.4375 37.0582 65.8594C36.3063 66.0469 33.2035 66.0469 32.4516 65.8594C30.8351 65.4375 29.5851 64.1812 29.1621 62.5593C28.946 61.753 28.946 28.2458 29.1621 27.4396ZM49.6523 27.4396C50.0752 25.8364 51.3158 24.5707 52.9042 24.1489C53.6185 23.952 56.8153 23.952 57.5484 24.1395C59.1649 24.5614 60.4149 25.8176 60.8379 27.4396C61.054 28.2458 61.054 61.753 60.8379 62.5593C60.4149 64.1812 59.1649 65.4375 57.5484 65.8594C56.7965 66.0469 53.6937 66.0469 52.9418 65.8594C51.3252 65.4375 50.0752 64.1812 49.6523 62.5593C49.4361 61.753 49.4361 28.2458 49.6523 27.4396Z" fill="white"/>
								</svg>
								<span>Pause</span>
							</>
							:
							<>
								<svg height="22" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M45 90C69.8528 90 90 69.8528 90 45C90 20.1472 69.8528 0 45 0C20.1472 0 0 20.1472 0 45C0 69.8528 20.1472 90 45 90ZM32.2776 25.9495C32.7067 25.5193 33.3309 25.1674 33.8849 25.05C34.3998 24.9405 35.4921 25.0188 36.0695 25.2065C36.3504 25.3003 36.8185 25.4959 37.1072 25.6445C37.7001 25.9339 64.0794 41.0915 64.7738 41.5295C65.4448 41.9597 66.3421 42.9139 66.6307 43.5083C67.3251 44.924 67.0365 46.324 65.7959 47.5832C65.476 47.9117 65.0157 48.3028 64.7738 48.4592C64.0794 48.8972 37.7001 64.0549 37.1072 64.3443C35.1878 65.3141 33.4401 65.2046 32.2776 64.0392C31.6066 63.3744 31.2087 62.3968 31.0761 61.1062C30.9746 60.0973 30.9746 29.8914 31.0761 28.8825C31.2087 27.592 31.6066 26.6143 32.2776 25.9495Z" fill="white"/>
								</svg>
								<span>Play</span>
							</>
						}
					</button>
					<div className="track-card__ui-download-like-wrapper">
						<DownloadButton
							audioURL={MUSIC[trackId].audioURL}
							height={22}
						/>
						<LikeButton
							onClick={() => audioControls.handleLike(trackId)}
							liked={MUSIC[trackId].liked}
							height={22}
						/>
					</div>
				</div>
			</div>
		</li>
	);
}