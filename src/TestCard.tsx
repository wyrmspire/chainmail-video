import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

// Minimal toolchain proof: 5-second 16:9 title card.
export const TestCard: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: 'clamp',
	});
	const scale = interpolate(frame, [0, 60], [0.92, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1a1a1a',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					opacity,
					transform: `scale(${scale})`,
					color: '#f5f0e6',
					fontFamily: 'Georgia, serif',
					fontSize: 120,
					fontWeight: 'bold',
					textAlign: 'center',
				}}
			>
				Chainmail test
			</div>
			<div
				style={{
					opacity,
					color: '#c9a86a',
					fontFamily: 'Georgia, serif',
					fontSize: 40,
					marginTop: 24,
				}}
			>
				Remotion toolchain check
			</div>
		</AbsoluteFill>
	);
};
