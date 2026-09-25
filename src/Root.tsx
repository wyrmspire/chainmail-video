import React from 'react';
import {Composition} from 'remotion';
import {TestCard} from './TestCard';
import {Showcase} from './Showcase';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="ChainmailTest"
				component={TestCard}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="ChainmailShowcase"
				component={Showcase}
				durationInFrames={1440}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
