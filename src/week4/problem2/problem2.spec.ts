import solve from "./index";
import { split } from "../../utils/index";
import { shuffle } from "underscore";

describe("week4/problem2", () => {
    it("solves sample1", () => {
        expect(solve(split(`1
        1000`))).toEqual("1000");
    });
    it("solves sample2", () => {
        expect(solve(split(`2
        1 2
        1 2`))).toEqual("2");
    });
    it("solves sample3", () => {
        expect(solve(split(`5
        1 5 3 7 5
        5 4
        2 3
        4 2
        1 2`))).toEqual("11");
    });
    it("solves", () => {
        expect(solve(split(`5
        1 2 3 4 5
        1 2 
        2 3
        3 4
        4 5`))).toEqual("9");
    });
    it.only("solves 14", () => {
        expect(solve(split(`14
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        1 2 
        1 3
        1 4
        2 5
        3 6
        3 7
        3 8
        4 9
        7 10
        7 11
        7 12
        7 13
        7 14`))).toEqual("9");
    });
    it("solves", () => {
        expect(solve(split(`3
        1 1 1
        1 2
        3 2`))).toEqual("2");
    });
    it.skip("solves 99", () => {
        expect(solve(split(`
        50
        649 968 665 942 546 122 638 676 574 415 762 588 599 374 302 957 44 562 969 90220 186 425 90 581 610 136 984 290 912 803 112 872 417 494 195 204 29 4 730 174 559 844 2 887 123 877 313 89 985 329 271 293 130 404 670 389 693 343 298 565 389 112 268 656 702 650 45 490 752 988 306 650 742 368 845 992 869 259 739 862 984 754 717 233 83 338 597 276 521 304 399 98 494 400 667 26 111 192
        1 2
        2 3
        3 4
        4 5
        5 6
        6 7
        7 8
        8 9
        9 10
        10 11
        11 12
        12 13
        13 14
        14 15
        15 16
        16 17
        17 18
        18 19
        19 20
        20 21
        21 22
        22 23
        23 24
        24 25
        25 26
        26 27
        27 28
        28 29
        29 30
        30 31
        31 32
        32 33
        33 34
        34 35
        35 36
        36 37
        37 38
        38 39
        39 40
        40 41
        41 42
        42 43
        43 44
        44 45
        45 46
        46 47
        47 48
        48 49
        49 50
        50 51
        51 52
        52 53
        53 54
        54 55
        55 56
        56 57
        57 58
        58 59
        59 60
        60 61
        61 62
        62 63
        63 64
        64 65
        65 66
        66 67
        67 68
        68 69
        69 70
        70 71
        71 72
        72 73
        73 74
        74 75
        75 76
        76 77
        77 78
        78 79
        79 80
        80 81
        81 82
        82 83
        83 84
        84 85
        85 86
        86 87
        87 88
        88 89
        89 90
        90 91
        91 92
        92 93
        93 94
        94 95
        95 96
        96 97
        97 98
        98 99
        `))).toEqual("100");
    });

    it.skip("solves generated case", () => {
        
    
        console.log = () => undefined;
        for (var j = 0; j < 1; j++) {
            const sample = generateCase();
            //console.log(prepareCase(sample).join("\n"));
            //return;
            const res = solve(prepareCase(sample));
            for (var i = 0; i < 2; i++) {
                const case2 = shuffleCase(sample);
                const res2 = solve(prepareCase(case2));
                expect(res).toEqual(res2);
            }
        } 
    });

    function shuffleCase(sample: Case): Case {
        return {
            funFactors: sample.funFactors,
            connections: shuffle(sample.connections.map((x) => shuffle(x)))
        }
    }

    type Case = { funFactors: number[], connections: number[][] };
    function generateCase() {
        const connections: number[][] = [];

        const maxFun = 1000;
        const maxNodes = 100000;
        const maxChildren = 10;
        
        let lastNode = 1;
        const queue = [ 1 ];
        const funFactors = [ Math.ceil(Math.random() * maxFun) ];

        loop: while(queue.length) {
            const node = queue.shift();
            const numChildren = 1; //Math.round(maxChildren * Math.random());
            for (var i = 0; i < numChildren; i++) {
                const childNode = ++lastNode;
                queue.push(childNode);
                connections.push([node, childNode] as any);
                funFactors[childNode - 1] = Math.ceil(Math.random() * maxFun);
                if (lastNode >= maxNodes) {
                    break loop;
                }
            }
        }
        return {
            funFactors,
            connections,
        };
        
    }
    function prepareCase(c: Case) {
        return [
            c.connections.length + 1,
            c.funFactors.join(" "),
            ...c.connections.map(x => x.join(" ")),
        ].map(x => x.toString())
    }
});