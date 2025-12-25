/*  [1,3,7,6,5]
1.  [1>3] ok
    [3>7] ok
    [7> 6] swap
    [7> 5] swap
    [1,3,6,5,|7]
    7 is the largest for sure
2.  [1>3] ok
    [3>6] ok
    [6>5] swap
    ....    
*/

export default function bubble_sort(arr: number[]): void {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                //swap
                const tmp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = tmp;
            }
        }
    }
}
