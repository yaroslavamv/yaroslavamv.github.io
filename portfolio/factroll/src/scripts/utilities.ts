function degToRad(deg: number): number {
    return deg * (Math.PI / 180);
}


function easeOutQuad(t: number): number {
	return 1 - (1 - t) * (1 - t);
}


export { degToRad, easeOutQuad };