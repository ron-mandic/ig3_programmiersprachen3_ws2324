type TFloorAttributes = {
	id: string;
	left: number;
	top: number;
	width: number;
	height: number;
};

type TFloorContent = {
	id: string;
	left: number;
	top: number;
	width: number;
	height: number;
};

type TBubble = {
	id: string;
	left: number;
	top: number;
	size: number;
	delay?: number;
};

type TCircle = {
	cX: number;
	cY: number;
	r: number;
};

export type { TFloorAttributes, TFloorContent, TBubble, TCircle };
