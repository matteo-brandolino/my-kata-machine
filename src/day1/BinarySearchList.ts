export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length;
    do {
        // 1. find middle point value
        const mid = Math.floor((lo + hi) / 2); // [0.....m.....hi] or // low + (hi-lo)/2 avoid integer in c/c++/java
        const midVal = haystack[mid];
        // 2. midVal is needle
        if (needle === midVal) {
            return true;
        } else if (needle > midVal) {
            // 3. needle > midVal [0....m...n..hi]
            // search only right side
            lo = mid + 1;
        } else {
            //or needle MidVal [0....n...m.....hi]
            hi = mid;
        }
    } while (lo < hi);
    return false;
}
