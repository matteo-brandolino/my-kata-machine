// [f,f,f,f,t,t,t]
export default function two_crystal_balls(breaks: boolean[]): number {
    const jumpAmount = Math.floor(Math.sqrt(breaks.length));
    let i = jumpAmount;

    // 1. Jump by √N until first ball breaks
    for (; i < breaks.length; i += jumpAmount) {
        if (breaks[i]) {
            break;
        }
    }

    /*  Indice:  0  1  2  3  4  5  6  7  8  9
        Array:  [f, f, f, f, t, t, t, t, t, t]
                       ^     ^
                        2    4 <- first break
                        └─ back to here! */

    // 2. Go back one jump
    i -= jumpAmount;

    // Step 3: Walk linearly with second ball (max √N steps)
    for (let j = 0; j <= jumpAmount && i < breaks.length; j++, i++) {
        if (breaks[i]) return i;
    }

    return -1;
}
