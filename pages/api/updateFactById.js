import { updateFactById } from "@/lib/dbConnector";

export default async function UPDATE(req, res) {
    try {
        const response = await updateFactById(req.params.id, req.body);
        res.status(200).json(response);
    } catch(err) {
        console.log(err);
        res.status(500).json(`Error: ${err}`);
    }
}