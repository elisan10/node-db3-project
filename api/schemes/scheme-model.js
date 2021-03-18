const db = require("../../data/db-config");

function find() {
  // EXERCISE A
  /*
    1A- Study the SQL query below running it in SQLite Studio against `data/schemes.db3`.
    What happens if we change from a LEFT join to an INNER join?

      SELECT
          sc.*,
          count(st.step_id) as number_of_steps
      FROM schemes as sc
      LEFT JOIN steps as st
          ON sc.scheme_id = st.scheme_id
      GROUP BY sc.scheme_id
      ORDER BY sc.scheme_id ASC;

    2A- When you have a grasp on the query go ahead and build it in Knex.
    Return from this function the resulting dataset.
  */
  return (
    db("schemes as sc")
      .select(
        "sc.scheme_id",
        "sc.scheme_name"
        // "st.scheme_id as number_of_steps"
      )
      .count("st.scheme_id as number_of_steps")
      // .count("number_of_steps")
      .leftJoin("steps as st", "sc.scheme_id", "=", "st.scheme_id")
      .groupBy("sc.scheme_id")
      .orderBy("sc.scheme_id", "asc")
  );
}

async function findById(scheme_id) {
  // EXERCISE B
  /*
    1B- Study the SQL query below running it in SQLite Studio against `data/schemes.db3`:

      SELECT
          sc.scheme_name,
          st.*
      FROM schemes as sc
      LEFT JOIN steps as st
          ON sc.scheme_id = st.scheme_id
      WHERE sc.scheme_id = 1
      ORDER BY st.step_number ASC;

    2B- When you have a grasp on the query go ahead and build it in Knex
    making it parametric: instead of a literal `1` you should use `scheme_id`.

    3B- Test in Postman and see that the resulting data does not look like a scheme,
    but more like an array of steps each including scheme information:

      [
        {
          "scheme_id": 1,
          "scheme_name": "World Domination",
          "step_id": 2,
          "step_number": 1,
          "instructions": "solve prime number theory"
        },
        {
          "scheme_id": 1,
          "scheme_name": "World Domination",
          "step_id": 1,
          "step_number": 2,
          "instructions": "crack cyber security"
        },
        // etc
      ]

    4B- Using the array obtained and vanilla JavaScript, create an object with
    the structure below, for the case _when steps exist_ for a given `scheme_id`:

      {
        "scheme_id": 1,
        "scheme_name": "World Domination",
        "steps": [
          {
            "step_id": 2,
            "step_number": 1,
            "instructions": "solve prime number theory"
          },
          {
            "step_id": 1,
            "step_number": 2,
            "instructions": "crack cyber security"
          },
          // etc
        ]
      }

    5B- This is what the result should look like _if there are no steps_ for a `scheme_id`:

      {
        "scheme_id": 7,
        "scheme_name": "Have Fun!",
        "steps": []
      }
  */

  // const stepsObj = {
  //   scheme_id: "schemes.scheme_id",
  //   scheme_name: "schemes.scheme_name",
  //   steps: [
  //     {
  //       step_id: "steps.step_id",
  //       step_number: "steps.step_number",
  //       instructions: "steps.instructions",
  //     },
  //   ],
  // };

  // const steps = {
  //   step_id: "steps.step_id",
  //   step_number: "steps.step_number",
  //   instructions: "steps.instructions",
  // };

  // return db("schemes as sc")
  //   .select("sc.scheme_name", "st.*")
  //   .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
  //   .where("sc.scheme_id", scheme_id)
  //   .orderBy("st.step_number", "asc")
  //   .first();
  const schemeData = await db("schemes as sc")
    .select(["sc.scheme_id", "sc.scheme_name", "steps.*"])
    .leftJoin("steps", "sc.scheme_id", "steps.scheme_id")
    .where("sc.scheme_id", scheme_id)
    .orderBy("steps.step_number", "asc");

  // const result = schemeData.find((scheme) => {
  //   // console.log("hello scheme", scheme);
  //   // console.log("scheme", scheme_id);
  //   scheme.scheme_id === 3;
  // });

  const stepsArray = schemeData.map((step) => {
    // console.log("This is step", step);
    return {
      step_id: step.step_id,
      step_number: step.step_number,
      instructions: step.instructions,
    };
  });

  if (schemeData[0].scheme_id !== null) {
    const schemeLayout = {
      scheme_id: schemeData[0].scheme_id,
      scheme_name: schemeData[0].scheme_name,
      steps: stepsArray,
    };

    return schemeLayout;
  } else {
    const emptyStepsArray = {
      scheme_id: schemeData[0].scheme_id,
      scheme_name: schemeData[0].scheme_name,
      steps: [],
    };
    return emptyStepsArray;
  }

  // console.log(result);
  // const schemeLayout = {
  //   scheme_id: scheme_id,
  //   scheme_name: schemeData.scheme_name,
  //   steps: stepsArray,
  // };

  // return schemeLayout;
  // const reducer = schemeData.reduce((acc, scheme) => {
  //   // schemeData 3
  //   // variable instantiate {empty}
  //   //  if variable is empty
  //   //  add schema
  //   // if its filled
  //   // return var

  //   return acc.includes({
  //     scheme_id: scheme.scheme_id,
  //     scheme_name: scheme.scheme_name,
  //     steps: stepsArray,
  //   })
  //     ? acc
  //     : acc.concat({
  //         scheme_id: scheme.scheme_id,
  //         scheme_name: scheme.scheme_name,
  //         steps: stepsArray,
  //       });
  // }, []);

  // console.log(allData);
  // const dataObj = (allData) => {
  //   const layout =
  //     // scheme_id: allData.scheme_id,
  //     // scheme_name: allData.scheme_name,
  //     // steps: [
  //       allData.map((step) => {
  //         return {
  //           step_id: step.step_id,
  //           step_number: step.step_number,
  //           instructions: step.instructions,
  //         };
  //         console.log(layout);
  //       }),
  //     // ],
  //   };
  // console.log({ schemeLayout });
  // return schemeLayout;
}

function findSteps(scheme_id) {
  // EXERCISE C
  /*
    1C- Build a query in Knex that returns the following data.
    The steps should be sorted by step_number, and the array
    should be empty if there are no steps for the scheme:

      [
        {
          "step_id": 5,
          "step_number": 1,
          "instructions": "collect all the sheep in Scotland",
          "scheme_name": "Get Rich Quick"
        },
        {
          "step_id": 4,
          "step_number": 2,
          "instructions": "profit",
          "scheme_name": "Get Rich Quick"
        }
      ]
  */
}

function add(scheme) {
  // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) {
  // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
};
