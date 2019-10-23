require("dotenv").config();
const knex = require("knex");

//Drill one
const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

function searchByTerm(searchTerm) {
  knexInstance
    .select("*")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}

/* searchByTerm("facon"); */

//Drill two
function paginated(page) {
  const productsPerPage = 6;
  const offset = productsPerPage * (page - 1);
  knexInstance
    .select("*")
    .from("shopping_list")
    .limit(productsPerPage)
    .offset(offset)
    .then(results => {
      console.log(results);
    });
}

/* paginated(2); */

//Drill three
function findDaysAgo(daysAgo) {
  knexInstance
    .select("date_added")
    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => {
      console.log(result);
    });
}

/* findDaysAgo(3); */

//Drill four
function costPerCategory() {
  knexInstance
    .select("category")
    .sum("price AS total")
    .from("shopping_list")
    .groupBy("category")
    .then(result => {
      console.log("COST PER CATEGORY");
      console.log(result);
    });
}

costPerCategory();
