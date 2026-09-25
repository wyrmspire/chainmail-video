import React from 'react';
import {
	AbsoluteFill,
	Audio,
	Sequence,
	Video,
	interpolate,
	staticFile,
	useCurrentFrame,
} from 'remotion';

const SEGMENT_FRAMES = 300; // 10s per clip at 30fps
const FADE_FRAMES = 15; // 0.5s crossfade between segments

const SEGMENTS = [
	{
		clip: 'clips/clip-01-heart.mp4',
		vo: 'voiceover/vo-01-heart.mp3',
		caption: 'The Heart',
	},
	{
		clip: 'clips/clip-02-cross.mp4',
		vo: 'voiceover/vo-02-cross.mp3',
		caption: 'The Cross',
	},
	{
		clip: 'clips/clip-03-wristband.mp4',
		vo: 'voiceover/vo-03-wristband.mp3',
		caption: 'The Wristband',
	},
	{
		clip: 'clips/clip-04-keychain.mp4',
		vo: 'voiceover/vo-04-keychain.mp3',
		caption: 'By Hand',
	},
	{
		clip: 'clips/clip-05-packing.mp4',
		vo: 'voiceover/vo-05-giftbox.mp3',
		caption: 'Packed With Care',
	},
];

// 5 x 300 frames minus the four 15-frame overlaps = 1440 frames (48s)
export const TOTAL_FRAMES =
	SEGMENTS.length * SEGMENT_FRAMES - FADE_FRAMES * (SEGMENTS.length - 1);

const Caption: React.FC<{text: string}> = ({text}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(
		frame,
		[15, 35, SEGMENT_FRAMES - 35, SEGMENT_FRAMES - 15],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);
	return (
		<div
			style={{
				position: 'absolute',
				left: 90,
				bottom: 80,
				opacity,
				color: '#f7f1e3',
				fontFamily: 'Georgia, "Times New Roman", serif',
				fontSize: 54,
				letterSpacing: 2,
				textShadow: '0 2px 18px rgba(0,0,0,0.75)',
			}}
		>
			{text}
		</div>
	);
};

const Segment: React.FC<{
	index: number;
	clip: string;
	vo: string;
	caption: string;
}> = ({index, clip, vo, caption}) => {
	const frame = useCurrentFrame();
	const fadeIn =
		index === 0
			? 1
			: interpolate(frame, [0, FADE_FRAMES], [0, 1], {
					extrapolateRight: 'clamp',
			  });
	const fadeOut =
		index === SEGMENTS.length - 1
			? 1
			: interpolate(
					frame,
					[SEGMENT_FRAMES - FADE_FRAMES, SEGMENT_FRAMES],
					[1, 0],
					{extrapolateLeft: 'clamp'}
			  );
	return (
		<AbsoluteFill style={{opacity: Math.min(fadeIn, fadeOut)}}>
			<Video
				src={staticFile(clip)}
				volume={0}
				style={{width: '100%', height: '100%', objectFit: 'cover'}}
			/>
			<Audio src={staticFile(vo)} />
			<Caption text={caption} />
		</AbsoluteFill>
	);
};

export const Showcase: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#141210'}}>
			{SEGMENTS.map((s, i) => (
				<Sequence
					key={s.caption}
					from={i * (SEGMENT_FRAMES - FADE_FRAMES)}
					durationInFrames={SEGMENT_FRAMES}
				>
					<Segment
						index={i}
						clip={s.clip}
						vo={s.vo}
						caption={s.caption}
					/>
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
