# The Last Algorithms Course You'll Need - Comprehensive Study Guide

**Course by ThePrimeagen on Frontend Masters**

## Table of Contents

1. [Introduction](#1-introduction)
2. [Algorithms and Time Space Complexity](#2-algorithms-and-time-space-complexity)
3. [Arrays (Our First Data Structure)](#3-arrays-our-first-data-structure)
4. [Search Algorithms](#4-search-algorithms)
5. [Sorting Algorithms](#5-sorting-algorithms)
6. [List Data Structures](#6-list-data-structures)
7. [Arrays vs Linked Lists](#7-arrays-vs-linked-lists)
8. [Recursion](#8-recursion)
9. [Trees](#9-trees)
10. [Graphs](#10-graphs)
11. [Maps (Hash Maps)](#11-maps-hash-maps)
12. [LRU Cache](#12-lru-cache)

---

## 1. Introduction

### Key Concepts

- **Course Goal**: Foundation in algorithms and data structures
- **Expected Time Investment**: This 2-day course represents approximately 225 hours worth of university-level work
- **Why Learn Algorithms?**: Understanding algorithms helps you make better decisions about data structures and implementations

### Important Notes

- Arrays are the simplest data structure
- `const a = []` in JavaScript is NOT actually an array (it's an ArrayList)
- The course uses TypeScript for beginner-friendliness
- This is an entrance to the topic, not the destination

### Recommended Books

1. **Introduction to Algorithms** (CLRS) - The definitive academic resource (girthy but comprehensive)
2. **A Common-Sense Guide to Data Structures and Algorithms** - More beginner-friendly, though less complete

---

## 2. Algorithms and Time Space Complexity

### What is Big O?

Big O is a way to categorize your algorithm's time or memory requirements based on input. It describes the **growth** of your algorithm, not exact measurements.

**Key phrase**: "As your input grows, how fast does computation or memory grow?"

### Important Concepts

1. **Growth is with respect to input**
2. **Constants are dropped**: O(2N) → O(N)
3. **Worst case is usually measured** (especially in interviews)

### Common Time Complexities (from best to worst)

- **O(1)** - Constant time
  - Resources used are independent of input size
  - Examples: arithmetic operations, array index access, hash table lookup (average)
- **O(log n)** - Logarithmic (Binary search, balanced BSTs)
  - Grows slowly as input increases, making it efficient for large datasets
  - If you can halve the problem at each step, you likely have O(log n)
- **O(n)** - Linear (Single loop through data)
  - Performance scales directly with input size
  - Common in data processing, single-pass algorithms
- **O(n log n)** - Linearithmic (QuickSort, MergeSort)
  - Combination of linear and logarithmic operations
  - Sweet spot for efficient sorting algorithms
- **O(n²)** - Quadratic (Nested loops)
  - Resources scale with the square of input size
  - Examples: bubble sort, simple nested loop operations
- **O(n³)** - Cubic (Triple nested loops)
- **O(2^n)** - Exponential
  - Extremely inefficient for large inputs
  - Common in algorithms generating subsets or permutations
- **O(n!)** - Factorial
- **O(√n)** - Square root (Two Crystal Balls problem)

### Big O Tricks

1. **Look for loops** - Usually indicates O(N) or worse
2. **If input halves at each step** - Likely O(log N) or O(N log N)
3. **Multiple sequential loops** - O(N + N) = O(N) (constants dropped)
4. **Nested loops** - Often O(N²) or worse

### Real-World Context

Understanding Big O isn't just theoretical - it's fundamental for:
- **Choosing data structures**: Should you use an array or a hash map?
- **Optimizing database queries**: Queries that scale to millions of users
- **Designing scalable systems**: What works for 100 users vs 1,000,000 users?
- **Interview success**: You'll frequently be asked "What's the time complexity?"

### Interview Tips for Big O

1. **Always mention "worst case" explicitly** - This impresses interviewers
2. **Think before coding** - Analyze complexity before implementing
3. **Consider space complexity too** - Not just time
4. **Explain your reasoning** - Walk through why your solution is O(N) or O(log N)
5. **Know the common complexities** - Recognize patterns in code structure

### Example Analysis

```typescript
// O(N) - Linear time
function sum_char_codes(n: string): number {
    let sum = 0;
    for (let i = 0; i < n.length; ++i) {
        sum += n.charCodeAt(i);
    }
    return sum;
}

// Still O(N) - Constants dropped (2N → N)
function sum_char_codes_twice(n: string): number {
    let sum = 0;
    for (let i = 0; i < n.length; ++i) {
        sum += n.charCodeAt(i);
    }
    for (let i = 0; i < n.length; ++i) {
        sum += n.charCodeAt(i);
    }
    return sum;
}

// O(N²) - Quadratic time
function sum_char_codes_nested(n: string): number {
    let sum = 0;
    for (let i = 0; i < n.length; ++i) {
        for (let j = 0; j < n.length; ++j) {
            sum += charCode;
        }
    }
    return sum;
}
```

### Practical vs Theoretical

- O(100N) is theoretically faster than O(N²)
- But for small inputs, O(N²) might actually be faster
- Constants matter in practice, but Big O ignores them for analyzing growth

### Space Complexity

- Less emphasized in this course
- Memory growth can be computationally expensive
- Languages like Go/JavaScript have additional penalties (garbage collection)

---

## 3. Arrays (Our First Data Structure)

### What is an Array?

**Definition**: Fixed-size, contiguous memory chunks

### Key Characteristics

- **Fixed size** - Cannot grow
- **Contiguous memory** - Elements stored sequentially in memory
- **No built-in insertAt, push, or pop** - But you can write them

### Array Operations & Time Complexity

| Operation | Time Complexity | Why? |
|-----------|----------------|------|
| **Access by index** | O(1) | Direct memory offset: `address = start + (index × element_size)` |
| **Search for value** | O(N) | Must check each element |
| **Insertion** | O(N) | Must shift elements |
| **Deletion** | O(N) | Must shift elements |

### Memory Access Formula

```
memory_address = array_start_address + (index × size_of_element)
```

### Why Arrays are Fast for Access

- CPU can calculate exact memory location instantly
- No traversal needed
- **Excellent cache locality**: Data stored contiguously benefits from CPU cache

### Why Arrays are Slow for Insertion/Deletion

- Must shift all subsequent elements
- Example: Insert at index 0 requires shifting entire array

### Cache Locality and Performance

Arrays have superior cache performance compared to other data structures due to **spatial locality**:

- **Spatial Locality**: When you access one element, nearby elements are loaded into cache
- **Temporal Locality**: Recently accessed elements are likely to be accessed again soon

**Performance Impact**: Traversing an array in linear order can be **5x faster** than random access due to cache effects!

### Common Pitfalls

1. **Pointer Chasing**: Accessing data through pointers causes cache misses
2. **Random Access Patterns**: Jumping around in memory negates cache benefits
3. **Column-Major Access**: In 2D arrays, accessing by columns (jumping rows) causes more cache misses
4. **Buffer Overflows**: Accessing beyond array bounds leads to undefined behavior

### Best Practices

1. **Linear Iteration**: Access arrays sequentially (row-major order) for best cache performance
2. **Data Alignment**: Align data structures to cache line boundaries
3. **Minimize Indirection**: Reduce pointer chasing in performance-critical code
4. **Consider SoA vs AoS**: Structure-of-Arrays (SoA) can be more cache-friendly than Array-of-Structures (AoS)
5. **Loop Tiling**: For matrix operations, use blocking techniques to improve cache reuse

### When to Use Arrays

- **Random access is primary operation**: Need O(1) lookup by index
- **Data size is known or bounded**: No need for dynamic growth
- **Memory efficiency matters**: No pointer overhead
- **Cache performance is critical**: Gaming, high-performance computing
- **Iteration is common**: Processing all elements sequentially

---

## 4. Search Algorithms

### 4.1 Linear Search

**Description**: Check every element until you find the target

**Time Complexity**: O(N)

```typescript
function linear_search(arr: number[], target: number): boolean {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return true;
        }
    }
    return false;
}
```

**When to use**: Unsorted data, small datasets

---

### 4.2 Binary Search

**Description**: Repeatedly divide sorted array in half, comparing middle element with target

**Requirements**: Array MUST be sorted

**Time Complexity**: O(log N)
**Space Complexity**: O(1) iterative, O(log N) recursive (call stack)

**Key Insight**: If input halves at each step → O(log N)

**Algorithm**:
1. Find middle element
2. If middle == target, return true
3. If target < middle, search left half
4. If target > middle, search right half
5. Repeat until found or no elements left

```typescript
function binary_search(arr: number[], target: number): boolean {
    let low = 0;
    let high = arr.length;

    while (low < high) {
        const mid = Math.floor(low + (high - low) / 2);
        const value = arr[mid];

        if (value === target) {
            return true;
        } else if (value > target) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return false;
}
```

**Don't forget**: Divide by 2!

**Why log N?** Each comparison eliminates half the remaining elements:
- N elements → N/2 → N/4 → N/8 → ... → 1
- Number of steps = log₂(N)

**Common Pitfalls**:
1. **Integer Overflow**: Use `mid = low + (high - low) / 2` instead of `mid = (low + high) / 2`
2. **Off-by-One Errors**: Be careful with `high = mid` vs `high = mid - 1`
3. **Infinite Loops**: Ensure search space shrinks each iteration
4. **Unsorted Data**: Binary search ONLY works on sorted arrays

**Real-World Applications**:
- Database indexing
- Finding versions in version control systems
- Searching in sorted logs
- Dictionary lookups
- Finding insertion points

**Interview Tips**:
- Always clarify if the array is sorted
- Discuss trade-offs: O(log N) search vs O(N) to maintain sorted order
- Consider whether binary search is worth it for small datasets
- Mention variants: finding first/last occurrence, search in rotated array

---

### 4.3 Two Crystal Balls Problem

**Problem**: Given two crystal balls that will break if dropped from high enough distance, determine the exact spot in which it will break in the most optimized way.

**Approach**:
- Can't use linear (too slow)
- Can't use binary (breaks both balls potentially)
- **Solution**: Jump by √N, then walk back linearly

**Time Complexity**: O(√N)

**Algorithm**:
1. Jump forward by √N each time
2. When first ball breaks, go back √N
3. Walk forward linearly with second ball
4. Find exact breaking point

**Why √N?**
- Jump √N times = √N operations
- Walk back √N steps = √N operations
- Total: √N + √N = 2√N = O(√N)

---

## 5. Sorting Algorithms

### 5.1 Bubble Sort

**Description**: Repeatedly swap adjacent elements if they're in wrong order

**Time Complexity**: O(N²)

**Algorithm**:
1. Loop through array
2. Compare each adjacent pair
3. Swap if out of order
4. Repeat until no swaps needed

**Why O(N²)?**
- Outer loop: N iterations
- Inner loop: N iterations
- N × N = N²

**Note**: Simple to understand, rarely used in practice

---

### 5.2 QuickSort (Divide and Conquer)

**Description**: Pick pivot, partition array around it, recursively sort partitions

**Time Complexity**:
- Average: O(N log N)
- Worst: O(N²) - when pivot is always smallest/largest
- Best: O(N log N)

**Space Complexity**: O(log N) - recursive call stack

**Algorithm**:
1. Choose pivot (often last element)
2. Partition: Move smaller elements left, larger right
3. Recursively sort left partition
4. Recursively sort right partition

**Key Insight**: This is a divide and conquer algorithm

**Why O(N log N)?**
- Partition operation: O(N)
- Divide array log N times (average case)
- N × log N = O(N log N)

**Why Worst Case O(N²)?**
- If pivot is always min/max, creates unbalanced partitions
- Degenerates to N levels deep instead of log N
- Example: Already sorted array with "always pick first" pivot strategy

**Pivot Selection Strategies**:
1. **First/Last Element**: Simple but vulnerable to worst case
2. **Random**: Avoids worst case on sorted data
3. **Median-of-Three**: Choose median of first, middle, last
4. **True Median**: Guarantees balance but expensive to find

**Real-world use**: Very common, one of fastest sorting algorithms in practice

**Why QuickSort is Fast Despite O(N²) Worst Case**:
- **Excellent cache locality**: Works in-place, accesses memory sequentially
- **Small constant factors**: Fewer operations per comparison
- **Good average case**: Random data rarely hits worst case
- **Practical optimizations**: Hybrid approaches avoid worst case

### 5.3 Sorting Algorithm Comparison

| Algorithm | Best | Average | Worst | Space | Stable? | When to Use |
|-----------|------|---------|-------|-------|---------|-------------|
| **Bubble Sort** | O(N) | O(N²) | O(N²) | O(1) | Yes | Never (educational only) |
| **QuickSort** | O(N log N) | O(N log N) | O(N²) | O(log N) | No | General purpose, in-place needed |
| **MergeSort** | O(N log N) | O(N log N) | O(N log N) | O(N) | Yes | Stable sort needed, linked lists |
| **HeapSort** | O(N log N) | O(N log N) | O(N log N) | O(1) | No | Guaranteed O(N log N) + O(1) space |

**When to Use Each**:

**QuickSort**:
- Most general-purpose scenarios
- When average performance matters most
- In-place sorting needed (memory constrained)
- Cache performance is critical
- Used in most standard libraries (with optimizations)

**MergeSort**:
- Stable sorting required (preserve equal elements' order)
- Worst-case O(N log N) guarantee needed
- Sorting linked lists (better than QuickSort for linked lists)
- External sorting (large datasets on disk)
- Parallel implementations

**HeapSort**:
- Need O(N log N) worst-case AND O(1) space
- Embedded systems with strict memory limits
- When you can't afford extra space but need guaranteed performance
- Less common in practice due to poor cache performance

**Real-World Note**: Most production sort implementations use **hybrid algorithms**:
- **Introsort** (C++ std::sort): QuickSort that switches to HeapSort if recursion too deep
- **Timsort** (Python, Java): Hybrid MergeSort + Insertion Sort, optimized for real-world data
- Small subarrays often sorted with Insertion Sort (O(N²) but fast for small N)

---

## 6. List Data Structures

### 6.1 Linked Lists

**Description**: Nodes connected by pointers/references, not contiguous memory

**Types**:
- **Singly Linked**: Each node points to next
- **Doubly Linked**: Each node points to both next and previous

#### Node Structure

```typescript
// Singly Linked
interface Node<T> {
    value: T;
    next?: Node<T>;
}

// Doubly Linked
interface Node<T> {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
}
```

#### Linked List Operations & Time Complexity

| Operation | Time Complexity | Why? |
|-----------|----------------|------|
| **Prepend** | O(1) | Just update head pointer |
| **Append** | O(1) | If you have tail pointer |
| **Insert at index** | O(N) | Must traverse to index |
| **Delete from ends** | O(1) | Just update pointers |
| **Delete in middle** | O(N) | Must traverse to find |
| **Get by index** | O(N) | Must traverse from head |
| **Search** | O(N) | Must check each node |

#### Why Arrays Suck (Linked List Advantages)

- **Deletion**: O(N) for arrays, O(1) for linked lists (at known position)
- **Insertion**: O(N) for arrays, O(1) for linked lists (at known position)
- **Growth**: Arrays are fixed size, linked lists grow dynamically
- **No shifting**: Inserting at index 0 is O(1) for linked lists vs O(N) for arrays

#### The Real Story: Arrays vs Linked Lists

**Memory Overhead**:
- Arrays: No overhead per element
- Linked Lists: Each node needs pointer(s) - adds 8 bytes (singly) or 16 bytes (doubly) per node

**Cache Performance**:
- **Arrays win dramatically**: Elements contiguous in memory, excellent spatial locality
- **Linked Lists lose**: Nodes scattered in memory, causes cache misses
- **Impact**: Arrays can be 5-10x faster in practice due to cache effects

**Practical Reality**: "Arrays are almost always better (faster) than linked lists"

**When Linked Lists Actually Win**:
1. **Frequent insertions/deletions at front**: O(1) vs O(N)
2. **Unknown size with many insertions**: No reallocation needed
3. **Implementing queues/deques**: Natural fit for FIFO operations
4. **Memory fragmentation**: Don't need contiguous block

**When Arrays Win** (most cases):
1. **Random access needed**: O(1) vs O(N)
2. **Iteration is primary operation**: Cache locality wins
3. **Memory efficiency**: No pointer overhead
4. **Predictable size**: ArrayList combines benefits

**Interview Insight**: Most real-world use cases favor arrays/ArrayLists. Only use linked lists when you have a specific reason (frequent front insertions, queue implementation, etc.)

---

### 6.2 Queue

**Description**: First In, First Out (FIFO) data structure

**Common Implementation**: Using linked list

**Operations**:
- **enqueue(item)**: Add to tail - O(1)
- **dequeue()**: Remove from head - O(1)
- **peek()**: View head without removing - O(1)

```typescript
interface Queue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    length: number;
}
```

**Use Cases**:
- Task scheduling
- BFS traversal
- Message queues

**Key Insight**: Constraints make things fast - Queue is fast because it's limited

**Real-World Applications**:
1. **Operating System Task Scheduling**: CPU scheduler uses queues to manage processes fairly
2. **Print Queue**: Documents sent to printer are queued in order
3. **Network Routers**: Data packets queued during high traffic to prevent loss
4. **Breadth-First Search**: Level-order tree/graph traversal
5. **Event-Driven Programming**: Asynchronous event handling
6. **Web Servers**: Request handling (connection queue)

**Implementation Notes**:
- Use linked list for true O(1) enqueue/dequeue
- Circular array (ring buffer) for fixed-capacity queue
- Avoid using ArrayList - dequeue requires shifting all elements

---

### 6.3 Stack

**Description**: Last In, First Out (LIFO) data structure

**Opposite of Queue**

**Operations**:
- **push(item)**: Add to top - O(1)
- **pop()**: Remove from top - O(1)
- **peek()**: View top without removing - O(1)

```typescript
interface Stack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    length: number;
}
```

**Use Cases**:
- Function call stack
- Undo operations
- DFS traversal
- Expression evaluation

**Implementation**: Can use array (ArrayList) or linked list

**Real-World Applications**:
1. **Browser History**: Back button uses stack - most recent page on top
2. **Undo/Redo in Text Editors**: Each action pushed to stack, undo pops last action
3. **Function Call Management**: Runtime stack stores return addresses and local variables
4. **Expression Evaluation**: Converting infix to postfix, evaluating expressions
5. **Backtracking Algorithms**: Maze solving, N-Queens, Sudoku
6. **Syntax Parsing**: Compilers use stacks for parsing nested structures
7. **Depth-First Search**: Exploring graphs/trees deeply before backtracking

**Implementation Notes**:
- ArrayList works perfectly - push/pop at end is O(1)
- Linked list also works but ArrayList usually faster (cache locality)
- Never pop from empty stack - always check length first

---

## 7. Arrays vs Linked Lists

### Comparison

| Aspect | Array | Linked List |
|--------|-------|-------------|
| **Access** | O(1) - Direct | O(N) - Traverse |
| **Insertion/Deletion (ends)** | O(N) - Shift needed | O(1) - Just pointers |
| **Insertion/Deletion (middle)** | O(N) - Shift needed | O(N) - Must traverse first |
| **Memory** | Contiguous | Scattered |
| **Space Overhead** | None | Pointer per node |
| **Cache Performance** | Excellent | Poor |

### ArrayList (Best of Both Worlds?)

**Description**: Array that can grow, with list operations

**Key Operations**:
- **get(index)**: O(1) - Array access
- **push(item)**: O(1) amortized - Add to end
- **pop()**: O(1) - Remove from end
- **Insertion at beginning**: O(N) - Must shift
- **Insertion in middle**: O(N) - Must shift

**Growth Strategy**:
1. Allocate array of size N
2. When full, allocate array of size 2N
3. Copy all elements to new array
4. Continue

**Time Complexity**:
- Most pushes: O(1)
- Occasional resize: O(N)
- **Amortized**: O(1) per push

**Amortized Analysis Explained**:
- **Aggregate Method**: Sequence of M appends costs at most 3M (amortized cost: 3 per operation)
- **Accounting Method**: Each cheap operation "pays" for future expensive ones
- **Key Insight**: Expensive resize "buys" many cheap appends in the future
- Expanding by constant proportion (e.g., 2x) ensures O(N) total time for N insertions

**Why Amortized O(1)?**:
- Most operations are simple append: O(1)
- Rare resize operations: O(N)
- Cost of resize spread over all cheap operations that follow
- Example: If you resize at capacity 1, 2, 4, 8, 16, 32...
  - Total copies = 1 + 2 + 4 + 8 + 16 + 32 = 63 < 2N
  - Average cost per insertion: O(1)

**Key Insight**: ArrayLists work best when used like a stack (push/pop from end)

**Used In**:
- JavaScript: `[]` (actually an ArrayList, not true array!)
- Java: `ArrayList<T>`
- C++: `std::vector<T>`
- Python: `list` (dynamic array)
- C#: `List<T>`

### What is `[]` in JavaScript?

**Answer**: ArrayList!

JavaScript arrays are NOT true arrays - they're dynamic ArrayLists that can grow and shrink.

### Ring Buffers

**Description**: Fixed-size buffer that wraps around (used frequently)

**Use Cases**:
- Fixed-size caches
- Streaming data
- Performance-critical code

**Characteristics**:
- Fixed capacity
- Wraps around when reaching end
- O(1) enqueue/dequeue

---

## 8. Recursion

### What is Recursion?

**Definition**: A function that calls itself until a problem is solved

### Two Steps to Every Recursive Function

1. **Base Case**: The terminating condition (when to stop)
2. **Recursive Case**: The step that moves toward base case

### Simple Example

```typescript
function foo(n: number): number {
    // Base Case
    if (n === 1) {
        return 1;
    }

    // Recursive Case
    return n + foo(n - 1);
}

// foo(5) = 5 + foo(4) = 5 + 4 + foo(3) = 5 + 4 + 3 + 2 + 1 = 15
```

### Key Insights

- Think in terms of the two steps (base + recursive)
- Don't try to trace through entire recursion mentally
- Trust that it works for smaller input

### When to Use Recursion

- When the problem can't be solved with a simple loop
- When dealing with tree/graph structures
- When the problem has a recursive nature (e.g., divide and conquer)

### Common Pitfalls

1. **Forgetting base case** → infinite recursion → stack overflow
2. **Wrong base case** → incorrect results
3. **Not making progress toward base case** → infinite recursion
4. **Stack Overflow**: Recursion too deep exhausts call stack memory
5. **Additional computation after recursive call** → prevents tail call optimization

### Stack Overflow and Memory

**The Problem**:
- Each recursive call adds a frame to the call stack
- Stack has limited size (typically 1-8 MB)
- Too many calls → stack overflow error

**What Causes Stack Overflow**:
- Excessively deep recursion (e.g., recursive Fibonacci for large N)
- Infinite recursion (missing or wrong base case)
- Each frame stores: function parameters, local variables, return address

**Example Stack Overflow**:
```typescript
// BAD: No base case - infinite recursion
function countdown(n: number): void {
    console.log(n);
    countdown(n - 1);  // Keeps calling forever!
}
```

### Tail Recursion Optimization

**Tail Recursion**: When recursive call is the LAST operation in function

```typescript
// Tail recursive - can be optimized
function factorial_tail(n: number, acc: number = 1): number {
    if (n === 0) return acc;
    return factorial_tail(n - 1, n * acc);  // Last operation
}

// NOT tail recursive - has operation after recursive call
function factorial_regular(n: number): number {
    if (n === 0) return 1;
    return n * factorial_regular(n - 1);  // Multiplication happens AFTER return
}
```

**Tail Call Optimization (TCO)**:
- Compiler/interpreter can reuse stack frame for tail calls
- Converts recursion to iteration internally
- Enables infinite recursion without stack overflow

**Important**: JavaScript/Python don't implement TCO by default!
- JavaScript: Guido van Rossum argues stack traces are more important for debugging
- Better approach: Convert to iteration explicitly

### Recursion vs Iteration

**Convert Recursion to Iteration**:
```typescript
// Recursive (risk of stack overflow)
function sum_recursive(n: number): number {
    if (n === 0) return 0;
    return n + sum_recursive(n - 1);
}

// Iterative (no stack overflow risk)
function sum_iterative(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
```

**When to Use Recursion**:
- Problem has recursive structure (trees, graphs)
- Solution is clearer/simpler than iterative
- Depth is bounded and reasonable
- Language supports TCO (Scheme, some functional languages)

**When to Use Iteration**:
- Risk of stack overflow
- Performance is critical
- Problem easily expressed iteratively
- Language doesn't support TCO

### Best Practices

1. **Always have a base case** - and make sure it's reachable
2. **Ensure progress** - Each call should move toward base case
3. **Consider depth** - Will recursion be too deep for stack?
4. **Use iteration for simple cases** - Especially with large inputs
5. **Visualize the call tree** - Helps understand recursive structure
6. **Trust the recursion** - Don't try to trace every call mentally

---

### Divide and Conquer

**Description**: Break problem into smaller subproblems, solve recursively, combine results

**Example**: QuickSort
1. **Divide**: Partition array around pivot
2. **Conquer**: Recursively sort sub-arrays
3. **Combine**: Sorted sub-arrays = sorted array

**Other Examples**:
- MergeSort
- Binary Search
- Many tree algorithms

---

## 9. Trees

### What is a Tree?

**Definition**: A graph with no cycles, hierarchical structure

**Key Points**:
- Filesystem is a tree
- DOM is a tree
- Abstract Syntax Trees (AST) in compilers
- "All programming eventually leads to trees"

### Tree Terminology

- **root**: The topmost node (most parent node)
- **height**: Longest path from root to leaf
- **binary tree**: Tree with at most 2 children per node
- **general tree**: Tree with 0 or more children per node
- **binary search tree**: Binary tree with specific ordering
- **leaves**: Nodes without children
- **balanced**: Left and right subtrees have same height
- **branching factor**: Number of children a tree has

### Tree Structure

```typescript
interface TreeNode<T> {
    value: T;
    left?: TreeNode<T>;
    right?: TreeNode<T>;
}
```

---

### 9.1 Tree Traversals (DFS - Depth First Search)

#### Pre-Order Traversal
**Order**: Visit, Recurse Left, Recurse Right

```typescript
function pre_order_traversal(node: TreeNode | null): void {
    if (!node) return;

    visit(node);                    // Process current
    pre_order_traversal(node.left);  // Go left
    pre_order_traversal(node.right); // Go right
}
```

**Use**: Creating copy of tree, prefix expression

#### In-Order Traversal
**Order**: Recurse Left, Visit, Recurse Right

```typescript
function in_order_traversal(node: TreeNode | null): void {
    if (!node) return;

    in_order_traversal(node.left);  // Go left
    visit(node);                    // Process current
    in_order_traversal(node.right); // Go right
}
```

**Use**: BST traversal (gives sorted order)

#### Post-Order Traversal
**Order**: Recurse Left, Recurse Right, Visit

```typescript
function post_order_traversal(node: TreeNode | null): void {
    if (!node) return;

    post_order_traversal(node.left);  // Go left
    post_order_traversal(node.right); // Go right
    visit(node);                      // Process current
}
```

**Use**: Deleting tree, postfix expression

---

### 9.2 Breadth First Search (BFS)

**Description**: Visit nodes level by level (all nodes at depth N before depth N+1)

**Implementation**: Use a Queue!

```typescript
function bfs(root: TreeNode | null, target: number): boolean {
    if (!root) return false;

    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const node = queue.shift()!;

        if (node.value === target) {
            return true;
        }

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return false;
}
```

**Time Complexity**: O(N) - Visit every node
**Space Complexity**: O(W) - W is maximum width of tree

**BFS vs DFS**: Personal preference often, depends on problem structure

---

### 9.3 Comparing Binary Trees

**Problem**: Determine if two trees are equal in both shape and structure

**Approach**: Recursive comparison

```typescript
function compare_trees(a: TreeNode | null, b: TreeNode | null): boolean {
    // Base cases
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    if (a.value !== b.value) return false;

    // Recursive case
    return compare_trees(a.left, b.left) &&
           compare_trees(a.right, b.right);
}
```

---

### 9.4 Binary Search Tree (BST)

**Definition**: Binary tree with ordering property:
- All left descendants ≤ node
- All right descendants > node

**Key Operations & Time Complexity**:

| Operation | Average | Worst Case |
|-----------|---------|------------|
| **Find** | O(log N) | O(N) |
| **Insert** | O(log N) | O(N) |
| **Delete** | O(log N) | O(N) |

**Why Worst Case O(N)?**: Unbalanced tree becomes linked list

**The Balance Problem**:
- **Balanced BST**: Height = log N → O(log N) operations
- **Unbalanced BST**: Height = N → O(N) operations (degenerates to linked list)
- **Example**: Inserting sorted data [1,2,3,4,5] creates right-only chain

### Self-Balancing Trees

To maintain O(log N) guarantees, use self-balancing variants:

#### AVL Trees
- **Balance Condition**: Height difference between left/right subtrees ≤ 1
- **Rebalancing**: Uses rotations (left, right, left-right, right-left)
- **Performance**: Stricter balance → faster lookups, more rotations on insert/delete
- **Use When**: Lookups more frequent than modifications

#### Red-Black Trees
- **Balance Condition**: Node coloring rules ensure approximate balance
- **Properties**:
  1. Every node is red or black
  2. Root is black
  3. Leaves (NULL) are black
  4. Red nodes have black children
  5. All paths from node to leaves have same number of black nodes
- **Performance**: Looser balance → fewer rotations, slightly slower lookups
- **Use When**: Frequent insertions/deletions
- **Used In**: Java TreeMap, C++ std::map, Linux kernel

**Interview Reality**: "It's rare to implement balancing in an interview, but be prepared to discuss WHY balance is needed for O(log N) time."

**Production Reality**: Use library implementations
- Most languages provide balanced BST implementations
- Never implement your own for production unless you have a specific reason

#### BST Search

```typescript
function search_bst(node: TreeNode | null, target: number): boolean {
    if (!node) return false;

    if (node.value === target) return true;

    if (target < node.value) {
        return search_bst(node.left, target);
    } else {
        return search_bst(node.right, target);
    }
}
```

**Comparison to Binary Search on Array**:
- BST: More intuitive once you understand trees
- Array: More cache-friendly
- BST: Dynamic insertion/deletion
- Array: Must remain sorted

---

### 9.5 Heap (Priority Queue)

**Definition**: Binary tree where every child and grandchild is smaller (MaxHeap) or larger (MinHeap) than current node

**Key Characteristics**:
- **Self-balancing**
- Can be used for **priority**
- **No traversing** the tree
- Usually implemented as **array**

**Operations**:
- **Insert**: O(log N) - Add to end, bubble up
- **Delete (poll)**: O(log N) - Remove root, heapify down
- **Peek**: O(1) - Just look at root

**Array Implementation**:
```
Parent at index i
Left child at 2i + 1
Right child at 2i + 2

Child at index i
Parent at floor((i - 1) / 2)
```

**Use Cases**:
- Priority queues
- Heap sort
- Finding Kth largest/smallest
- Dijkstra's algorithm

**Interview Tip**: "If you say priority queue in an interview, I'll hire you"

### Real-World Heap Applications

**1. Dijkstra's Shortest Path**:
- Min-heap for efficiently getting next closest vertex
- Time complexity: O((V + E) log V) with binary heap
- Even better with Fibonacci heap: O(V log V + E), but impractical due to high constants

**2. K-Way Merge**:
- Merging K sorted lists/files
- Heap stores smallest element from each list
- Time: O(N log K) where N = total elements, K = number of lists
- Used in: External sorting, database query optimization

**3. Finding K Largest/Smallest**:
- Maintain heap of size K
- For K largest: use min-heap, replace min if larger found
- Time: O(N log K) vs O(N log N) for full sort
- Space: O(K) vs O(N)

**4. Event-Driven Simulation**:
- Next event determined by timestamp
- Min-heap for efficient event scheduling
- Used in: Network simulators, discrete event systems

**5. Median Maintenance**:
- Use two heaps: max-heap for lower half, min-heap for upper half
- Median is root of larger heap (or average of both roots)
- Insert: O(log N), Find median: O(1)

**Interview Tips**:
- "Priority queue" is the abstract concept, "heap" is the implementation
- Always mention which heap type: min-heap or max-heap
- Common mistakes: confusing min/max heap, forgetting to heapify after operations
- Know the array formulas: left = 2i+1, right = 2i+2, parent = (i-1)/2

---

### 9.6 Trie (Prefix Tree)

**Pronunciation**: "Tree" (from re**TRIE**val)

**Definition**: Tree structure for storing strings, often used for autocomplete

**Characteristics**:
- Each node represents a character
- Paths from root spell words
- Common prefixes share paths

**Structure**:
```typescript
interface TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
}
```

**Operations**:
- **Insert**: O(L) - L is word length
- **Search**: O(L)
- **StartsWith**: O(L)
- **Delete**: O(L)

**Use Cases**:
- Autocomplete
- Spell checker
- IP routing
- Dictionary

**Common in interviews**: "If it's not a priority queue, it's a trie"

### Trie Implementation Details

**Why Tries are Efficient**:
- **Prefix sharing**: Common prefixes stored once (e.g., "cat", "cats", "category" share "cat")
- **No collisions**: Unlike hash tables, no hash collision handling needed
- **Sorted order**: In-order traversal gives lexicographically sorted strings
- **Prefix queries**: Find all words starting with "cat" in O(L + K) where L = prefix length, K = results

**Space Complexity**:
- **Worst case**: O(ALPHABET_SIZE × N × L) where N = number of words, L = avg length
- **Practical**: Much better due to prefix sharing
- **Trade-off**: Space for time - uses more memory than simple list but much faster

**Real-World Applications**:

**1. Autocomplete Systems**:
- Google search suggestions
- IDE code completion
- Mobile keyboard predictions
- Type prefix → get all completions in O(prefix_length + results)

**2. Spell Checkers**:
- Check if word exists in dictionary
- Find similar words (edit distance algorithms on trie)
- Suggest corrections for misspellings

**3. IP Routing**:
- Longest prefix matching for routing tables
- Fast IP address lookup

**4. Dictionary Implementation**:
- Phone contact lists
- Word games (Scrabble, crossword solvers)
- T9 predictive text

**Implementation Variations**:
```typescript
// Standard approach: Map for children
interface TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
}

// Array approach (faster but more memory if alphabet is large)
interface TrieNodeArray {
    children: (TrieNode | null)[];  // Size 26 for lowercase letters
    isEndOfWord: boolean;
}
```

**Optimization Tips**:
1. **Compress single-child chains**: Patricia Trie/Radix Tree
2. **Use arrays for small alphabets**: Faster than Map for English (26 letters)
3. **Store frequency counts**: For autocomplete ranking
4. **Lazy deletion**: Mark nodes as deleted instead of removing

**Common Interview Questions**:
- Implement insert, search, startsWith
- Find all words with given prefix
- Longest word in dictionary
- Word search in 2D grid (DFS + Trie)
- Replace words with shortest prefix

---

## 10. Graphs

### What is a Graph?

**Definition**: Collection of nodes (vertices) with connections (edges) between them

**Key Insight**: "All trees are graphs, not all graphs are trees"

### Graph Terminology

#### Graph Types
- **cycle**: Path that starts and ends at same node
- **acyclic**: Graph with no cycles
- **connected**: Every node has path to every other node
- **directed**: Edges have direction (Twitter - following)
- **undirected**: Edges bidirectional (Facebook - friends)
- **weighted**: Edges have weights/costs (Maps - distances)
- **DAG**: Directed Acyclic Graph

#### Implementation Terms
- **node/vertex**: Point in graph
- **edge**: Connection between nodes

#### Big O for Graphs
- Usually expressed as **O(V × E)**
  - V = number of vertices
  - E = number of edges
- Example: O(V × E) = check every vertex, and for each, check every edge

---

### Graph Representations

#### 1. Adjacency Matrix
**Structure**: 2D array where matrix[i][j] = 1 if edge exists from i to j

```typescript
const graph: number[][] = [
    [0, 1, 0, 1],  // Node 0 connects to 1, 3
    [1, 0, 1, 0],  // Node 1 connects to 0, 2
    [0, 1, 0, 1],  // Node 2 connects to 1, 3
    [1, 0, 1, 0],  // Node 3 connects to 0, 2
];
```

**Pros**:
- O(1) edge lookup
- Simple representation

**Cons**:
- O(V²) space
- Wasteful for sparse graphs

#### 2. Adjacency List
**Structure**: Array/Map where each node stores list of neighbors

```typescript
const graph: number[][] = [
    [1, 3],     // Node 0 connects to 1, 3
    [0, 2],     // Node 1 connects to 0, 2
    [1, 3],     // Node 2 connects to 1, 3
    [0, 2],     // Node 3 connects to 0, 2
];
```

**Pros**:
- O(V + E) space
- Efficient for sparse graphs

**Cons**:
- O(V) edge lookup

---

### 10.1 Graph BFS (Breadth First Search)

**Description**: Visit neighbors before going deeper

**Uses Queue** (just like tree BFS!)

```typescript
function bfs_graph(graph: number[][], source: number, target: number): boolean {
    const visited = new Set<number>();
    const queue: number[] = [source];
    visited.add(source);

    while (queue.length > 0) {
        const node = queue.shift()!;

        if (node === target) return true;

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return false;
}
```

**Time Complexity**: O(V + E)
- Visit each vertex once: O(V)
- Check each edge once: O(E)

**Use Cases**:
- Shortest path (unweighted)
- Connected components
- Level-order processing

### BFS vs DFS: When to Use Which

**Use BFS When**:
1. **Finding shortest path** in unweighted graphs
2. **Level-order processing**: Process nodes layer by layer
3. **Finding nearest neighbors**: Closest nodes explored first
4. **Cycle detection** in undirected graphs
5. **Puzzle solving**: Finding minimum moves (sliding puzzles, etc.)
6. **Network broadcasting**: Propagation simulation
7. **Parallelization possible**: Each layer independent

**Use DFS When**:
1. **Exploring all possible paths**: Backtracking problems
2. **Topological sorting**: Course prerequisites, build systems
3. **Cycle detection** in directed graphs
4. **Finding connected components**
5. **Maze solving**: Exhaustive path exploration
6. **Low memory usage**: Only need stack for current path
7. **Graph has solution deep in tree**: DFS may find faster

**Key Differences**:
| Aspect | BFS | DFS |
|--------|-----|-----|
| **Data Structure** | Queue | Stack (or recursion) |
| **Path Found** | Shortest | May not be shortest |
| **Memory** | O(width) | O(depth) |
| **Use Case** | Shortest path | Exhaustive search |
| **Implementation** | Usually iterative | Often recursive |

**Real-World Examples**:
- **Social Networks**: BFS for friend recommendations (mutual friends), DFS for community detection
- **Web Crawlers**: BFS for broad coverage, DFS for deep site exploration
- **GPS Navigation**: BFS variant (Dijkstra) for shortest routes
- **Dependency Resolution**: DFS for topological sort (npm, Maven)

---

### 10.2 Graph DFS (Depth First Search)

**Description**: Go deep before going wide

**Recursive** (uses call stack instead of explicit queue)

```typescript
function dfs_graph(
    graph: number[][],
    node: number,
    target: number,
    visited: Set<number>
): boolean {
    if (node === target) return true;
    if (visited.has(node)) return false;

    visited.add(node);

    for (const neighbor of graph[node]) {
        if (dfs_graph(graph, neighbor, target, visited)) {
            return true;
        }
    }

    return false;
}
```

**Time Complexity**: O(V + E)

**Use Cases**:
- Cycle detection
- Topological sort
- Path finding
- Connected components

---

### 10.3 Dijkstra's Shortest Path

**Description**: Find shortest path in weighted graph with non-negative weights

**Algorithm**:
1. Start at source, set distance to 0
2. Set all other distances to infinity
3. Visit unvisited node with smallest distance
4. Update distances to neighbors
5. Mark current as visited
6. Repeat until target reached or all visited

**Key Data Structures**:
- Distance array
- Visited set
- Priority queue (min-heap) for efficiency

**Time Complexity**:
- With array: O(V²)
- With priority queue: O((V + E) log V)

**Important**: Only works with **non-negative edge weights**

**Variations**:
- A* (adds heuristic for better performance)
- Bellman-Ford (handles negative weights)

**Use Cases**:
- GPS navigation
- Network routing
- Game pathfinding

**Interview Tip**: Often the first graph algorithm learned after BFS/DFS

### Advanced Graph Topics

#### Topological Sort (DAG Applications)

**Definition**: Linear ordering of vertices such that for every directed edge u→v, u comes before v

**Requirements**: Only works on **DAGs** (Directed Acyclic Graphs)

**Algorithms**:
1. **Kahn's Algorithm** (BFS-based):
   - Find all nodes with in-degree 0
   - Process them, reduce in-degree of neighbors
   - Repeat until all processed or cycle detected

2. **DFS-based**:
   - Perform DFS, add to result in post-order
   - Reverse the result

**Time Complexity**: O(V + E)

**Real-World Applications**:

**1. Build Systems**:
- **Make, Maven, Gradle**: Determine compilation order
- Dependencies form DAG, topological sort ensures correct build order
- Example: Compile dependencies before files that use them

**2. Course Scheduling**:
- University course prerequisites
- Graph where edge A→B means "A is prerequisite for B"
- Topological sort gives valid course sequence
- Cycle detection catches impossible prerequisites

**3. Task Scheduling**:
- **Apache Airflow, Kubernetes DAGs**: Schedule dependent tasks
- Ensure prerequisite tasks finish before dependent tasks start
- Optimize parallel execution of independent tasks

**4. Package Managers**:
- **npm, pip, cargo**: Resolve dependency order for installation
- Detect circular dependencies (cycle detection)

**5. Spreadsheet Formula Evaluation**:
- Cells depend on other cells
- Evaluate in topological order
- Detect circular references

**Interview Tips**:
- Always check if graph is DAG first
- Mention both Kahn's and DFS approaches
- Discuss cycle detection as part of solution
- Common follow-up: "What if there's a cycle?"

---

## 11. Maps (Hash Maps)

### What is a Map?

**Common saying**: "Just use a hash map" (in interviews)

**Reality**: We know how to USE maps (`{}` or `new Map()`), but not how they WORK

**Note**: `{}` in JavaScript is NOT a hash map (it's a different data structure)

### Map Terminology

- **load factor**: Ratio of data points to storage capacity (`data.len / storage.capacity`)
- **key**: Hashable value used to look up data (hash must be consistent)
- **value**: Data associated with key
- **collision**: When 2 keys map to same cell

---

### How Hash Maps Work

#### Basic Concept
1. Hash the key to get index
2. Store value at that index
3. Handle collisions

```typescript
// Simplified hash function
function hash(key: string, capacity: number): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash + key.charCodeAt(i)) % capacity;
    }
    return hash;
}
```

#### Operations

**Insertion**:
1. Hash key to get index
2. Check if slot is empty
3. If empty, insert
4. If occupied, handle collision

**Deletion**:
1. Hash key to get index
2. Find item (may need to check collision chain)
3. Remove item
4. Handle any reorganization needed

**Lookup**:
1. Hash key to get index
2. Check if value at index matches key
3. If not, follow collision resolution

---

### Collision Handling

Collisions are inevitable due to **pigeonhole principle**: If you have more keys than buckets, some must collide.

#### 1. Separate Chaining
- Each bucket stores linked list (or other structure)
- Multiple items can share same hash
- Insert: Add to list at hashed index

**Pros**:
- Simple to implement
- No limit on items
- Performance degrades gracefully

**Cons**:
- Can degrade to O(N) lookup if all hash to same bucket
- Extra memory for linked list pointers
- Poor cache locality (pointer chasing)

**Optimization**: Use balanced BST instead of linked list → O(log N) worst case

#### 2. Open Addressing (Linear Probing)
- Store all items in array itself
- If slot occupied, probe next: hash, hash+1, hash+2, ...
- Delete: Mark as "tombstone" to not break probe chains

**Pros**:
- Cache-friendly (array traversal)
- No extra memory for pointers
- Better performance for small load factors

**Cons**:
- **Primary clustering**: Long runs of occupied slots
- Requires good load factor management
- Deletion is tricky (tombstones)
- Performance degrades rapidly as table fills

#### 3. Quadratic Probing
- Probe sequence: hash, hash+1², hash+2², hash+3², ...
- Reduces primary clustering

**Pros**: Less clustering than linear probing
**Cons**: Can suffer from secondary clustering

#### 4. Double Hashing
- Use second hash function for probe step
- Probe: hash1(key), hash1(key) + hash2(key), hash1(key) + 2×hash2(key), ...
- Best open addressing method

**Pros**: Minimizes clustering
**Cons**: More computation, need good second hash function

#### 5. Robin Hood Hashing
- Variant of open addressing
- Minimize variance in probe lengths
- "Rich" items (few probes) give way to "poor" items (many probes)

**Pros**: Better worst-case lookup times
**Cons**: More complex insertion logic

---

### Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| **Insert** | O(1) | O(N) |
| **Delete** | O(1) | O(N) |
| **Lookup** | O(1) | O(N) |

**Why Worst Case O(N)?**
- All keys hash to same bucket
- Degrade to linked list search

**Key to Performance**: Good hash function + low load factor

---

### Load Factor Management

**Typical threshold**: 0.75 (75% full)

**When exceeded**:
1. Allocate larger table (usually 2x)
2. Rehash all existing keys
3. Insert into new table

**Rehashing complexity**: O(N), but amortized O(1) per operation

### Hash Function Quality

A good hash function should:
1. **Deterministic**: Same input always produces same hash
2. **Uniform distribution**: Spread keys evenly across buckets
3. **Fast to compute**: Hashing shouldn't be bottleneck
4. **Minimize collisions**: Different keys should hash differently

**Bad Hash Function Example**:
```typescript
// BAD: Only uses first character
function bad_hash(key: string): number {
    return key.charCodeAt(0) % capacity;
}
// "apple", "avocado", "apricot" all collide!
```

**Better Hash Functions**:
- **djb2**: Simple, fast, good distribution
- **MurmurHash**: Excellent distribution, widely used
- **xxHash**: Very fast, used in production systems
- **SipHash**: Cryptographically secure, prevents hash flooding attacks

**Production Hash Functions**:
- JavaScript: Uses engine-specific hash (V8, SpiderMonkey)
- Java: `hashCode()` method
- Python: `__hash__()` method
- C++: `std::hash`

### Performance Optimization Strategies

1. **Power-of-2 Sizing**: Use capacities like 16, 32, 64, 128
   - Enables bitwise AND instead of modulo: `hash & (capacity - 1)`
   - Much faster than `hash % capacity`

2. **Load Factor Management**:
   - Keep between 0.5 and 0.75
   - Too low: wasted space
   - Too high: more collisions, slower operations

3. **Cache-Friendly Design**:
   - Open addressing better than chaining for cache
   - Store keys/values in same array for locality
   - SIMD instructions for parallel bucket searches

4. **Prehashing**: Store hash code with keys to avoid recomputing

5. **Incremental Resizing**: Some implementations resize gradually to avoid spikes

### Hash Map vs Other Structures

| Operation | Hash Map | BST | Array | Linked List |
|-----------|----------|-----|-------|-------------|
| **Insert** | O(1)* | O(log N) | O(N) | O(1) at head |
| **Delete** | O(1)* | O(log N) | O(N) | O(1) with pointer |
| **Search** | O(1)* | O(log N) | O(N) | O(N) |
| **Ordered?** | No | Yes | Yes | No |
| **Memory** | High | Medium | Low | High |

*Average case; worst case O(N)

**When to Use Hash Map**:
- Need fast lookups by key
- Order doesn't matter
- Keys are hashable
- Common use case: counting, grouping, caching

**When NOT to Use Hash Map**:
- Need sorted/ordered data → Use BST
- Need range queries → Use BST or array
- Memory constrained → Use array if possible
- Keys not easily hashable → Use BST

### Common Interview Patterns

1. **Counting Frequency**: Use map to count occurrences
2. **Two Sum**: Map stores complement needed
3. **Grouping/Categorizing**: Map groups items by property
4. **Caching/Memoization**: Store computed results
5. **Anagrams**: Map sorted string to list of words

**Interview Tips**:
- Mention average vs worst case complexity
- Discuss hash function quality
- Know collision resolution methods
- Understand load factor impact
- Be ready to implement simple hash table from scratch

---

## 12. LRU Cache

### What is LRU?

**LRU**: Least Recently Used cache

**Purpose**: Cache that evicts least recently used item when capacity reached

**Common interview problem**: "Design a caching layer with N capacity that evicts LRU items"

---

### LRU Requirements

**Operations needed**:
- **get(key)**: Retrieve value, mark as recently used - O(1)
- **put(key, value)**: Insert/update value, mark as recently used - O(1)
- **Eviction**: When at capacity, remove LRU item - O(1)

**All operations must be O(1)!**

---

### LRU Implementation Strategy

**Key Insight**: Combine multiple data structures!

**Data Structures Used**:
1. **Hash Map**: O(1) lookup by key
2. **Doubly Linked List**: O(1) insertion/deletion, track recency

**Why both?**
- Map alone: Can't track order efficiently
- List alone: Can't lookup efficiently
- Together: O(1) for everything!

---

### LRU Structure

```typescript
interface Node<K, V> {
    key: K;
    value: V;
    prev?: Node<K, V>;
    next?: Node<K, V>;
}

class LRU<K, V> {
    private capacity: number;
    private map: Map<K, Node<K, V>>;
    private head?: Node<K, V>;  // Most recent
    private tail?: Node<K, V>;  // Least recent

    get(key: K): V | undefined;
    put(key: K, value: V): void;
}
```

---

### LRU Algorithm

#### Get Operation
1. Lookup key in map - O(1)
2. If not found, return undefined
3. If found, move node to front of list (most recent) - O(1)
4. Return value

#### Put Operation
1. Check if key exists
2. If exists:
   - Update value
   - Move to front of list
3. If doesn't exist:
   - Create new node
   - Add to front of list
   - Add to map
   - If over capacity:
     - Remove tail (LRU) from list
     - Remove from map

#### Move to Front (Helper)
1. Remove node from current position
2. Update prev/next pointers
3. Insert at head
4. Update head pointer

All operations maintain O(1) time complexity!

---

### Why This Implementation?

**Map provides**: Fast key-value lookup
**Doubly Linked List provides**:
- Fast insertion/deletion at ends
- Easy reordering
- Track access order

**Result**: Perfect combination for LRU cache requirements

### Real-World LRU Cache Applications

**1. Web Browsers**:
- Cache recently visited web pages
- Store images, CSS, JavaScript files
- Example: Chrome, Firefox use LRU for page caching
- Back button accesses cached pages instantly

**2. Operating Systems**:
- **Page Replacement**: When RAM full, evict LRU pages to disk
- Virtual memory management
- File system buffer cache
- CPU cache replacement policies (approximation of LRU)

**3. Database Systems**:
- Buffer pool management
- Query result caching
- Index page caching
- Trade-off: memory vs disk I/O

**4. CDN and Web Servers**:
- **Nginx, Apache**: Cache frequently accessed content
- Evict LRU content when cache full
- Reduces backend load, improves response time

**5. Distributed Caching Systems**:

**Redis as LRU Cache**:
```
# Configure Redis as LRU cache
maxmemory 100mb
maxmemory-policy allkeys-lru
```
- Doesn't implement true LRU (uses approximation)
- Samples random keys, evicts oldest among samples
- Trade-off: Less memory overhead for true LRU tracking

**Memcached**:
- Distributed memory caching system
- LRU eviction policy
- Used by Facebook, Wikipedia, Twitter

**6. Application-Level Caching**:
- API response caching
- Computed result caching
- Session data storage
- Reduce expensive computations/database queries

### LRU Implementation Variations

**1. Standard LRU** (as described):
- HashMap + Doubly Linked List
- O(1) for all operations
- Most common interview question

**2. LRU-K**:
- Tracks K most recent accesses
- Better for complex access patterns
- More memory overhead

**3. 2Q (Two Queue)**:
- FIFO queue for first access
- LRU queue for subsequent accesses
- Prevents one-time accesses from evicting useful data

**4. ARC (Adaptive Replacement Cache)**:
- Balances between recency and frequency
- Two LRU lists: recent vs frequent
- Self-tuning based on workload

**5. Segmented LRU**:
- Used in databases
- Protected and probationary segments
- Protects hot data from eviction

### LRU vs Other Eviction Policies

| Policy | Strategy | Pros | Cons |
|--------|----------|------|------|
| **LRU** | Evict least recently used | Good for temporal locality | Doesn't consider frequency |
| **LFU** | Evict least frequently used | Good for frequency patterns | Old frequent items stick |
| **FIFO** | Evict oldest | Simple, fast | Ignores usage patterns |
| **Random** | Evict random item | No overhead | Unpredictable performance |
| **LRU-K** | Track K recent accesses | Better than LRU | More complex, memory |

### Common Implementation Mistakes

1. **Forgetting to update recency on get()**: Must move to front on access
2. **Off-by-one errors**: Especially when capacity = 1
3. **Memory leaks**: Not removing from map when evicting from list
4. **Broken links**: Incorrectly updating prev/next pointers
5. **Not handling edge cases**: Empty cache, single item, full cache

### Interview Tips for LRU

1. **Start with requirements**: Clarify O(1) for both get and put
2. **Explain data structures**: Why both HashMap and LinkedList needed
3. **Draw diagrams**: Visualize the structure and operations
4. **Handle edge cases**:
   - Capacity = 1
   - Empty cache
   - Updating existing key
   - Accessing non-existent key
5. **Discuss trade-offs**:
   - Space: O(N) for HashMap + O(N) for List = O(N) total
   - Time: O(1) operations but higher constant factors
6. **Mention variations**: Show you know about LRU-K, ARC, etc.
7. **Real-world usage**: Redis, Memcached, browser caches

### Code Complexity

```typescript
class LRUCache<K, V> {
    // Three key operations to implement perfectly:

    get(key: K): V | undefined {
        // 1. Lookup in map - O(1)
        // 2. If found, move to front - O(1)
        // 3. Return value
    }

    put(key: K, value: V): void {
        // 1. If exists, update and move to front - O(1)
        // 2. If new:
        //    a. Add to map and front of list - O(1)
        //    b. If over capacity, evict tail - O(1)
        //    c. Remove evicted from map - O(1)
    }

    // Helper: moveToFront(node) - O(1)
    //   - Remove from current position
    //   - Insert at head
    //   - Update head pointer
}
```

**Complexity Breakdown**:
- List operations: O(1) with proper pointer manipulation
- Map operations: O(1) average case
- Combined: O(1) for all public operations

---

### Interview Tips for LRU

1. **Start with requirements**: Clarify O(1) constraint
2. **Whiteboard first**: Draw out data structures
3. **Think aloud**: Explain why you need both structures
4. **Handle edge cases**: Empty cache, single item, capacity of 1
5. **Discuss trade-offs**: Space vs time complexity

---

## Summary: Course Coverage

### Data Structures Covered
- Arrays
- Linked Lists (Singly & Doubly)
- Queue
- Stack
- ArrayList
- Ring Buffers
- Binary Search Trees
- Heaps
- Tries
- Graphs (Adjacency Matrix & List)
- Hash Maps
- LRU Cache

### Algorithms Covered
- Linear Search
- Binary Search
- Two Crystal Balls (√N)
- Bubble Sort
- QuickSort
- Tree Traversals (Pre/In/Post Order)
- BFS (Trees & Graphs)
- DFS (Trees & Graphs)
- Dijkstra's Shortest Path

### Time Complexities Learned
- O(1), O(log N), O(N), O(N log N), O(N²), O(2^N), O(√N)

---

## What's Next?

This course covers most fundamental data structures but few advanced algorithms. The world of algorithms is vast:

**More to explore**:
- Advanced graph algorithms (A*, Floyd-Warshall, Bellman-Ford, MST algorithms)
- Self-balancing trees (AVL, Red-Black, B-Trees)
- Advanced string algorithms (KMP, Rabin-Karp)
- Dynamic programming patterns
- Greedy algorithms
- Backtracking
- More exotic tree algorithms

**Keep learning**: This is the entrance, not the destination!

---

## Practice Resources

1. **Kata Machine**: ThePrimeagen's practice repository
   ```bash
   git clone git@github.com:ThePrimeagen/kata-machine.git
   cd kata-machine
   yarn install
   yarn generate
   ```

2. **Books**:
   - Introduction to Algorithms (CLRS)
   - A Common-Sense Guide to Data Structures and Algorithms

3. **Practice sites**:
   - LeetCode
   - HackerRank
   - CodeWars

---

## Final Tips

1. **Practice, practice, practice**: Reading isn't enough
2. **Whiteboard first**: Visualize before coding
3. **Understand Big O**: Critical for interviews
4. **Learn the patterns**: Many problems follow similar patterns
5. **Start simple**: Master fundamentals before advanced topics
6. **Interview prep**: Practice explaining your thinking
7. **It's a journey**: 225 hours of equivalent work - be patient with yourself

**Remember**: Your answer should always be "it depends" - understand trade-offs!

---

*Study guide compiled from ThePrimeagen's "The Last Algorithms Course You'll Need" on Frontend Masters*
*Course materials licensed under CC-BY-NC-4.0*
*Code samples licensed under Apache 2.0*

---

## Additional Research Sources

This enriched study guide incorporates insights from comprehensive research across the following areas:

### Big O Notation and Complexity Analysis
- [GeeksforGeeks - Top 30 Big-O Notation Interview Questions 2025](https://www.geeksforgeeks.org/dsa/big-o-notation-interview-questions-answers/)
- [Interview Cake - Big O Notation](https://www.interviewcake.com/article/java/big-o-notation-time-and-space-complexity)
- [GitHub - Big O Notation Interview Questions](https://github.com/Devinterview-io/big-o-notation-interview-questions)

### Arrays and Cache Locality
- [Cornell CS - Memory and Locality](https://www.cs.cornell.edu/courses/cs3110/2012sp/lectures/lec25-locality/lec25.html)
- [GeeksforGeeks - Why Arrays have better cache locality](https://www.geeksforgeeks.org/dsa/why-arrays-have-better-cache-locality-than-linked-list/)
- [Game Programming Patterns - Data Locality](https://gameprogrammingpatterns.com/data-locality.html)

### Linked Lists vs Arrays
- [LaunchSchool - Arrays vs Linked Lists Performance Comparison](https://launchschool.com/books/dsa/read/comparing_arrays_and_linked_lists)
- [DesignGurus - Arrays vs Linked Lists for Interviews](https://www.designgurus.io/blog/array-vs-linked-list)
- [GeeksforGeeks - Linked List vs Array](https://www.geeksforgeeks.org/dsa/linked-list-vs-array/)

### Binary Search Trees and Self-Balancing Trees
- [Interviewing.io - Binary Trees Interview Questions](https://interviewing.io/binary-trees-interview-questions)
- [Interview Cake - Binary Search Tree](https://www.interviewcake.com/concept/java/binary-search-tree)
- [GitHub - Tree Data Structure Interview Questions](https://github.com/Devinterview-io/tree-data-structure-interview-questions)

### Graph Algorithms
- [PuppyGraph - Graph Traversal Algorithms: DFS, BFS](https://www.puppygraph.com/blog/graph-traversal)
- [GeeksforGeeks - BFS vs DFS Difference](https://www.geeksforgeeks.org/dsa/difference-between-bfs-and-dfs/)
- [WsCubeTech - DFS vs BFS Algorithm](https://www.wscubetech.com/resources/dsa/dfs-vs-bfs)

### Recursion and Tail Call Optimization
- [LabEx - How to prevent stack overflow in recursion](https://labex.io/tutorials/c-how-to-prevent-stack-overflow-in-recursion-431176)
- [Invent with Python - Tail Call Optimization](https://inventwithpython.com/recursion/chapter8.html)
- [GeeksforGeeks - Tail Call Optimisation in C](https://www.geeksforgeeks.org/c/tail-call-optimisation-in-c/)

### Stack and Queue Applications
- [EICTA - Stacks and Queues: Implementation, Operations and Applications](https://www.eicta.iitk.ac.in/knowledge-hub/data-structure-with-c/stacks-and-queues-implementation-operations-and-applications)
- [HeroVired - Applications of Stack in Data Structure](https://herovired.com/learning-hub/topics/applications-of-stack-in-data-structure/)

### Amortized Analysis and Dynamic Arrays
- [Interview Cake - Dynamic Array Amortized Analysis](https://www.interviewcake.com/concept/java/dynamic-array-amortized-analysis)
- [GeeksforGeeks - Introduction to Amortized Analysis](https://www.geeksforgeeks.org/dsa/introduction-to-amortized-analysis/)
- [Wikipedia - Amortized Analysis](https://en.wikipedia.org/wiki/Amortized_analysis)

### Topological Sort and DAG Applications
- [GeeksforGeeks - Topological Sorting](https://www.geeksforgeeks.org/dsa/topological-sorting/)
- [AlgoCademy - Course Schedule Problem: Topological Sorting](https://algocademy.com/blog/course-schedule-problem-mastering-topological-sorting-in-programming-interviews/)
- [TakeUForward - Course Schedule I and II](https://takeuforward.org/data-structure/course-schedule-i-and-ii-pre-requisite-tasks-topological-sort-g-24)

### Trie Data Structure
- [StackFull.dev - Trie in Javascript: the Data Structure behind Autocomplete](https://stackfull.dev/trie-in-javascript-the-data-structure-behind-autocomplete)
- [GeeksforGeeks - Auto-complete feature using Trie](https://www.geeksforgeeks.org/dsa/auto-complete-feature-using-trie/)
- [AlgoCademy - Understanding and Implementing Trie Data Structures](https://algocademy.com/blog/understanding-and-implementing-trie-data-structures/)

### Heap and Priority Queue
- [GeeksforGeeks - Dijkstra's Shortest Path using Priority Queue](https://www.geeksforgeeks.org/dsa/dijkstras-shortest-path-algorithm-using-priority_queue-stl/)
- [Medium - Priority Queues and Dijkstra's Algorithm](https://medium.com/@adithjrajeev/priority-queues-and-dijkstras-algorithm-5a45526f99ad)

### LRU Cache
- [Redis Documentation - LRU Cache](https://redis.io/glossary/lru-cache/)
- [Redis Docs - Using Redis as an LRU cache](https://redis-documentation.readthedocs.io/en/latest/topics/lru-cache.html)
- [NumberAnalytics - Mastering LRU Cache: A Comprehensive Guide](https://www.numberanalytics.com/blog/ultimate-guide-to-lru-cache-in-data-structures)

---

## How This Guide Was Created

This comprehensive study guide was created using a multi-step approach:

1. **Web Scraping with MCP (Model Context Protocol)**: The original course content from [ThePrimeagen's Frontend Masters course](https://theprimeagen.github.io/fem-algos/) was systematically scraped and analyzed using Chrome DevTools MCP integration

2. **AI-Powered Enrichment**: The base content was significantly enhanced through research of 30+ authoritative sources including:
   - Academic resources (Cornell, CMU, etc.)
   - Industry documentation (Redis, Memcached)
   - Algorithm communities (GeeksforGeeks, Interview Cake, AlgoCademy)
   - Real-world engineering blogs and technical articles

3. **Comprehensive Enhancement**: Each section was enriched with:
   - Practical examples and real-world applications
   - Common pitfalls and best practices
   - Interview tips and strategies
   - Performance optimization insights
   - Additional complexity analysis

The result is a production-ready study resource that goes far beyond the original course material while maintaining its excellent pedagogical structure.

---

*Original course by ThePrimeagen - Course materials licensed under CC-BY-NC-4.0, Code samples under Apache 2.0*
