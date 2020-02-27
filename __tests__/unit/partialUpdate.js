const sqlForPartialUpdate = require("../../helpers/partialUpdate");


describe("partialUpdate()", () => {
    it("should generate proper partial update query with 1 field", function () {
        const { query, values } = sqlForPartialUpdate(
            "users",
            { first_name: "Test" },
            "username",
            "testuser"
        );

        expect(query).toEqual(
            "UPDATE users SET first_name=$1 WHERE username=$2 RETURNING *"
        );

        expect(values).toEqual(["Test", "testuser"]);
    });
    it("should delete items if they start with _", function () {
        const { query, values } = sqlForPartialUpdate(
            "users",
            { _first_name: "Test" },
            "username",
            "testuser"
        );

        expect(query).toEqual(
            "UPDATE users SET  WHERE username=$1 RETURNING *"

        );

        expect(values).toEqual(["testuser"]);
    });
});
