// A -> B -> C -> D
// head           tail
type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;
    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }
        this.tail.next = node; // move link 
        this.tail = node; // and then move the tail
    }
    deque(): T | undefined {
        // A -X- B -> C -> D
        if (!this.head) {
            return undefined;
        }
        this.length--;
        const head = this.head;
        this.head = this.head.next;
        //free head.next = undefined

        if (!this.head) {
            this.tail = undefined;
        }
        return head.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
