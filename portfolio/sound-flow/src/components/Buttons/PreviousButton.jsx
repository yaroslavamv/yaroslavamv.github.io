export default function PreviousButton({audioControls, height = 32}) {
	const active = audioControls.trackIndex > 0;

	return (
		<button
			className={"previous-button button" + (active ? "" : " inactive")}
			onClick={active ? audioControls.handlePreviousTrack : null}
		>
			<svg height={height} viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M9.016 14.72L28.224 1.52267C29.7493 0.501334 31 1.25067 31 3.18933V28.8133C31 30.7467 29.7493 31.496 28.224 30.48L9.016 17.2773C9.016 17.2773 8.272 16.7467 8.272 16.0027C8.272 15.256 9.016 14.72 9.016 14.72ZM4.33333 0H2.66667C1.192 0 0 0.128 0 1.6V30.4C0 31.872 1.192 32 2.66667 32H4.33333C5.808 32 7 31.872 7 30.4V1.6C7 0.128 5.808 0 4.33333 0Z" fill="white"/>
			</svg>
		</button>
	)
}