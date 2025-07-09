import { getAllFacts } from "@/lib/dbConnector";

export default async function GET(req, res) {
    try {
        console.log("getAllFacts")
        const facts = await getAllFacts();
        res.status(200).json(facts);
    } catch(err) {
        console.log(err);
        res.status(500).json(`Error: ${err}`);
    }
}