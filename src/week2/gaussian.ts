
const isZero = (x: number) => Math.abs(x) < 0.0001;

export class Matrix {
    private source: string;
    public data: number[][];
    constructor(data: string[] | number[][]) {
        this.source = data.join("\n");
        if (Array.isArray(data[0])) {
            this.data = data as any;
        } else {
            this.data = (data as string[]).map(x => x.split(" ").map(Number));
        }
    }
    public multiply(idx: number, multiplicator: number) {
        const size = this.data.length;
        if (idx >= size) {
            throw new Error(`Can't multiply ${idx} in matrix of size ${size}`);
        }
        this.data[idx] = this.data[idx].map(x => x * multiplicator);
    }
    public subtract(aIdx: number, bIdx: number) {
        const size = this.data.length;
        if (aIdx >= size || bIdx >= size) {
            throw new Error(`Can't subtract ${aIdx} - ${bIdx} in matrix of size ${size}`);
        }
        this.data[aIdx] = this.data[aIdx].map((x, i) => x - this.data[bIdx][i]);
    }
    public swap(aIdx: number, bIdx: number) {
        const size = this.data.length;
        if (aIdx >= size || bIdx >= size) {
            throw new Error(`Can't swap ${aIdx},${bIdx} in matrix of size ${size}`);
        }
        const [a, b] = [this.data[aIdx], this.data[bIdx]]; 
        this.data[bIdx] = a;
        this.data[aIdx] = b;
    }
    public solveRow(idx: number): number {
        const row = this.data[idx];
        const k = row.slice(0, -1).filter(x => !isZero(x));
        if (k.length > 1) {
            throw new Error("Can't extract, too many coefficients: " + k + "\n" + this.source);
        }
        console.log(row.slice(-1)[0], k[0])
        return row.slice(-1)[0] / k[0];
    }
    public solveAllRows(): number[] {
        const res: number[] = [];
        for (var i = this.data.length - 1; i >= 0; i--) {
            const row = this.data[i];
            for (var j = 0; j < res.length; j++) {
                const k = row[row.length - 2 - j];
                row[row.length - 2 - j] = 0;
                row[row.length - 1] += -k * res[j]
            }
            console.log("substituted\n", row);
            res.push(this.solveRow(i));
        }
        return res.reverse();
    }
    public rowReduce() {
        const height = this.data.length;
        const width = this.data[0].length;
        for (var i = 0; i < height; i++) {
            console.log("begin\n" + this)
            let column = this.data.map(x => x[i]);
            const firstNonZero = column.findIndex((x, idx) => !isZero(x) && idx >= i);
            if (firstNonZero > -1) {
                this.swap(i, firstNonZero);
                console.log(`swapped ${i} ${firstNonZero}\n` + this)
                column = this.data.map(x => x[i]);
                for (var j = i + 1; j < height; j++) {
                    if (i !== j && !isZero(column[j])) {
                        console.log("multiplicator", column[i] / column[j])
                        this.multiply(j, column[i] / column[j]);
                        console.log("multiplied\n" + this)
                        this.subtract(j, i);
                        console.log("subtracted\n" + this)
                    }
                }
            }
        }
    }
    public toString() {
        return this.data.map(x => x.map(x => x < 0 ? x.toFixed(2) : " " + x.toFixed(2)).join(" ")).join("\n");
    }
}