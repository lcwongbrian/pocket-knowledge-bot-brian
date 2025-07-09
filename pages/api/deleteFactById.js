import { deleteFactById } from "@/lib/dbConnector";

export default async function DELETE(req, res) {
    try {
        const response = await deleteFactById(req.params.id);
        res.status(200).json(response);
    } catch(err) {
        console.log(err);
        res.status(500).json(`Error: ${err}`);
    }
}