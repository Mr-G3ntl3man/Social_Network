import {sum, sum2, sum3, sum4} from "./setupTests";


test('sum', () => {
   expect(sum(100, 20)).toBe(120)
})

test('sum2', () => {
   expect(sum2(100, 20)).toBe(80)
})
test('sum3', () => {
   expect(sum3(100, 20)).toBe(2000)
})
test('sum4', () => {
   expect(sum4(100, 20)).toBe(5)
})