let heap = [];
function root() {
    return heap[0];
}

function mark() {
    let reachable = [root()];
    while (reachable.length) {
        let current = reachable.pop();
        if (!current.__markbit__) {
            current.__markbit__ = 1;
            for (let i in current) {
                if (typeof current[i] == "object") {
                    reachable.push(current[i]);
                }
            }
        }
    }
}

function sweep() {
    heap = heap.filter((current) => {
        if (current.__markbit__ == 1) {
            current.__markbit__ = 0;
            return true;
        } else {
            return false;
        }
    })
}

function gc() {
    mark();
    sweep();
}

function main() {
    let a = { 'name': 'apple' };
    let b = { 'name': 'ball' };
    let c = { 'name': 'cat' };
    let d = { 'name': 'dog' };
    heap.push(a);
    heap.push(b);
    heap.push(c);
    heap.push(d);

    a.b = b;
    b.c = c;
    c.d = d;

    // "B" reference is removed from "A".
    delete a.b;
    // A - X - C - D
    console.log("\nHeap before garbage collection: ", heap);
    gc();
    console.log("\nHeap after garbage collection: ", heap);
}
main();