import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { SliderProps } from './types';
import './style.css';

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0
		};
	}
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};

const Slider: FC<SliderProps> = ({ images }) => {
	const [[page, direction], setPage] = useState([0, 0]);
	const imageIndex = wrap(0, images.length, page);

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};
	return (
		<>
			<AnimatePresence initial={false} custom={direction}>
				<motion.img
					key={page}
					src={images[imageIndex]}
					custom={direction}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					whileHover={{ scale: 1.01 }}
					transition={{
						x: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 }
					}}
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={1}
					onDrag={(e, { offset, velocity }) => { console.log(offset, velocity) }}
					onDragEnd={(e, { offset, velocity }) => {
						const swipe = swipePower(offset.x, velocity.x);
						if (swipe < -swipeConfidenceThreshold) {
							paginate(1);
						} else if (swipe > swipeConfidenceThreshold) {
							paginate(-1);
						}
					}}
				/>
			</AnimatePresence>
			<motion.div
				className='slider-button-wrapper right'
				whileHover={{ backgroundColor: '#00000040' }}
				onClick={() => paginate(1)}
			>
				<motion.div
					className="next"
					onClick={() => paginate(1)}
					whileTap={{ scale: 0.9 }}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
						<g data-name="92-Arrow Right">
							<path d="M13.71 24.71 12.3 23.3l7.29-7.3-7.3-7.29L13.7 7.3l8 8a1 1 0 0 1 0 1.41z" />
						</g>
					</svg>
				</motion.div>
			</motion.div>
			<motion.div
				className='slider-button-wrapper left'
				whileHover={{ backgroundColor: '#00000040' }}
				onClick={() => paginate(-1)}
			>
				<motion.div
					className="prev"
					onClick={() => paginate(-1)}
					whileTap={{ scale: 0.9 }}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
						<g data-name="91-Arrow Left">
							<path d="m18.29 24.71-8-8a1 1 0 0 1 0-1.41l8-8 1.41 1.41L12.41 16l7.29 7.29z" />
						</g>
					</svg>
				</motion.div>
			</motion.div>

			<div
				style={
					{ position: 'absolute', width: '50px', height: '50px', borderRadius: '50%', background: 'white', top: '10px', zIndex: 1000 }}
			>{`${imageIndex + 1}`}
			</div>
		</>
	);
};
export default Slider;
