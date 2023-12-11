import { BUTTON_ADD_WIDTH, FLOOR_PADDING } from "./constants";
import type { TBubble, TCircle, TFloorAttributes } from "./types";

function random(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getBoundingClientRect(targetID: string) {
	switch (targetID) {
		case "bottom-box-01":
			return {
				left: `${642 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${995 + BUTTON_ADD_WIDTH / 2}px`,
			};
		case "bottom-box-02":
			return {
				left: `${979 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${995 + BUTTON_ADD_WIDTH / 2}px`,
			};
		case "bottom-box-03":
			return {
				left: `${1193 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${995 + BUTTON_ADD_WIDTH / 2}px`,
			};
		case "top-box-01":
			return {
				left: `${376 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${842 + BUTTON_ADD_WIDTH / 2}px`,
			};

		case "top-box-02":
			return {
				left: `${257 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${727 + BUTTON_ADD_WIDTH / 2}px`,
			};

		case "top-box-03":
			return {
				left: `${257 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${586 + BUTTON_ADD_WIDTH / 2}px`,
			};

		case "top-box-04":
			return {
				left: `${257 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${444 + BUTTON_ADD_WIDTH / 2}px`,
			};

		case "top-box-05":
			return {
				left: `${281 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${196 + BUTTON_ADD_WIDTH / 2}px`,
			};

		case "top-box-06":
			return {
				left: `${939 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${127 + BUTTON_ADD_WIDTH / 2}px`,
			};

		case "top-box-07":
			return {
				left: `${1413 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${146 + BUTTON_ADD_WIDTH / 2}px`,
			};

		case "top-box-08":
			return {
				left: `${1195 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${448 + BUTTON_ADD_WIDTH / 2}px`,
			};

		case "top-box-09":
			return {
				left: `${1318 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${721 + BUTTON_ADD_WIDTH / 2}px`,
			};

		case "top-box-10":
			return {
				left: `${979 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${842 + BUTTON_ADD_WIDTH / 2}px`,
			};
		case "top-box-info":
		default:
			return {
				left: `${800 + BUTTON_ADD_WIDTH / 2}px`,
				top: `${562 + BUTTON_ADD_WIDTH / 2}px`,
			};
	}
}

function intersectsWith(circleA: TCircle, circleB: TCircle) {
	const { cX: xA, cY: yA, r: rA } = circleA;
	const { cX: xB, cY: yB, r: rB } = circleB;
	const hypotenuse = Math.sqrt((xA - xB) ** 2 + (yA - yB) ** 2);

	return hypotenuse < rA + rB;
}

function getFloorConstraints(targetId: string) {
	function func(
		xI: number,
		yI: number,
		size: number,
		xN: number,
		yN: number,
		widthN: number,
		heightN: number,
		padding = 0
	): boolean {
		const points = [
			{ x: xI, y: yI },
			{ x: xI + size, y: yI },
			{ x: xI, y: yI + size },
			{ x: xI + size, y: yI + size },
		];

		const isEntered = points.some((point) => {
			return (
				point.x + 4 + padding + size >= xN &&
				point.x <= xN + widthN + 4 + padding + size &&
				point.y + 4 + padding + size >= yN &&
				point.y <= yN + heightN + 4 + padding + size
			);
		});

		return isEntered;
	}

	switch (targetId) {
		case "div.top-box-05":
			return {
				left: 452,
				top: 198,
				width: 95,
				height: 142,
				func,
			};
		case "div.top-box-06":
			return {
				left: 0,
				top: 198,
				width: 514,
				height: 108,
				func,
			};
		case "div.top-box-09":
			return {
				left: 0,
				top: 0,
				width: 196,
				height: 278,
				func,
			};
		default:
			return null;
	}
}

function createBubbles(
	{
		id,
		left: x0 = 0,
		top: y0 = 0,
		width: width0,
		height: height0,
	}: TFloorAttributes,
	length: number,
	size = 37
): TBubble[] {
	const arrBubbles: TBubble[] = [];
	const _attributes = getFloorConstraints(id);
	const {
		left: xN,
		top: yN,
		width: widthN,
		height: heightN,
		func: liesWithinFloor,
	} = _attributes || {};
	const MAX_ITERATIONS = 1000;

	if (_attributes === null) {
		for (let i = 0; i < length; i++) {
			let objBubble: TBubble;

			let j = 0;
			let isDone = false;

			while (!isDone && j < MAX_ITERATIONS) {
				let xMin = FLOOR_PADDING,
					xMax = width0 - 4 - FLOOR_PADDING - size;
				let yMin = FLOOR_PADDING,
					yMax = height0 - 4 - FLOOR_PADDING - size;

				objBubble = {
					id: `bubble-${id}-${i}-${j}`,
					left: random(xMin, xMax),
					top: random(yMin, yMax),
					size,
				};

				if (!arrBubbles.length) {
					arrBubbles.push(objBubble);
					isDone = true;
				} else {
					const circleA: TCircle = {
						cX: objBubble.left + objBubble.size / 2,
						cY: objBubble.top + objBubble.size / 2,
						r: objBubble.size,
					};

					const bubbleIntersects = arrBubbles.some((bubble) => {
						return intersectsWith(circleA, {
							cX: bubble.left + bubble.size / 2,
							cY: bubble.top + bubble.size / 2,
							r: bubble.size,
						});
					});

					if (bubbleIntersects) {
						j++;
					} else {
						arrBubbles.push(objBubble);
						isDone = true;
					}
				}
			}
		}
	}

	if (_attributes) {
		for (let i = 0; i < length; i++) {
			let objBubble: TBubble;

			let j = 0;
			let isDone = false;

			while (!isDone && j < MAX_ITERATIONS) {
				let xMin = FLOOR_PADDING,
					xMax = width0 - 4 - FLOOR_PADDING - size;
				let yMin = FLOOR_PADDING,
					yMax = height0 - 4 - FLOOR_PADDING - size;

				objBubble = {
					id: `bubble-${id}-${i}-${j}`,
					left: random(xMin, xMax),
					top: random(yMin, yMax),
					size,
				};

				const circleA: TCircle = {
					cX: objBubble.left + objBubble.size / 2,
					cY: objBubble.top + objBubble.size / 2,
					r: objBubble.size,
				};

				const bubbleIntersectsOthers = arrBubbles.some((bubble) => {
					return intersectsWith(circleA, {
						cX: bubble.left + bubble.size / 2,
						cY: bubble.top + bubble.size / 2,
						r: bubble.size,
					});
				});
				// @ts-ignore
				const bubbleIntersectsDeadArea = liesWithinFloor(
					objBubble.left,
					objBubble.top,
					objBubble.size,
					// @ts-ignore
					xN,
					yN,
					widthN,
					heightN,
					FLOOR_PADDING
				);

				if (!bubbleIntersectsOthers && !bubbleIntersectsDeadArea) {
					arrBubbles.push(objBubble);
					isDone = true;
				} else {
					j++;
				}
			}
		}
	}

	return arrBubbles;
}

export { random, getBoundingClientRect, getFloorConstraints, createBubbles };
