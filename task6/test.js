describe("sum", function () {

    it("Сумма 2-ух положительных чисел", function () {
        assert.equal(sum(2, 2), 4);
        assert.equal(sum(44, 77), 121);
        assert.equal(sum(101, 909), 1010);
        assert.equal(sum(2, 99999), 100001);
    });

    it("Сумма 2-ух отрицательных чисел", function () {
        assert.equal(sum(-1, -1), -2);
        assert.equal(sum(-15, -42), -57);
        assert.equal(sum(-209, -1), -210);
        assert.equal(sum(-111, -222), -333);
        assert.equal(sum(-2222, -8888), -11110);
    });

    it("Сумма положительных и отрицательных чисел", function () {
        assert.equal(sum(2, -4), -2);
        assert.equal(sum(60, -30), 30);
        assert.equal(sum(515, -516), -1);
        assert.equal(sum(10000, -9999), 1);
    });

    it("Сумма чисел и пустых строк", function () {
        assert.equal(sum('', 27), 27);
        assert.equal(sum(219, ''), 219);
        assert.equal(sum('', 100000000000), 100000000000);
    });

    it("Сумма чисел в виде строк", function () {
        assert.equal(sum('15', '15'), 30);
        assert.equal(sum('-17000', '864939'), 847939);
        assert.equal(sum('123456789', '987654321'), 1111111110);
    });

});