import generateResponse from "../utils/ai.service.js";

const getReview = async (req, res) => {
    const chat = req.body.chat;

    if (!chat || chat.length === 0) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const aiResponse = await generateResponse(chat);
        return res.status(200).json({ success: true, review: aiResponse });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export default getReview;
