describe("sum", function () {

    describe("складываются 2 положительных числа", function () {

        it("Сумма 2 и 2 будет равна 4", function () {
            assert.equal(sum(2, 2), 4);
        });

        it("Сумма 44 и 77 будет равна 121", function () {
            assert.equal(sum(44, 77), 121);
        });

    });

    describe("складываются 2 отрицательных числа", function () {

        it("Сумма -111 и -222 будет равна -333", function () {
            assert.equal(sum(-111, -222), -333);
        });

    });

    describe("складываются положительное и отрицательное число", function () {

        it("Сумма 60 и -30 будет равна 30", function () {
            assert.equal(sum(60, -30), 30);
        });

    });

    describe("складываются число и пустая строка", function () {

        it("Сумма пустой строки и 27 будет равна 27", function () {
            assert.equal(sum('', 27), 27);
        });

    });

});