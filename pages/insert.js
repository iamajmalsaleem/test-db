import { connectToDatabase } from "../lib/mongodb";

export default function airbnb({ result }) {
  return (
    <div>
      <p>Inserted one million documents into the database</p>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  let result;
  let i;
 async function createListing() {

    let data = {
      name: "Lovely Loft",
      summary: "A charming loft in Paris",
      bedrooms: 1,
      bathrooms: 1,
    };

    for (i = 0; i < 1000000; i++) {
      result = await db
        .collection("listingsAndReviews2")
        .updateOne({ _id: i }, {$set:data}, {upsert:true});
    }
  }

  await createListing();

  return {
    props: {
      result: JSON.parse(JSON.stringify(result)),
    },
  };
}
