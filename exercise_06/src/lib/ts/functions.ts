import { BUTTON_ADD_WIDTH } from "./constants";
import type { TFloorAttributes, TFloorContent } from "./types";

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

function createFloorContent(attributes: TFloorAttributes): TFloorContent {
	return {
		id: attributes.id,
		left: attributes.left,
		top: attributes.top,
		width: attributes.width,
		height: attributes.height,
	};
}

export { getBoundingClientRect, createFloorContent };
