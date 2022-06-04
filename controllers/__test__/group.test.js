import GroupConroller from "../group.js"


describe("Sample test", () => {
    test('return 200 if numbers are non negative', () => {
        const ans = GroupConroller.testSample(1, 2);
        expect(ans).toEqual(3);
    })

    test('return  if numbers are non negative', () => {
        const ans = GroupConroller.testSample(-1, 5);
        expect(ans).toEqual('negative Numbers');
    })
})